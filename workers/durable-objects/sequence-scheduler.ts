/**
 * Durable Object: 시퀀스 스케줄러
 * 시퀀스 스텝의 지연 발송 및 중복 방지 관리
 */

export class SequenceScheduler {
  private state: DurableObjectState
  private env: any

  constructor(state: DurableObjectState, env: any) {
    this.state = state
    this.env = env
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/schedule') {
      return this.handleSchedule(request)
    } else if (url.pathname === '/execute') {
      return this.handleExecute(request)
    }

    return new Response('Not Found', { status: 404 })
  }

  private async handleSchedule(request: Request): Promise<Response> {
    const body = await request.json<{
      runId: string
      leadId: string
      sequenceId: string
      stepIndex: number
      delayHours: number
    }>()

    const scheduledAt = Date.now() + body.delayHours * 60 * 60 * 1000

    // 스케줄 저장 (중복 방지)
    const key = `schedule:${body.runId}`
    const existing = await this.state.storage.get(key)

    if (existing) {
      return new Response(JSON.stringify({ message: 'Already scheduled' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    await this.state.storage.put(key, {
      runId: body.runId,
      leadId: body.leadId,
      sequenceId: body.sequenceId,
      stepIndex: body.stepIndex,
      scheduledAt,
    })

    // 알람 설정 (Durable Object 알람 기능 사용)
    await this.state.storage.setAlarm(scheduledAt)

    return new Response(JSON.stringify({ success: true, scheduledAt }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  private async handleExecute(request: Request): Promise<Response> {
    const body = await request.json<{
      runId: string
      leadId: string
      sequenceId: string
      stepIndex: number
    }>()

    await this.executeStep(
      body.runId,
      body.leadId,
      body.sequenceId,
      body.stepIndex
    )

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  async alarm(): Promise<void> {
    // 알람이 트리거되면 예약된 작업 실행
    const schedules = await this.state.storage.list({ prefix: 'schedule:' })

    for (const [key, schedule] of schedules) {
      const scheduleData = schedule as any
      if (scheduleData.scheduledAt <= Date.now()) {
        // 실행
        const executeRequest = new Request('http://internal/execute', {
          method: 'POST',
          body: JSON.stringify({
            runId: scheduleData.runId,
            leadId: scheduleData.leadId,
            sequenceId: scheduleData.sequenceId,
            stepIndex: scheduleData.stepIndex,
          }),
        })
        
        // this.env를 사용할 수 없으므로 직접 처리
        await this.executeStep(
          scheduleData.runId,
          scheduleData.leadId,
          scheduleData.sequenceId,
          scheduleData.stepIndex
        )

        // 스케줄 삭제
        await this.state.storage.delete(key)
      }
    }
  }

  private async executeStep(
    runId: string,
    leadId: string,
    sequenceId: string,
    stepIndex: number
  ): Promise<void> {
    // 시퀀스 및 스텝 조회
    const sequence = await this.env.DB.prepare('SELECT * FROM sequences WHERE id = ?')
      .bind(sequenceId)
      .first()

    if (!sequence) {
      console.error('Sequence not found:', sequenceId)
      return
    }

    const steps = JSON.parse(sequence.steps as string) as Array<{
      delay_hours: number
      template_id: string
      channel: 'email' | 'sms'
      conditions?: {
        if_not_opened?: boolean
        if_not_clicked?: boolean
      }
    }>

    const step = steps[stepIndex]

    if (!step) {
      // 시퀀스 완료
      await this.env.DB.prepare(
        `UPDATE sequence_runs SET status = 'completed', updated_at = ? WHERE id = ?`
      ).bind(Date.now(), runId).run()
      return
    }

    // 조건 확인
    if (step.conditions) {
      const shouldSkip = await this.checkConditions(leadId, step.conditions)
      if (shouldSkip) {
        await this.env.DB.prepare(
          `UPDATE sequence_runs SET status = 'skipped', updated_at = ? WHERE id = ?`
        ).bind(Date.now(), runId).run()

        // 다음 스텝 스케줄링
        if (stepIndex + 1 < steps.length) {
          const nextStep = steps[stepIndex + 1]
          await this.scheduleNextStep(
            leadId,
            sequenceId,
            stepIndex + 1,
            nextStep.delay_hours
          )
        }
        return
      }
    }

    // 템플릿 조회 및 렌더링
    const template = await this.env.DB.prepare('SELECT * FROM templates WHERE id = ?')
      .bind(step.template_id)
      .first()

    if (!template) {
      console.error('Template not found:', step.template_id)
      return
    }

    // 리드 정보 조회
    const lead = await this.env.DB.prepare('SELECT * FROM leads WHERE id = ?')
      .bind(leadId)
      .first()

    if (!lead) {
      console.error('Lead not found:', leadId)
      return
    }

    // 템플릿 렌더링
    const rendered = this.renderTemplate(template.body as string, lead, template.variables as string | undefined)
    const messageId = crypto.randomUUID()

    // 메시지 생성
    await this.env.DB.prepare(
      `INSERT INTO messages (id, lead_id, channel, template_id, subject, body_rendered, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`
    ).bind(
      messageId,
      leadId,
      step.channel,
      step.template_id,
      template.subject ? this.renderTemplate(template.subject as string, lead, template.variables as string | undefined) : null,
      rendered,
      Date.now()
    ).run()

    // 큐에 추가
    if (step.channel === 'email') {
      await this.env.EMAIL_QUEUE.send({
        messageId,
        to: lead.email as string,
        subject: template.subject ? this.renderTemplate(template.subject as string, lead, template.variables as string | undefined) : '',
        body: rendered,
      })
    } else {
      await this.env.SMS_QUEUE.send({
        messageId,
        to: (lead.phone as string) || '',
        body: rendered,
      })
    }

    // 스텝 완료 처리
    await this.env.DB.prepare(
      `UPDATE sequence_runs SET status = 'sent', sent_at = ?, updated_at = ? WHERE id = ?`
    ).bind(Date.now(), Date.now(), runId).run()

    // 다음 스텝 스케줄링
    if (stepIndex + 1 < steps.length) {
      const nextStep = steps[stepIndex + 1]
      await this.scheduleNextStep(
        leadId,
        sequenceId,
        stepIndex + 1,
        nextStep.delay_hours
      )
    }
  }

  private async checkConditions(
    leadId: string,
    conditions: { if_not_opened?: boolean; if_not_clicked?: boolean }
  ): Promise<boolean> {
    // 조건 확인 로직
    if (conditions.if_not_opened) {
      const opened = await this.env.DB.prepare(
        `SELECT COUNT(*) as count FROM message_events 
         WHERE message_id IN (SELECT id FROM messages WHERE lead_id = ?) 
         AND type = 'open'`
      ).bind(leadId).first<{ count: number }>()

      if (opened && opened.count > 0) {
        return true // 스킵
      }
    }

    if (conditions.if_not_clicked) {
      const clicked = await this.env.DB.prepare(
        `SELECT COUNT(*) as count FROM message_events 
         WHERE message_id IN (SELECT id FROM messages WHERE lead_id = ?) 
         AND type = 'click'`
      ).bind(leadId).first<{ count: number }>()

      if (clicked && clicked.count > 0) {
        return true // 스킵
      }
    }

    return false
  }

  private renderTemplate(template: string, lead: any, variables?: string): string {
    // 템플릿 렌더러 사용
    const { renderTemplate } = require('../lib/template-renderer')
    
    let customVars: any = {}
    if (variables) {
      try {
        customVars = JSON.parse(variables)
      } catch (e) {
        console.error('Error parsing variables:', e)
      }
    }

    return renderTemplate(template, lead, customVars)
  }

  private async scheduleNextStep(
    leadId: string,
    sequenceId: string,
    stepIndex: number,
    delayHours: number
  ): Promise<void> {
    const runId = crypto.randomUUID()
    const scheduledAt = Date.now() + delayHours * 60 * 60 * 1000

    await this.env.DB.prepare(
      `INSERT INTO sequence_runs (id, lead_id, sequence_id, step_index, status, scheduled_at, updated_at)
       VALUES (?, ?, ?, ?, 'pending', ?, ?)`
    ).bind(runId, leadId, sequenceId, stepIndex, scheduledAt, Date.now()).run()

    // Durable Object로 스케줄링
    const schedulerId = this.env.SEQUENCE_SCHEDULER.idFromName('scheduler')
    const scheduler = this.env.SEQUENCE_SCHEDULER.get(schedulerId)
    await scheduler.fetch('http://internal/schedule', {
      method: 'POST',
      body: JSON.stringify({
        runId,
        leadId,
        sequenceId,
        stepIndex,
        delayHours,
      }),
    })
  }
}


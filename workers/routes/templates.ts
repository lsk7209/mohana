/**
 * 템플릿 관리 API
 */

import type { Env } from '../types'

export async function listTemplates(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const channel = url.searchParams.get('channel')

  try {
    let query = 'SELECT * FROM templates WHERE 1=1'
    const params: string[] = []

    if (channel) {
      query += ' AND channel = ?'
      params.push(channel)
    }

    query += ' ORDER BY created_at DESC'

    const templates = await env.DB.prepare(query).bind(...params).all()

    return new Response(
      JSON.stringify({ templates: templates.results }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error listing templates:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function getTemplate(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Template ID required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const template = await env.DB.prepare('SELECT * FROM templates WHERE id = ?')
      .bind(id)
      .first()

    if (!template) {
      return new Response(
        JSON.stringify({ error: 'Template not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(template),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching template:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function createTemplate(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const body = await request.json() as {
      channel: 'email' | 'sms'
      name: string
      subject?: string
      body: string
      variables?: string
      ab_key?: string
    }

    const id = crypto.randomUUID()
    const now = Date.now()

    await env.DB.prepare(
      `INSERT INTO templates (id, channel, name, subject, body, variables, ab_key, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      body.channel,
      body.name,
      body.subject || null,
      body.body,
      body.variables ? JSON.stringify(body.variables) : null,
      body.ab_key || null,
      now,
      now
    ).run()

    const template = await env.DB.prepare('SELECT * FROM templates WHERE id = ?')
      .bind(id)
      .first()

    return new Response(
      JSON.stringify({ success: true, template }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating template:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function updateTemplate(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'PUT') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Template ID required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await request.json() as {
      name?: string
      subject?: string
      body?: string
      variables?: string
      ab_key?: string
    }

    const updates: string[] = []
    const params: (string | number | null)[] = []

    if (body.name !== undefined) {
      updates.push('name = ?')
      params.push(body.name)
    }
    if (body.subject !== undefined) {
      updates.push('subject = ?')
      params.push(body.subject)
    }
    if (body.body !== undefined) {
      updates.push('body = ?')
      params.push(body.body)
    }
    if (body.variables !== undefined) {
      updates.push('variables = ?')
      params.push(body.variables ? JSON.stringify(body.variables) : null)
    }
    if (body.ab_key !== undefined) {
      updates.push('ab_key = ?')
      params.push(body.ab_key)
    }

    if (updates.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No fields to update' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    updates.push('updated_at = ?')
    params.push(Date.now())
    params.push(id)

    await env.DB.prepare(
      `UPDATE templates SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...params).run()

    const template = await env.DB.prepare('SELECT * FROM templates WHERE id = ?')
      .bind(id)
      .first()

    return new Response(
      JSON.stringify({ success: true, template }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error updating template:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function deleteTemplate(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'DELETE') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Template ID required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    await env.DB.prepare('DELETE FROM templates WHERE id = ?').bind(id).run()

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error deleting template:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const handleTemplates = {
  list: listTemplates,
  get: getTemplate,
  create: createTemplate,
  update: updateTemplate,
  delete: deleteTemplate,
}


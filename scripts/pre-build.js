/**
 * 빌드 전 스크립트: API 라우트와 동적 페이지를 임시로 제외
 * Next.js의 정적 내보내기에서 API 라우트와 일부 동적 페이지는 지원되지 않으므로,
 * 빌드 전에 이를 임시로 다른 위치로 이동합니다.
 */

import { existsSync, mkdirSync, renameSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const apiDir = join(__dirname, '..', 'app', 'api')
const tempDir = join(__dirname, '..', '.api-temp')
const tempApiDir = join(tempDir, 'api')
const tDir = join(__dirname, '..', 'app', 't')
const tempTDir = join(tempDir, 't')
const leadsIdDir = join(__dirname, '..', 'app', '(admin)', 'leads', '[id]')
const tempLeadsIdDir = join(tempDir, 'leads-id')

// 임시 디렉토리 생성
if (!existsSync(tempDir)) {
  mkdirSync(tempDir, { recursive: true })
}

// API 디렉토리가 존재하고 아직 이동되지 않은 경우에만 이동
if (existsSync(apiDir) && !existsSync(tempApiDir)) {
  console.log('Moving API routes to temp directory for build...')
  renameSync(apiDir, tempApiDir)
}

// t 디렉토리가 존재하고 아직 이동되지 않은 경우에만 이동
if (existsSync(tDir) && !existsSync(tempTDir)) {
  console.log('Moving t routes to temp directory for build...')
  renameSync(tDir, tempTDir)
}

// leads/[id] 페이지가 존재하고 아직 이동되지 않은 경우에만 이동
if (existsSync(leadsIdDir) && !existsSync(tempLeadsIdDir)) {
  console.log('Moving leads/[id] page to temp directory for build...')
  renameSync(leadsIdDir, tempLeadsIdDir)
}


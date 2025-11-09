/**
 * 빌드 후 스크립트: API 라우트와 동적 페이지 복원
 */

import { existsSync, renameSync, mkdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const apiDir = join(__dirname, '..', 'app', 'api')
const tempDir = join(__dirname, '..', '.api-temp')
const tempApiDir = join(tempDir, 'api')
const tempTDir = join(tempDir, 't')
const tDir = join(__dirname, '..', 'app', 't')
const leadsIdDir = join(__dirname, '..', 'app', '(admin)', 'leads', '[id]')
const tempLeadsIdDir = join(tempDir, 'leads-id')

// API 라우트 복원
if (existsSync(tempApiDir) && !existsSync(apiDir)) {
  console.log('Restoring API routes after build...')
  renameSync(tempApiDir, apiDir)
}

// t 라우트 복원
if (existsSync(tempTDir) && !existsSync(tDir)) {
  console.log('Restoring t routes after build...')
  renameSync(tempTDir, tDir)
}

// leads/[id] 페이지 복원
if (existsSync(tempLeadsIdDir) && !existsSync(leadsIdDir)) {
  console.log('Restoring leads/[id] page after build...')
  // 부모 디렉토리가 없으면 생성
  const parentDir = join(__dirname, '..', 'app', '(admin)', 'leads')
  if (!existsSync(parentDir)) {
    mkdirSync(parentDir, { recursive: true })
  }
  renameSync(tempLeadsIdDir, leadsIdDir)
}


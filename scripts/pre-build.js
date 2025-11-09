/**
 * 빌드 전 스크립트: API 라우트를 임시로 제외
 * Next.js의 정적 내보내기에서 API 라우트는 지원되지 않으므로,
 * 빌드 전에 API 라우트를 임시로 다른 위치로 이동합니다.
 */

import { existsSync, mkdirSync, renameSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const apiDir = join(__dirname, '..', 'app', 'api')
const tempDir = join(__dirname, '..', '.api-temp')

// API 디렉토리가 존재하는지 확인
if (existsSync(apiDir)) {
  // 임시 디렉토리 생성
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true })
  }

  // API 디렉토리를 임시 위치로 이동
  const tempApiDir = join(tempDir, 'api')
  if (existsSync(tempApiDir)) {
    // 이미 이동된 경우 복원
    console.log('Restoring API routes from temp directory...')
    renameSync(tempApiDir, apiDir)
  } else {
    // API 디렉토리를 임시 위치로 이동
    console.log('Moving API routes to temp directory for build...')
    renameSync(apiDir, tempApiDir)
  }
}

// t 디렉토리도 처리
const tDir = join(__dirname, '..', 'app', 't')
const tempTDir = join(tempDir, 't')

if (existsSync(tDir)) {
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true })
  }

  if (existsSync(tempTDir)) {
    console.log('Restoring t routes from temp directory...')
    renameSync(tempTDir, tDir)
  } else {
    console.log('Moving t routes to temp directory for build...')
    renameSync(tDir, tempTDir)
  }
}


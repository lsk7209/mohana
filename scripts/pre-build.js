/**
 * 빌드 전 스크립트: API 라우트와 동적 페이지를 임시로 제외
 * Next.js의 정적 내보내기에서 API 라우트와 일부 동적 페이지는 지원되지 않으므로,
 * 빌드 전에 이를 임시로 다른 위치로 이동합니다.
 */

import { existsSync, mkdirSync, renameSync, rmSync } from 'fs'
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
const adminProgramsEditDir = join(__dirname, '..', 'app', 'admin', 'programs', '[slug]', 'edit')
const tempAdminProgramsEditDir = join(tempDir, 'admin-programs-edit')
const adminLeadsIdDir = join(__dirname, '..', 'app', 'admin', 'leads', '[id]')
const tempAdminLeadsIdDir = join(tempDir, 'admin-leads-id')

console.log('🔧 Pre-build script: Preparing for static export...')

// 임시 디렉토리 생성
if (!existsSync(tempDir)) {
  mkdirSync(tempDir, { recursive: true })
  console.log(`✓ Created temp directory: ${tempDir}`)
}

// API 디렉토리가 존재하고 아직 이동되지 않은 경우에만 이동
if (existsSync(apiDir) && !existsSync(tempApiDir)) {
  console.log('📦 Moving API routes to temp directory for build...')
  renameSync(apiDir, tempApiDir)
  console.log('✓ API routes moved')
} else if (existsSync(tempApiDir)) {
  console.log('ℹ API routes already moved')
}

// t 디렉토리가 존재하고 아직 이동되지 않은 경우에만 이동
if (existsSync(tDir) && !existsSync(tempTDir)) {
  console.log('📦 Moving t routes to temp directory for build...')
  renameSync(tDir, tempTDir)
  console.log('✓ t routes moved')
} else if (existsSync(tempTDir)) {
  console.log('ℹ t routes already moved')
}

// leads/[id] 페이지가 존재하고 아직 이동되지 않은 경우에만 이동
if (existsSync(leadsIdDir) && !existsSync(tempLeadsIdDir)) {
  console.log('📦 Moving leads/[id] page to temp directory for build...')
  renameSync(leadsIdDir, tempLeadsIdDir)
  console.log('✓ leads/[id] page moved')
} else if (existsSync(tempLeadsIdDir)) {
  console.log('ℹ leads/[id] page already moved')
}

// admin/programs/[slug]/edit 페이지가 존재하고 아직 이동되지 않은 경우에만 이동
if (existsSync(adminProgramsEditDir)) {
  if (!existsSync(tempAdminProgramsEditDir)) {
    console.log('📦 Moving admin/programs/[slug]/edit page to temp directory for build...')
    renameSync(adminProgramsEditDir, tempAdminProgramsEditDir)
    console.log('✓ admin/programs/[slug]/edit page moved')
  } else {
    // 이미 이동된 경우 원본 디렉토리만 삭제
    rmSync(adminProgramsEditDir, { recursive: true, force: true })
    console.log('✓ admin/programs/[slug]/edit page removed (already in temp)')
  }
} else if (existsSync(tempAdminProgramsEditDir)) {
  console.log('ℹ admin/programs/[slug]/edit page already moved')
}

// admin/leads/[id] 페이지가 존재하고 아직 이동되지 않은 경우에만 이동
if (existsSync(adminLeadsIdDir)) {
  if (!existsSync(tempAdminLeadsIdDir)) {
    console.log('📦 Moving admin/leads/[id] page to temp directory for build...')
    renameSync(adminLeadsIdDir, tempAdminLeadsIdDir)
    console.log('✓ admin/leads/[id] page moved')
  } else {
    // 이미 이동된 경우 원본 디렉토리만 삭제
    rmSync(adminLeadsIdDir, { recursive: true, force: true })
    console.log('✓ admin/leads/[id] page removed (already in temp)')
  }
} else if (existsSync(tempAdminLeadsIdDir)) {
  console.log('ℹ admin/leads/[id] page already moved')
}

console.log('✅ Pre-build script completed')


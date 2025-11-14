/**
 * 빌드 후 스크립트: API 라우트와 동적 페이지 복원 + 출력 디렉토리 설정
 */

import { existsSync, renameSync, mkdirSync, cpSync, readdirSync, readFileSync, writeFileSync } from 'fs'
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

// Cloudflare Pages를 위한 출력 디렉토리 설정
// Next.js의 output: 'export'는 프로젝트 루트의 'out' 디렉토리에 생성됩니다
const rootOutDir = join(__dirname, '..', 'out') // Next.js가 실제로 생성하는 위치
const nextOutDir = join(__dirname, '..', '.next', 'out') // Cloudflare Pages가 찾는 위치
const nextStaticDir = join(__dirname, '..', '.next', 'static')
const vercelOutputDir = join(__dirname, '..', '.vercel', 'output', 'static')
const finalOutputDir = join(__dirname, '..', '.next', 'out')

// 실제 출력 디렉토리 찾기
function findOutputDirectory() {
  // 1. 프로젝트 루트의 'out' 디렉토리 확인 (Next.js output: 'export'의 기본 위치)
  if (existsSync(rootOutDir)) {
    console.log(`Found build output at: ${rootOutDir}`)
    return rootOutDir
  }
  
  // 2. .next/out 확인 (일부 설정에서 사용될 수 있음)
  if (existsSync(nextOutDir)) {
    console.log(`Found build output at: ${nextOutDir}`)
    return nextOutDir
  }
  
  // 3. export-detail.json 확인하여 실제 출력 위치 파악
  const exportDetailPath = join(__dirname, '..', '.next', 'export-detail.json')
  if (existsSync(exportDetailPath)) {
    try {
      const exportDetail = JSON.parse(readFileSync(exportDetailPath, 'utf-8'))
      if (exportDetail.outDir) {
        const customOutDir = join(__dirname, '..', exportDetail.outDir)
        if (existsSync(customOutDir)) {
          console.log(`Found build output at: ${customOutDir}`)
          return customOutDir
        }
      }
    } catch (err) {
      console.warn('Could not read export-detail.json:', err.message)
    }
  }
  
  return null
}

// 디렉토리 존재 확인 및 대기
let retries = 0
const maxRetries = 10
const retryDelay = 2000 // 2초

function waitForOutput(callback) {
  const outputDir = findOutputDirectory()
  
  if (outputDir) {
    callback(outputDir)
  } else if (retries < maxRetries) {
    retries++
    console.log(`Waiting for build output to be created... (attempt ${retries}/${maxRetries})`)
    setTimeout(() => waitForOutput(callback), retryDelay)
  } else {
    console.error('Error: Build output directory not found after all attempts.')
    console.error('Build may have failed or output is in an unexpected location.')
    // .next 디렉토리 확인
    const nextDir = join(__dirname, '..', '.next')
    if (existsSync(nextDir)) {
      console.log('Checking .next directory contents...')
      try {
        const contents = readdirSync(nextDir)
        console.log(`.next directory contains: ${contents.join(', ')}`)
      } catch (err) {
        console.error('Error reading .next directory:', err)
      }
    }
    process.exit(1)
  }
}

waitForOutput((outputDir) => {
  // _redirects 및 _headers 파일을 out 디렉토리로 생성/복사
  const rootDir = join(__dirname, '..')
  const headersSource = join(rootDir, '_headers')
  const redirectsDest = join(outputDir, '_redirects')
  const headersDest = join(outputDir, '_headers')
  
  try {
    // 출력 디렉토리 존재 확인
    if (!existsSync(outputDir)) {
      console.error(`Error: Output directory does not exist: ${outputDir}`)
      process.exit(1)
    }
    
    // 출력 디렉토리 내용 확인
    try {
      const outputContents = readdirSync(outputDir)
      if (outputContents.length === 0) {
        console.warn(`Warning: Output directory is empty: ${outputDir}`)
      } else {
        console.log(`Output directory contains ${outputContents.length} items`)
      }
    } catch (err) {
      console.warn(`Warning: Could not read output directory: ${err.message}`)
    }
    
    // _redirects 파일 동적 생성
    // Worker URL은 환경 변수에서 가져오거나, 상대 경로 사용
    const workerUrl = process.env.WORKER_URL || process.env.CLOUDFLARE_WORKER_URL || process.env.NEXT_PUBLIC_WORKER_URL
    
    let redirectsContent = ''
    if (workerUrl) {
      // Cloudflare Pages는 200 프록시가 외부 URL을 지원하지 않으므로
      // 클라이언트 측에서 직접 Worker URL로 요청하도록 안내
      // 또는 Cloudflare Pages Functions를 사용해야 합니다
      redirectsContent = `# Cloudflare Pages Redirects
# 참고: Cloudflare Pages는 200 프록시가 외부 URL을 지원하지 않습니다
# API 요청은 클라이언트 측에서 직접 Worker URL로 전송됩니다
# 또는 Cloudflare Pages Functions를 사용하여 프록시할 수 있습니다
# Worker URL: ${workerUrl}
`
      console.log(`✓ Worker URL detected: ${workerUrl}`)
      console.log('Note: Cloudflare Pages does not support external URLs in 200 proxy redirects.')
      console.log('API requests will be made directly to the Worker URL from the client.')
    } else {
      // Worker URL이 없는 경우
      redirectsContent = `# Cloudflare Pages Redirects
# API 요청은 Cloudflare Pages Functions 또는 Workers로 처리됩니다
# NEXT_PUBLIC_WORKER_URL 환경 변수를 Cloudflare Pages Dashboard에서 설정하세요
# 예: NEXT_PUBLIC_WORKER_URL=https://mohana-worker.your-account.workers.dev
`
      console.warn('⚠ Warning: NEXT_PUBLIC_WORKER_URL not set.')
      console.warn('API requests will not work without a Worker URL.')
      console.warn('Please set NEXT_PUBLIC_WORKER_URL in Cloudflare Pages Dashboard → Settings → Environment Variables')
    }
    
    // _redirects 파일 작성
    writeFileSync(redirectsDest, redirectsContent, 'utf-8')
    console.log(`✓ _redirects file generated at: ${redirectsDest}`)
    
    // _headers 파일 복사
    if (existsSync(headersSource)) {
      cpSync(headersSource, headersDest, { force: true })
      console.log(`✓ _headers file copied to: ${headersDest}`)
    } else {
      // _headers 파일이 없으면 기본 보안 헤더 생성
      const defaultHeaders = `# Cloudflare Pages Headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:; img-src 'self' data: https: blob:; media-src 'self' https: blob:; connect-src 'self' https://vercel.live https://*.vercel-scripts.com https://*.workers.dev wss://*.vercel.live; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
`
      writeFileSync(headersDest, defaultHeaders, 'utf-8')
      console.log(`✓ _headers file generated with default security headers at: ${headersDest}`)
    }
    
    // 빌드 출력 검증
    const indexHtml = join(outputDir, 'index.html')
    if (!existsSync(indexHtml)) {
      console.warn('⚠ Warning: index.html not found in output directory')
      console.warn('This may indicate a build issue.')
    } else {
      console.log('✓ index.html found in output directory')
    }
    
  } catch (error) {
    console.error('❌ Error: Could not create _redirects or _headers:', error.message)
    console.error('Stack trace:', error.stack)
    process.exit(1)
  }
  
  // Cloudflare Pages는 'out' 디렉토리를 직접 사용하므로 추가 복사 불필요
  // cloudflare-pages.toml에서 output_directory = "out"으로 설정되어 있음
  console.log('')
  console.log('✅ Build output ready!')
  console.log(`   Output directory: ${outputDir}`)
  console.log('   Cloudflare Pages will use this directory as the output directory.')
  console.log('')
  console.log('📋 Deployment Checklist:')
  console.log('   1. Verify NEXT_PUBLIC_WORKER_URL is set in Cloudflare Pages Dashboard')
  console.log('   2. Verify Build output directory is set to "out" in Dashboard')
  console.log('   3. Check deployment logs for any errors')
  console.log('')
})


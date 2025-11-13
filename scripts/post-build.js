/**
 * 빌드 후 스크립트: API 라우트와 동적 페이지 복원 + 출력 디렉토리 설정
 */

import { existsSync, renameSync, mkdirSync, cpSync, readdirSync, readFileSync } from 'fs'
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
  // _redirects 및 _headers 파일을 out 디렉토리로 복사
  const rootDir = join(__dirname, '..')
  const redirectsSource = join(rootDir, '_redirects')
  const headersSource = join(rootDir, '_headers')
  const redirectsDest = join(outputDir, '_redirects')
  const headersDest = join(outputDir, '_headers')
  
  try {
    if (existsSync(redirectsSource)) {
      cpSync(redirectsSource, redirectsDest, { force: true })
      console.log('_redirects file copied to output directory')
    }
    
    if (existsSync(headersSource)) {
      cpSync(headersSource, headersDest, { force: true })
      console.log('_headers file copied to output directory')
    }
  } catch (error) {
    console.warn('Warning: Could not copy _redirects or _headers:', error.message)
  }
  
  // Cloudflare Pages는 'out' 디렉토리를 직접 사용하므로 추가 복사 불필요
  // cloudflare-pages.toml에서 output_directory = "out"으로 설정되어 있음
  console.log(`Build output ready at: ${outputDir}`)
  console.log('Cloudflare Pages will use this directory as the output directory.')
})


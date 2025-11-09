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
// Next.js는 .next/out에 생성하지만, 실제로는 다른 위치에 생성될 수 있음
const nextOutDir = join(__dirname, '..', '.next', 'out')
const nextStaticDir = join(__dirname, '..', '.next', 'static')
const vercelOutputDir = join(__dirname, '..', '.vercel', 'output', 'static')
const finalOutputDir = join(__dirname, '..', '.next', 'out')

// 실제 출력 디렉토리 찾기
function findOutputDirectory() {
  // 1. .next/out 확인
  if (existsSync(nextOutDir)) {
    console.log(`Found build output at: ${nextOutDir}`)
    return nextOutDir
  }
  
  // 2. export-detail.json 확인하여 실제 출력 위치 파악
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
  
  // 3. .next/static이 있는 경우, 이를 기반으로 out 디렉토리 생성
  if (existsSync(nextStaticDir)) {
    console.log('Found .next/static directory, creating .next/out from static files...')
    // static 디렉토리의 내용을 out으로 복사
    if (!existsSync(finalOutputDir)) {
      mkdirSync(finalOutputDir, { recursive: true })
    }
    try {
      cpSync(nextStaticDir, finalOutputDir, { recursive: true, force: true })
      console.log(`Created build output at: ${finalOutputDir}`)
      return finalOutputDir
    } catch (err) {
      console.error('Error copying static to out:', err)
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
  // .vercel/output 디렉토리 생성
  const vercelOutputParent = join(__dirname, '..', '.vercel', 'output')
  if (!existsSync(vercelOutputParent)) {
    mkdirSync(vercelOutputParent, { recursive: true })
  }
  
  // .vercel/output/static 디렉토리 생성
  if (!existsSync(vercelOutputDir)) {
    mkdirSync(vercelOutputDir, { recursive: true })
  }
  
  // 출력 디렉토리의 내용을 .vercel/output/static으로 복사
  console.log(`Copying build output from ${outputDir} to .vercel/output/static for Cloudflare Pages...`)
  try {
    cpSync(outputDir, vercelOutputDir, { recursive: true, force: true })
    console.log('Build output copied successfully!')
  } catch (error) {
    console.error('Error copying build output:', error)
    process.exit(1)
  }
  
  // .next/out이 없으면 생성 (Cloudflare Pages가 찾을 수 있도록)
  if (!existsSync(finalOutputDir) && outputDir !== finalOutputDir) {
    console.log('Creating .next/out directory for Cloudflare Pages...')
    mkdirSync(finalOutputDir, { recursive: true })
    try {
      cpSync(outputDir, finalOutputDir, { recursive: true, force: true })
      console.log('.next/out directory created successfully!')
    } catch (error) {
      console.warn('Warning: Could not create .next/out directory:', error.message)
    }
  }
})


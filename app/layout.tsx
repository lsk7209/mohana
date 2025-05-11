import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./hooks/use-auth"

const inter = Inter({ subsets: ["latin"] })

// Metadata needs to be in a separate variable since we're using 'use client'
const metadata = {
  title: "워크샵 포트폴리오",
  description: "다양한 워크샵 프로그램을 소개하는 포트폴리오 사이트",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

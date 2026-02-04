import type { Metadata } from "next"
import "@/index.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { siteData } from "@/data"

export const metadata: Metadata = {
  title: siteData.meta.title,
  description: siteData.meta.description,
  keywords: siteData.meta.keywords,
  alternates: { canonical: siteData.meta.url }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-6 pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

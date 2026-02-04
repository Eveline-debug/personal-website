"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="h-9 w-9 rounded-full border border-border/60 bg-background"
        aria-label="Toggle theme"
        type="button"
      />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background text-foreground transition hover:text-primary"
      aria-label="Toggle theme"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

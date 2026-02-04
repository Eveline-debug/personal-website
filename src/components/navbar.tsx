"use client"

import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { siteData } from "@/data"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { navigation, profile } = siteData

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-sm font-semibold text-foreground">
          个人主页
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.main.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition group-hover:text-foreground"
            >
              {navigation.portfolio.label}
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute right-0 top-8 hidden min-w-[180px] rounded-2xl border border-border/60 bg-background p-3 shadow-xl group-hover:block">
              {navigation.portfolio.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <ThemeToggle />
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border/60 bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navigation.main.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {navigation.portfolio.label}
            </div>
            {navigation.portfolio.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

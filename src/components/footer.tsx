"use client"

import { Mail } from "lucide-react"
import { siteData } from "@/data"

export function Footer() {
  const { contact, footer } = siteData

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-border/60 bg-background/80 py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              {contact.headline}
            </h2>
            <p className="text-sm text-muted-foreground">
              {contact.description}
            </p>
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            {contact.email}
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>{footer.copyright}</span>
          <span>{footer.stack}</span>
        </div>
      </div>
    </footer>
  )
}

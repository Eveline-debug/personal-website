"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { siteData } from "@/data"
import { SectionHeading } from "@/components/section-heading"

export function TechReportingSection() {
  return (
    <section id="portfolio-reporting" className="scroll-mt-24">
      <div className="space-y-10">
        <SectionHeading
          title="Portfolio · Tech Reporting"
          subtitle="科技报道与深度写作，记录趋势与行业洞察。"
        />
        <div className="space-y-6">
          {siteData.portfolio.techReporting.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="grid gap-6 rounded-3xl border border-border/60 bg-card p-6 md:grid-cols-[200px_1fr]"
            >
              <div className="relative h-36 w-full overflow-hidden rounded-2xl border border-border/60 bg-secondary">
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="12rem"
                />
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{item.platform}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
                <a
                  href={item.link}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Read Article
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

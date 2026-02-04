"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { siteData } from "@/data"
import { SectionHeading } from "@/components/section-heading"

export function DataAnalysisSection() {
  return (
    <section id="portfolio-data" className="scroll-mt-24">
      <div className="space-y-10">
        <SectionHeading
          title="Portfolio · Data Analysis"
          subtitle="展示逻辑严密的数据洞察与可视化成果。"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {siteData.portfolio.dataAnalysis.map((item) => (
            <motion.article
              key={item.title}
              whileHover={{ y: -6 }}
              className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-card p-6 md:flex-row"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-border/60 bg-secondary md:h-32 md:w-48">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="12rem"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.insight}
                  </p>
                </div>
                <a
                  href={item.link}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Notebook / Report
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

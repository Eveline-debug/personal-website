"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Code2, ExternalLink } from "lucide-react"
import { siteData } from "@/data"
import { SectionHeading } from "@/components/section-heading"

export function VibecodingSection() {
  return (
    <section id="portfolio-vibecoding" className="scroll-mt-24">
      <div className="space-y-10">
        <SectionHeading
          title="Portfolio · Vibecoding"
          subtitle="聚焦视觉冲击力与 AI 互动的创意编程作品。"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteData.portfolio.vibecoding.map((item) => (
            <motion.article
              key={item.title}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card transition"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={item.media}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 24rem, (min-width: 768px) 20rem, 100vw"
                />
              </div>
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/60 bg-secondary px-3 py-1 text-xs text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <a
                    href={item.demo}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                  <a
                    href={item.source}
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Code2 className="h-4 w-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

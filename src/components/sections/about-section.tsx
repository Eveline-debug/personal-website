"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { siteData } from "@/data"
import { SectionHeading } from "@/components/section-heading"

export function AboutSection() {
  const { about } = siteData

  return (
    <section id="about" className="scroll-mt-24">
      <div className="space-y-10">
        <SectionHeading
          title="About & Resume"
          subtitle={about.subtitle}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 rounded-3xl border border-border/60 bg-card p-8 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              {about.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {about.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border/60 bg-secondary px-4 py-2 text-xs font-medium text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6">
            <div className="rounded-2xl border border-dashed border-border/70 bg-secondary/60 p-6">
              <p className="text-sm text-muted-foreground">简历下载</p>
              <p className="mt-2 text-xl font-semibold text-foreground">
                {about.title}
              </p>
            </div>
            <a
              href={about.resumeUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download Resume (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

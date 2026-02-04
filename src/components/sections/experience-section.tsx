"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { siteData } from "@/data"
import { SectionHeading } from "@/components/section-heading"

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="space-y-10">
        <SectionHeading
          title="Experience"
          subtitle="以时间轴呈现实习与项目经历，突出核心产出与影响力。"
        />
        <div className="space-y-8 border-l border-border/60 pl-6">
          {siteData.experience.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative rounded-3xl border border-border/60 bg-card p-6"
            >
              <span className="absolute -left-10 top-8 h-4 w-4 rounded-full border border-border/60 bg-background" />
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-border/60 bg-secondary">
                  <Image
                    src={item.logo}
                    alt={item.company}
                    fill
                    className="object-cover"
                    sizes="3rem"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.period} · {item.location}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.company}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

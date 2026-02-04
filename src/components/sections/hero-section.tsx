"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, Globe } from "lucide-react"
import { siteData } from "@/data"
import { Typewriter } from "@/components/typewriter"

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  globe: Globe
}

export function HeroSection() {
  const { profile, typewriter, cta, socials } = siteData

  return (
    <section id="home" className="scroll-mt-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Personal Brand
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={48}
                height={48}
                className="rounded-full border border-border/60 object-cover"
                priority
              />
            </div>
            <p className="text-lg text-muted-foreground">
              {profile.tagline}
            </p>
          </div>
          <div className="text-xl font-medium text-foreground">
            <Typewriter words={typewriter} />
          </div>
          {profile.education ? (
            <div className="text-sm text-muted-foreground">
              {profile.education}
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={cta.primary.href}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              {cta.primary.label}
            </a>
            <a
              href={cta.secondary.href}
              className="inline-flex items-center justify-center rounded-full border border-border/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              {cta.secondary.label}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{profile.role}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:border-primary hover:text-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}

import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { VibecodingSection } from "@/components/sections/vibecoding-section"
import { DataAnalysisSection } from "@/components/sections/data-analysis-section"
import { TechReportingSection } from "@/components/sections/tech-reporting-section"

export default function HomePage() {
  return (
    <div className="space-y-20">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <VibecodingSection />
      <DataAnalysisSection />
      <TechReportingSection />
    </div>
  )
}

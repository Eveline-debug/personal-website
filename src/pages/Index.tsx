import "@/index.css"
import { ThemeProvider } from "../components/theme-provider"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { HeroSection } from "../components/sections/hero-section"
import { AboutSection } from "../components/sections/about-section"
import { ExperienceSection } from "../components/sections/experience-section"
import { VibecodingSection } from "../components/sections/vibecoding-section"
import { DataAnalysisSection } from "../components/sections/data-analysis-section"
import { TechReportingSection } from "../components/sections/tech-reporting-section"

export default function IndexPage() {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-24 space-y-20">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <VibecodingSection />
        <DataAnalysisSection />
        <TechReportingSection />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

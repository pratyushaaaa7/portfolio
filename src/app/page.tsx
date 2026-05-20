import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { GitHubContributions } from "@/components/sections/GitHubContributions";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProjectsLoading } from "@/components/sections/ProjectsLoading";

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
  loading: () => <ProjectsLoading />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <GitHubContributions />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}

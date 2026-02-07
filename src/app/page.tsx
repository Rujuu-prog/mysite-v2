import { MainLayout } from "@/components/layouts/MainLayout";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HomeSection } from "@/components/sections/HomeSection";
import { WorksSection } from "@/components/sections/WorksSection";

export default function Home() {
  return (
    <MainLayout>
      <HomeSection />
      <WorksSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </MainLayout>
  );
}

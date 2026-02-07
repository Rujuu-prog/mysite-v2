"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HomeSection } from "@/components/sections/HomeSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { useScrollBackground } from "@/hooks/useScrollBackground";
import { fadeIn } from "@/lib/animations";

export default function Home() {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  useScrollBackground();

  return (
    <MainLayout>
      <HomeSection hasReachedBottom={hasReachedBottom} />
      <WorksSection />
      <AboutSection />
      <ExperienceSection />
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onViewportEnter={() => setHasReachedBottom(true)}
        className="py-16 text-center text-caption text-muted"
      >
        Hope you found something enjoyable.
      </motion.p>
      <ContactSection />
    </MainLayout>
  );
}

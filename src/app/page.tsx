"use client";

import { motion } from "motion/react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HomeSection } from "@/components/sections/HomeSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { fadeIn } from "@/lib/animations";

export default function Home() {
  return (
    <MainLayout>
      <HomeSection />
      <WorksSection />
      <AboutSection />
      <ExperienceSection />
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 text-center text-caption text-muted"
      >
        Thanks for scrolling.
      </motion.p>
      <ContactSection />
    </MainLayout>
  );
}

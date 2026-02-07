"use client";

import { motion } from "motion/react";
import { useCallback, useState } from "react";
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
  const [hasReachedContact, setHasReachedContact] = useState(false);
  useScrollBackground();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onViewportEnter={() => setHasReachedContact(true)}
        className={`pb-12 pt-8 text-center text-caption transition-colors duration-500 ${
          hasReachedContact ? "text-foreground" : "text-muted"
        }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          className="cursor-pointer transition-colors duration-200 hover:text-accent"
        >
          Back to the beginning.
        </button>
      </motion.p>
    </MainLayout>
  );
}

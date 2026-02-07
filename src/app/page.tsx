"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ScrollHint } from "@/components/atoms/ScrollHint";
import { ShootingStar } from "@/components/atoms/ShootingStar";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PageLoader } from "@/components/organisms/PageLoader";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HomeSection } from "@/components/sections/HomeSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { useScrollBackground } from "@/hooks/useScrollBackground";
import { fadeIn } from "@/lib/animations";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [hasReachedContact, setHasReachedContact] = useState(false);
  useScrollBackground();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <ScrollHint isLoading={isLoading} />
      <ShootingStar />
      <MainLayout isLoading={isLoading}>
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
          <span className="group relative inline-block cursor-default">
            <span className="inline-block opacity-100 blur-none transition-[filter,opacity] duration-[800ms] ease-in-out group-hover:opacity-0 group-hover:blur-[8px]">
              Hope you found something enjoyable.
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 blur-[8px] transition-[filter,opacity] duration-[800ms] ease-in-out group-hover:opacity-100 group-hover:blur-none">
              Did you notice the stars?
            </span>
          </span>
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
    </>
  );
}

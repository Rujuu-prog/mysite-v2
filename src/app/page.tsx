"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { OverscrollHint } from "@/components/atoms/OverscrollHint";
import { ScrollHint } from "@/components/atoms/ScrollHint";
import { ShootingStar } from "@/components/atoms/ShootingStar";
import { StarfieldOverlay } from "@/components/atoms/StarfieldOverlay";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PageLoader } from "@/components/organisms/PageLoader";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HomeSection } from "@/components/sections/HomeSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useOverscrollStars } from "@/hooks/useOverscrollStars";
import { useScrollBackground } from "@/hooks/useScrollBackground";
import { fadeIn } from "@/lib/animations";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [hasReachedContact, setHasReachedContact] = useState(false);
  const [isMessageRevealed, setIsMessageRevealed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useScrollBackground();
  useOverscrollStars(!isLoading);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <ScrollHint isLoading={isLoading} />
      <ShootingStar />
      <OverscrollHint />
      <StarfieldOverlay />
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
          onViewportEnter={() => {
            setHasReachedBottom(true);
            if (isMobile) {
              if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
              revealTimerRef.current = setTimeout(
                () => setIsMessageRevealed(true),
                3000,
              );
            }
          }}
          className="py-16 text-center text-caption text-muted"
        >
          <span className="group relative inline-block cursor-default">
            <span
              className={`inline-block transition-[filter,opacity] duration-[800ms] ease-in-out group-hover:opacity-0 group-hover:blur-[8px] ${
                isMessageRevealed
                  ? "opacity-0 blur-[8px]"
                  : "opacity-100 blur-none"
              }`}
            >
              Hope you found something enjoyable.
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-[filter,opacity] duration-[800ms] ease-in-out group-hover:opacity-100 group-hover:blur-none ${
                isMessageRevealed
                  ? "opacity-100 blur-none"
                  : "opacity-0 blur-[8px]"
              }`}
            >
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

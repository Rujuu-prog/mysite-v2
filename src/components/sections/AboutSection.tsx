"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { PhilosophyText } from "@/components/molecules/PhilosophyText";
import { SkillCategory } from "@/components/molecules/SkillCategory";
import { skillCategories } from "@/data/skills";
import { staggerContainer } from "@/lib/animations";

export function AboutSection() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  const skillsContent = (
    <>
      <h3 className="mb-6 text-foreground">Skills</h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-8 sm:grid-cols-2"
      >
        {skillCategories.map((cat) => (
          <SkillCategory key={cat.id} category={cat} />
        ))}
      </motion.div>
    </>
  );

  return (
    <section id="about">
      <div ref={scrollTrackRef} className="h-[200vh]">
        <div className="sticky top-0 z-10 h-screen px-6 pt-[15vh] md:grid md:grid-rows-[1fr_auto_1fr] md:px-12 md:pt-0">
          {/* Desktop: grid row 1 spacer */}
          <div className="hidden md:block" />

          {/* Main content */}
          <div>
            <SectionHeading>About</SectionHeading>
            <PhilosophyText scrollYProgress={scrollYProgress} />
            <div className="mt-8">{skillsContent}</div>
          </div>
        </div>
      </div>

      {/* モバイルSkillsオーバーフロー分の余白 */}
      <div className="h-[580px] md:hidden" aria-hidden="true" />
    </section>
  );
}

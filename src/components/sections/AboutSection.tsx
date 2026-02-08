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
      <div ref={scrollTrackRef} className="h-[140vh] md:h-[200vh]">
        <div className="sticky top-0 z-10 grid h-screen grid-rows-[1fr_auto_1fr] px-6 md:px-12">
          {/* Row 1: 上部スペーサー */}
          <div />

          {/* Row 2: 中央配置されるPhilosophyコンテンツ */}
          <div className="row-start-2">
            <SectionHeading>About</SectionHeading>
            <PhilosophyText scrollYProgress={scrollYProgress} />
            <div className="mt-8 hidden md:block">{skillsContent}</div>
          </div>

          {/* Row 3: モバイルSkills（h-screenから下にオーバーフロー、stickyと一緒に移動） */}
          <div className="row-start-3 mt-8 self-start md:hidden">
            {skillsContent}
          </div>
        </div>
      </div>

      {/* モバイルSkillsオーバーフロー + セクション間余白 */}
      <div className="h-[400px] md:hidden" aria-hidden="true" />
    </section>
  );
}

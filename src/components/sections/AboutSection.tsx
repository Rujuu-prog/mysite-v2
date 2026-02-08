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
        <div className="sticky top-0 flex h-screen flex-col justify-center px-6 md:px-12">
          <SectionHeading>About</SectionHeading>

          <PhilosophyText scrollYProgress={scrollYProgress} />

          <div className="mt-8 hidden md:block">{skillsContent}</div>
        </div>
      </div>

      <div className="-mt-10 px-6 pb-24 md:hidden">{skillsContent}</div>
    </section>
  );
}

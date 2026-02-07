"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";
import { experiences } from "@/data/experience";
import { staggerContainer } from "@/lib/animations";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-24 md:px-12">
      <SectionHeading>Experience</SectionHeading>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-xl"
      >
        {experiences.map((exp) => (
          <ExperienceItem key={exp.id} experience={exp} />
        ))}
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { WorkCard } from "@/components/molecules/WorkCard";
import { WorkModal } from "@/components/organisms/WorkModal";
import { works } from "@/data/works";
import { staggerContainer } from "@/lib/animations";
import type { Work } from "@/types";

export function WorksSection() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  return (
    <section id="works" className="px-6 py-24 md:px-12">
      <SectionHeading>Works</SectionHeading>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-8 sm:grid-cols-2"
      >
        {works.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            onClick={() => work.detail && setSelectedWork(work)}
          />
        ))}
      </motion.div>
      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  );
}

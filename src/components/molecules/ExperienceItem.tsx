"use client";

import { motion } from "motion/react";
import { Tag } from "@/components/atoms/Tag";
import { slideUp } from "@/lib/animations";
import type { Experience } from "@/types";

type Props = {
  experience: Experience;
};

export function ExperienceItem({ experience }: Props) {
  return (
    <motion.div
      variants={slideUp}
      className="relative border-l-2 border-border pl-6 pb-8 last:pb-0"
    >
      <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-accent" />
      <p className="text-caption text-muted">{experience.period}</p>
      <h3 className="mt-1 text-foreground">{experience.title}</h3>
      <p className="text-caption text-accent">{experience.company}</p>
      <p className="mt-2 text-sm text-muted">{experience.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {experience.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </motion.div>
  );
}

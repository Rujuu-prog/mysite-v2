"use client";

import { motion } from "motion/react";
import { forwardRef } from "react";
import { Tag } from "@/components/atoms/Tag";
import { numberReveal, slideLeft, slideRight } from "@/lib/animations";
import type { Experience } from "@/types";

type Props = {
  experience: Experience;
  index: number;
  isActive: boolean;
};

export const ExperienceItem = forwardRef<HTMLDivElement, Props>(
  function ExperienceItem({ experience, index, isActive }, ref) {
    const slideVariant = index % 2 === 0 ? slideLeft : slideRight;

    return (
      <motion.div
        ref={ref}
        data-index={index}
        variants={slideVariant}
        className="relative border-l-2 border-border pl-6 pb-8 last:pb-0"
      >
        <div
          className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-accent-strong transition-all duration-300"
          style={{
            opacity: isActive ? 1 : 0.4,
            transform: isActive ? "scale(1.5)" : "scale(1)",
          }}
        />
        <motion.p variants={numberReveal} className="text-caption text-muted">
          {experience.period}
        </motion.p>
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
  },
);

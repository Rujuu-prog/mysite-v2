"use client";

import { motion } from "motion/react";
import { Tag } from "@/components/atoms/Tag";
import { slideUp } from "@/lib/animations";
import type { SkillCategory as SkillCategoryType } from "@/types";

type Props = {
  category: SkillCategoryType;
};

export function SkillCategory({ category }: Props) {
  return (
    <motion.div variants={slideUp}>
      <h3 className="mb-3 text-foreground">{category.category}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <Tag key={skill.name} label={skill.name} />
        ))}
      </div>
    </motion.div>
  );
}

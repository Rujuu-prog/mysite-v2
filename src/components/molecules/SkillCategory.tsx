"use client";

import { motion } from "motion/react";
import { SkillIcon } from "@/components/atoms/SkillIcon";
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
          <span key={skill.name} className="flex items-center gap-1.5">
            <SkillIcon name={skill.name} />
            <Tag label={skill.name} />
          </span>
        ))}
      </div>
    </motion.div>
  );
}

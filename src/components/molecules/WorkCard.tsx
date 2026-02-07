"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Tag } from "@/components/atoms/Tag";
import { slideUp } from "@/lib/animations";
import type { Work } from "@/types";

type Props = {
  work: Work;
  onClick: () => void;
};

export function WorkCard({ work, onClick }: Props) {
  return (
    <motion.button
      type="button"
      variants={slideUp}
      onClick={onClick}
      className="group w-full cursor-pointer text-left"
    >
      <div className="overflow-hidden rounded border border-border transition-colors duration-200 group-hover:border-accent">
        <Image
          src={work.thumbnail}
          alt={work.title}
          width={600}
          height={400}
          className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-foreground transition-colors duration-200 group-hover:text-accent">
          {work.title}
        </h3>
        <p className="mt-1 text-caption text-muted">{work.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <span className="mt-2 inline-block text-caption text-accent-strong opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          View details →
        </span>
      </div>
    </motion.button>
  );
}

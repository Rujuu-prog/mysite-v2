"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { SkillCategory } from "@/components/molecules/SkillCategory";
import { skillCategories } from "@/data/skills";
import { slideUp, staggerContainer } from "@/lib/animations";

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 md:px-12">
      <SectionHeading>About</SectionHeading>

      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-12"
      >
        <h3 className="mb-4 text-foreground">Philosophy</h3>
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            ものづくりを通して、できるだけ多くの人に良い影響を与えたいと考えています。
          </p>
          <p>
            自分がつくったものが、誰かの時間を少し楽にしたり、迷いを減らしたり、前向きな行動につながる。
            そんな小さな積み重ねに価値があると思っています。
          </p>
          <p>
            技術はそのための手段です。
            新しい技術や流行に興味はありますが、「使いたい」よりも「役に立つかどうか」を大切にしたい。
          </p>
          <p>
            コードや設計は、あとから関わる人への思いやりだと思っています。
            読みやすく、壊れにくく、少しずつ育てていける形を意識しています。
          </p>
          <p>
            派手さよりも、安心して使い続けられること。
            一部の人だけでなく、できるだけ多くの人にとってやさしいものをつくることを目指しています。
          </p>
        </div>
      </motion.div>

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
    </section>
  );
}

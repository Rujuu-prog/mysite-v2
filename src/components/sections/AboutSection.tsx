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
        <div className="space-y-3.5 text-sm leading-relaxed text-muted">
          <p>
            子供のころから、自分が作ったものが誰かの役に立つことで、喜びを感じる人間でした。
          </p>
          <p>
            自分の作ったものによって、誰かの時間が少し楽になったり、迷いが減ったり、前向きな行動につながる。
          </p>
          <p>
            そうした小さな変化の積み重ねに価値があると考えています。
          </p>
          <p>
            その思いは今も変わらず、日々の開発においても「使う人の負担を減らすこと」「自然に使えること」を意識しています。
          </p>
          <p>
            また、ドラえもんの世界のような近未来に憧れがあり、
          </p>
          <p>
            技術の力で人の生活を少しずつ便利にしていくことで、
            その未来が少しでも早く訪れるよう貢献したいと考えています。
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

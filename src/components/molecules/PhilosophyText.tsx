"use client";

import type { MotionValue } from "motion/react";
import { motion, useTransform } from "motion/react";
import { slideUp } from "@/lib/animations";

type Props = {
  scrollYProgress: MotionValue<number>;
};

export function PhilosophyText({ scrollYProgress }: Props) {
  const jaOpacity = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  const jaBlur = useTransform(scrollYProgress, [0.1, 0.45], [0, 12]);
  const jaFilter = useTransform(jaBlur, (v) => `blur(${v}px)`);

  const enOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const enBlur = useTransform(scrollYProgress, [0.3, 0.7], [12, 0]);
  const enFilter = useTransform(enBlur, (v) => `blur(${v}px)`);

  return (
    <div>
      <motion.h3
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-4 text-foreground"
      >
        Philosophy
      </motion.h3>

      <div className="grid">
        <motion.div
          style={{ opacity: jaOpacity, filter: jaFilter }}
          className="col-start-1 row-start-1 space-y-3.5 text-sm leading-relaxed text-muted"
        >
          <p>
            子供のころから、自分が作ったものが誰かの役に立つことで、喜びを感じる人間でした。
          </p>
          <p>
            自分の作ったものによって、誰かの時間が少し楽になったり、迷いが減ったり、前向きな行動につながる。
          </p>
          <p>そうした小さな変化の積み重ねに価値があると考えています。</p>
          <p>
            その思いは今も変わらず、日々の開発においても「使う人の負担を減らすこと」「自然に使えること」を意識しています。
          </p>
          <p>また、ドラえもんの世界のような近未来に憧れがあり、</p>
          <p>
            技術の力で人の生活を少しずつ便利にしていくことで、
            その未来が少しでも早く訪れるよう貢献したいと考えています。
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: enOpacity, filter: enFilter }}
          className="col-start-1 row-start-1 space-y-3.5 text-sm leading-relaxed text-muted"
        >
          <p>
            From a young age, I have found joy in creating things that are
            useful to others.
          </p>
          <p>
            I believe that what I build can make someone's time a little easier,
            reduce uncertainty, and encourage more positive actions. I value
            these small but meaningful changes that accumulate over time.
          </p>
          <p>
            This mindset has not changed, and it continues to guide my approach
            to development today. I focus on reducing the burden on users and
            creating experiences that feel intuitive and natural to use.
          </p>
          <p>
            I am also inspired by near-future worlds like that of Doraemon, and
            I hope to contribute—through technology—to making everyday life
            gradually more convenient, bringing that future a little closer.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";
import { experiences } from "@/data/experience";
import { staggerContainer } from "@/lib/animations";

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (el) {
        itemRefs.current.set(index, el);
      } else {
        itemRefs.current.delete(index);
      }

      // Set up observer once all items are mounted
      if (
        itemRefs.current.size === experiences.length &&
        !observerRef.current
      ) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                const idx = Number((entry.target as HTMLElement).dataset.index);
                setActiveIndex(idx);
              }
            }
          },
          {
            rootMargin: "-40% 0px -40% 0px",
            threshold: 0,
          },
        );

        for (const [, el] of itemRefs.current) {
          observerRef.current.observe(el);
        }
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

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
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={exp.id}
            experience={exp}
            index={index}
            isActive={activeIndex === index}
            ref={setItemRef(index)}
          />
        ))}
      </motion.div>
    </section>
  );
}

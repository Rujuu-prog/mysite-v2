"use client";

import { motion } from "motion/react";
import { MobileNav } from "@/components/organisms/MobileNav";
import { Sidebar } from "@/components/organisms/Sidebar";
import { blurReveal } from "@/lib/animations";

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
};

export function MainLayout({ children, isLoading = false }: Props) {
  return (
    <>
      <Sidebar isLoading={isLoading} />
      <MobileNav isLoading={isLoading} />
      <motion.main
        className="pt-14 lg:ml-60 lg:pt-0"
        variants={blurReveal}
        initial="hidden"
        animate={isLoading ? "hidden" : "visible"}
      >
        <div className="mx-auto max-w-[1120px]">{children}</div>
      </motion.main>
    </>
  );
}

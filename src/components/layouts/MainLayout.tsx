"use client";

import { MobileNav } from "@/components/organisms/MobileNav";
import { Sidebar } from "@/components/organisms/Sidebar";

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  return (
    <>
      <Sidebar />
      <MobileNav />
      <main className="pt-14 lg:ml-60 lg:pt-0">
        <div className="mx-auto max-w-[1120px]">{children}</div>
      </main>
    </>
  );
}

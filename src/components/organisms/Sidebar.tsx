"use client";

import { IconLink } from "@/components/atoms/IconLink";
import { NavItem } from "@/components/molecules/NavItem";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";

const sectionIds = navLinks.map((l) => l.id);

export function Sidebar() {
  const activeSection = useActiveSection(sectionIds);

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-60 flex-col justify-between border-r border-border bg-background p-6 lg:flex">
      <div>
        <p className="mb-8 text-sm font-semibold text-foreground">
          {siteConfig.name}
        </p>
        <nav aria-label="Main navigation">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavItem link={link} isActive={activeSection === link.id} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <IconLink href={siteConfig.socialLinks.github} label="GitHub">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </IconLink>
        <IconLink href={siteConfig.socialLinks.x} label="X">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </IconLink>
        <IconLink href={siteConfig.socialLinks.blog} label="Blog">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </IconLink>
      </div>
    </aside>
  );
}

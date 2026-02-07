"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/atoms/Button";
import { Tag } from "@/components/atoms/Tag";
import { scaleIn } from "@/lib/animations";
import type { Work } from "@/types";

type Props = {
  work: Work | null;
  onClose: () => void;
};

export function WorkModal({ work, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!work) return;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [work, handleKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {work && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={work.title}
            className="relative z-10 max-h-[85vh] w-full max-w-xl overflow-y-auto rounded border border-border bg-background p-6"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-muted transition-colors hover:text-foreground"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <Image
              src={work.thumbnail}
              alt={work.title}
              width={600}
              height={400}
              className="aspect-[3/2] w-full rounded object-cover"
            />

            <h3 className="mt-4 text-foreground">{work.title}</h3>
            {work.period && (
              <p className="mt-1 text-caption text-muted">{work.period}</p>
            )}

            <div className="mt-2 flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted">
              {work.detail}
            </p>

            <div className="mt-6 flex gap-3">
              {work.link && (
                <Button href={work.link} variant="primary" external>
                  Visit Site
                </Button>
              )}
              {work.github && (
                <Button href={work.github} variant="secondary" external>
                  GitHub
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

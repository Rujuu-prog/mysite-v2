"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { TwinklingStar } from "@/components/atoms/TwinklingStar";
import { WorkCard } from "@/components/molecules/WorkCard";
import { TagFilterPopover } from "@/components/organisms/TagFilterPopover";
import { WorkModal } from "@/components/organisms/WorkModal";
import { works } from "@/data/works";
import type { Work } from "@/types";

export function WorksSection() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const allTagsWithCount = useMemo(() => {
    const tagCount = new Map<string, number>();
    for (const work of works) {
      for (const tag of work.tags) {
        tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
      }
    }
    return [...tagCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [works]);

  const filteredWorks = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return works.filter((work) => {
      const matchesSearch =
        !q ||
        work.title.toLowerCase().includes(q) ||
        work.description.toLowerCase().includes(q) ||
        work.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => work.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags, works]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const removeTag = useCallback((tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedTags([]);
    setSearchQuery("");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  }, []);

  return (
    <section id="works" className="px-6 py-24 md:px-12">
      <SectionHeading>Works</SectionHeading>

      {/* Search bar + Filter button */}
      <div className="mb-3 flex items-center gap-3">
        <div className="relative max-w-md flex-1">
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted"
            aria-hidden="true"
          >
            ✧
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search works..."
            aria-label="Search works"
            className="w-full rounded border border-border bg-transparent py-2 pl-8 pr-8 text-sm text-foreground placeholder:text-muted transition-[border-color,box-shadow] duration-300 focus:border-accent focus:outline-none focus:[box-shadow:0_0_20px_rgba(88,152,185,0.15)]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <TagFilterPopover
          allTagsWithCount={allTagsWithCount}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          onClearTags={() => setSelectedTags([])}
        />
      </div>

      {/* Active filter pills */}
      {selectedTags.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded border border-accent/30 bg-accent/10 px-2 py-0.5 text-caption text-accent"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-0.5 text-accent/60 transition-colors hover:text-accent"
                aria-label={`Remove ${tag} filter`}
              >
                ×
              </button>
            </span>
          ))}
          {selectedTags.length > 1 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-caption text-muted transition-colors hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Works grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        <AnimatePresence mode="sync">
          {filteredWorks.map((work) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <WorkCard
                work={work}
                onClick={() => work.detail && setSelectedWork(work)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No results — empty sector */}
      <AnimatePresence>
        {filteredWorks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <div className="relative h-24 w-64">
              <TwinklingStar />
            </div>

            <p className="text-sm text-foreground/60">
              No stars found in this sector
            </p>
            <p className="text-caption text-muted">
              検索条件に一致する作品が見つかりません
            </p>

            {(selectedTags.length > 0 || searchQuery) && (
              <button
                type="button"
                onClick={clearAll}
                className="mt-2 rounded border border-accent/30 px-4 py-1.5 text-sm text-accent transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:[box-shadow:0_0_12px_rgba(88,152,185,0.15)]"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  );
}

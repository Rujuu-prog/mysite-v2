"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { WorkCard } from "@/components/molecules/WorkCard";
import { WorkModal } from "@/components/organisms/WorkModal";
import { works } from "@/data/works";
import type { Work } from "@/types";

export function WorksSection() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);

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
  }, []);

  const filteredTags = useMemo(() => {
    if (!tagSearch) return allTagsWithCount;
    const q = tagSearch.toLowerCase();
    return allTagsWithCount.filter((t) => t.tag.toLowerCase().includes(q));
  }, [allTagsWithCount, tagSearch]);

  const filteredWorks = useMemo(() => {
    return works.filter((work) => {
      const q = searchQuery.toLowerCase();
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
  }, [searchQuery, selectedTags]);

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
  }, []);

  // Close popover on outside click
  useEffect(() => {
    if (!isPopoverOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false);
        setTagSearch("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isPopoverOpen]);

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
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search works..."
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

        {/* Filter button + popover */}
        <div className="relative">
          <button
            ref={filterBtnRef}
            type="button"
            onClick={() => {
              setIsPopoverOpen((prev) => !prev);
              setTagSearch("");
            }}
            className={`flex items-center gap-1.5 rounded border px-3 py-2 text-sm transition-all duration-200 ${
              isPopoverOpen || selectedTags.length > 0
                ? "border-accent text-accent [box-shadow:0_0_12px_rgba(88,152,185,0.15)]"
                : "border-border text-muted hover:border-foreground/30 hover:text-foreground/70"
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter
            {selectedTags.length > 0 && (
              <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent/20 px-1 text-[10px] leading-none text-accent">
                {selectedTags.length}
              </span>
            )}
          </button>

          {/* Popover */}
          <AnimatePresence>
            {isPopoverOpen && (
              <motion.div
                ref={popoverRef}
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full z-40 mt-2 w-64 rounded border border-border bg-background [box-shadow:0_8px_32px_rgba(0,0,0,0.4)]"
              >
                {/* Popover search */}
                <div className="border-b border-border p-2">
                  <input
                    type="text"
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    placeholder="Search tags..."
                    className="w-full rounded bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted focus:outline-none"
                  />
                </div>

                {/* Tag list */}
                <div className="scrollbar-hide max-h-56 overflow-y-auto p-1">
                  {filteredTags.length === 0 ? (
                    <p className="px-2 py-3 text-center text-caption text-muted">
                      No tags found
                    </p>
                  ) : (
                    filteredTags.map(({ tag, count }) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-sm transition-colors duration-100 ${
                            isSelected
                              ? "bg-accent/10 text-accent"
                              : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`flex h-3.5 w-3.5 items-center justify-center rounded-sm border transition-colors ${
                                isSelected
                                  ? "border-accent bg-accent/30"
                                  : "border-border"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </span>
                            {tag}
                          </span>
                          <span className="text-caption text-muted">
                            {count}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Clear all in popover */}
                {selectedTags.length > 0 && (
                  <div className="border-t border-border p-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTags([])}
                      className="w-full rounded px-2 py-1 text-caption text-muted transition-colors hover:text-foreground"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Active filter pills */}
      {(selectedTags.length > 0 || searchQuery) && (
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
          {(selectedTags.length > 1 ||
            (selectedTags.length > 0 && searchQuery)) && (
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
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
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

      {/* No results */}
      <AnimatePresence>
        {filteredWorks.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-12 text-center text-muted"
          >
            No works found
          </motion.p>
        )}
      </AnimatePresence>

      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  );
}

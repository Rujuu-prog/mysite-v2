"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { TwinklingStar } from "@/components/atoms/TwinklingStar";
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
  const tagSearchRef = useRef<HTMLInputElement>(null);

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

  const filteredTags = useMemo(() => {
    if (!tagSearch) return allTagsWithCount;
    const q = tagSearch.toLowerCase();
    return allTagsWithCount.filter((t) => t.tag.toLowerCase().includes(q));
  }, [allTagsWithCount, tagSearch]);

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
    setTagSearch("");
    setIsPopoverOpen(false);
  }, []);

  // Focus tag search input when popover opens
  useEffect(() => {
    if (isPopoverOpen) {
      requestAnimationFrame(() => tagSearchRef.current?.focus());
    }
  }, [isPopoverOpen]);

  // Close popover on outside click or Escape key
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPopoverOpen(false);
        setTagSearch("");
        filterBtnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
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

        {/* Filter button + popover */}
        <div className="relative">
          <button
            ref={filterBtnRef}
            type="button"
            onClick={() => {
              setIsPopoverOpen((prev) => !prev);
              setTagSearch("");
            }}
            aria-expanded={isPopoverOpen}
            aria-haspopup="dialog"
            aria-controls="tag-filter-popover"
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
                id="tag-filter-popover"
                role="dialog"
                aria-label="Tag filter"
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full z-40 mt-2 w-64 rounded border border-border bg-background [box-shadow:0_8px_32px_rgba(0,0,0,0.4)]"
              >
                {/* Popover search */}
                <div className="border-b border-border p-2">
                  <input
                    ref={tagSearchRef}
                    type="text"
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    placeholder="Search tags..."
                    aria-label="Search tags"
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
                          aria-pressed={isSelected}
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
                      Clear tag filters
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
            {/* Twinkling stars — same style as card/modal stars */}
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

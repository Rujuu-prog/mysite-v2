"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type TagWithCount = {
  tag: string;
  count: number;
};

type Props = {
  allTagsWithCount: TagWithCount[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
};

export function TagFilterPopover({
  allTagsWithCount,
  selectedTags,
  onToggleTag,
  onClearTags,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const tagSearchRef = useRef<HTMLInputElement>(null);

  const filteredTags = useMemo(() => {
    if (!tagSearch) return allTagsWithCount;
    const q = tagSearch.toLowerCase();
    return allTagsWithCount.filter((t) => t.tag.toLowerCase().includes(q));
  }, [allTagsWithCount, tagSearch]);

  const close = useCallback(() => {
    setIsOpen(false);
    setTagSearch("");
  }, []);

  // Focus tag search input when popover opens
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => tagSearchRef.current?.focus());
    }
  }, [isOpen]);

  // Close popover on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        filterBtnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  return (
    <div className="relative">
      <button
        ref={filterBtnRef}
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setTagSearch("");
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="tag-filter-popover"
        className={`flex items-center gap-1.5 rounded border px-3 py-2 text-sm transition-all duration-200 ${
          isOpen || selectedTags.length > 0
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            id="tag-filter-popover"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-40 mt-2 w-64 rounded border border-border bg-background [box-shadow:0_8px_32px_rgba(0,0,0,0.4)]"
          >
            {/* Tag search */}
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
            <div
              role="group"
              aria-label="Tag filters"
              className="scrollbar-hide max-h-56 overflow-y-auto p-1"
            >
              {filteredTags.length === 0 ? (
                <p className="px-2 py-3 text-center text-caption text-muted">
                  No tags found
                </p>
              ) : (
                filteredTags.map(({ tag, count }) => {
                  const isSelected = selectedTags.includes(tag);
                  const id = `tag-filter-${tag.replace(/[^a-zA-Z0-9]/g, "-")}`;
                  return (
                    <label
                      key={tag}
                      htmlFor={id}
                      className={`flex w-full cursor-pointer items-center justify-between rounded px-2 py-1.5 text-sm transition-colors duration-100 ${
                        isSelected
                          ? "bg-accent/10 text-accent"
                          : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          id={id}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleTag(tag)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
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
                      <span className="text-caption text-muted">{count}</span>
                    </label>
                  );
                })
              )}
            </div>

            {/* Clear all in popover */}
            {selectedTags.length > 0 && (
              <div className="border-t border-border p-2">
                <button
                  type="button"
                  onClick={onClearTags}
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
  );
}

"use client";

export function OverscrollHint() {
  return (
    <div
      className="pointer-events-none fixed top-0 right-0 left-0"
      style={{ zIndex: 56 }}
      aria-hidden="true"
    >
      {/* Gauge bar */}
      <div
        style={{
          height: "2px",
          background: "var(--accent)",
          transform: "scaleX(var(--overscroll-hint, 0))",
          transformOrigin: "center",
          opacity: "calc(var(--overscroll-hint, 0) * 0.8)",
        }}
      />
      {/* Glow */}
      <div
        style={{
          height: "4px",
          background: "linear-gradient(to bottom, var(--accent), transparent)",
          transform: "scaleX(var(--overscroll-hint, 0))",
          transformOrigin: "center",
          opacity: "calc(var(--overscroll-hint, 0) * 0.3)",
        }}
      />
    </div>
  );
}

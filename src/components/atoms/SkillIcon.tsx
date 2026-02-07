type Props = {
  name: string;
};

const icons: Record<string, React.ReactNode> = {
  React: (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="2.5" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(120 12 12)"
      />
    </svg>
  ),
  "Next.js": (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.5 14.5V7.8l7.7 10.2a8.5 8.5 0 0 1-3.7 1.3L10.5 14V16.5zm5-3.2V7.5h-1.5v4.3l1.5 2z" />
    </svg>
  ),
  TypeScript: (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 3h18v18H3V3zm10.5 10.5v-1.8h-2.2v7h-1.8v-7H7.3v-1.7h6.2v1.5zm2.1-.3c0-.1 0 0 0 0v.1c.3-.1.7-.2 1.1-.2.5 0 .9.1 1.2.3.3.2.5.5.7.8.1.3.2.7.2 1.2v3.3h-1.7v-3c0-.4-.1-.7-.2-.9-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3-.2.2-.2.5-.2.9v3h-1.7v-5.3h1.7v.7l.3-.9z" />
    </svg>
  ),
  "Node.js": (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.5 7.5 12 10.8 5.5 7.5 12 4.2zM5 9l6.5 3.5V19L5 15.5V9zm8.5 10V12.5L20 9v6.5L13.5 19z" />
    </svg>
  ),
  Python: (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2c-1.7 0-3 .2-4 .5C6.5 3 6 3.8 6 5v2.5h6v1H5.5C3.5 8.5 2 10 2 12.5S3.5 17 5.5 17H8v-2.5c0-1.5 1.3-3 3-3h6c1.3 0 2.5-1.2 2.5-2.5V5c0-1.3-1.5-2.5-3.5-3-.8-.2-2.3-.5-4-.5zm-2.5 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16 8.5v2.5c0 1.5-1.3 3-3 3h-6c-1.3 0-2.5 1.2-2.5 2.5V20c0 1.3 1.5 2.2 3.5 2.7 1 .3 2 .3 4 .3s3.3-.2 4-.5c1.5-.5 2-1.3 2-2.5v-2.5h-6v-1h8.5c2 0 3-1.5 3-3.5s-1-4-3-4.5H16zm.5 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  ),
  Git: (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.66 2.66a1.838 1.838 0 1 1-1.103 1.03l-2.48-2.48v6.53a1.838 1.838 0 1 1-1.512-.06V8.73a1.838 1.838 0 0 1-.998-2.41L7.629 3.586.452 10.764a1.55 1.55 0 0 0 0 2.188l10.48 10.48a1.55 1.55 0 0 0 2.186 0l10.428-10.43a1.55 1.55 0 0 0 0-2.072z" />
    </svg>
  ),
  Docker: (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M13.98 11.08h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19h-2.12a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m-2.95-5.43h2.12a.19.19 0 0 0 .19-.19V3.58a.19.19 0 0 0-.19-.19h-2.12a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m0 2.71h2.12a.19.19 0 0 0 .19-.19V6.29a.19.19 0 0 0-.19-.19h-2.12a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m-2.93 0h2.12a.19.19 0 0 0 .19-.19V6.29a.19.19 0 0 0-.19-.19H8.1a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m-2.96 0h2.12a.19.19 0 0 0 .19-.19V6.29a.19.19 0 0 0-.19-.19H5.14a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m5.89 2.72h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19h-2.12a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m-2.93 0h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19H8.1a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m-2.96 0h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19H5.14a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m-2.92 0h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19H2.22a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19M23.7 11.03a4.7 4.7 0 0 0-2.38-1.68c.24-1.42-.16-2.47-.75-3.24a.34.34 0 0 0-.44-.08c-1 .63-1.6 1.62-1.72 2.83-1.7-.32-3.13.14-4.16 1.02H2.22a1.71 1.71 0 0 0-1.71 1.71v1.88c0 .95.77 1.71 1.71 1.71h.5c.84 3.41 3.89 5.88 7.47 5.88 2.54 0 4.79-1.24 6.2-3.15a8.3 8.3 0 0 0 4.5-1.42 6.7 6.7 0 0 0 2.81-4.04.34.34 0 0 0 0-.22 3.6 3.6 0 0 0-.3-1.2z" />
    </svg>
  ),
  Figma: (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 13.772h-3.117c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h3.117v8.98zm-3.117-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117v-6.038H9.618zm0-2.453c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h3.117v8.98H9.618zM9.618 7.51c1.665 0 3.019-1.355 3.019-3.019S11.283 1.472 9.618 1.472 6.599 2.827 6.599 4.491 7.953 7.51 9.618 7.51zm6.234 4.172c2.476 0 4.49-2.014 4.49-4.49S18.328 2.7 15.852 2.7v8.982zm0-7.51c1.665 0 3.019 1.355 3.019 3.019s-1.355 3.019-3.019 3.019V4.172z" />
    </svg>
  ),
  "Vue.js": (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M2 3h4l6 10.2L18 3h4L12 22 2 3zm6.4 0L12 9.7 15.6 3h-3.2L12 4l-.4-1H8.4z" />
    </svg>
  ),
  PostgreSQL: (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm5 12c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-1c0-2.21 2.69-4 6-4s5 1.79 5 4v1z" />
    </svg>
  ),
  Firebase: (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M5.24 20.24L6.92 4.56c.05-.44.4-.76.84-.72.2.02.38.12.5.28l2.16 3.12 1.08-2.04c.18-.34.58-.46.92-.28.14.08.26.2.32.34L19.24 20.24H5.24zM12 17.52l3.6-5.64-2.16-3.96L12 10.2l-3.48-1.44L12 17.52z" />
    </svg>
  ),
  "VS Code": (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.583 2.248L7.637 10.64 3.56 7.473l-1.56.78v7.494l1.56.78 4.077-3.166 9.946 8.392L22 20.22V3.78l-4.417-1.532zM17.5 17.1L9.9 12l7.6-5.1v10.2z" />
    </svg>
  ),
  Vercel: (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2L2 20h20L12 2z" />
    </svg>
  ),
};

const defaultIcon = (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export function SkillIcon({ name }: Props) {
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center text-accent">
      {icons[name] ?? defaultIcon}
    </span>
  );
}

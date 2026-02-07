type Props = {
  name: string;
  icon?: string;
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

export function SkillIcon({ icon }: Props) {
  if (icon) {
    return (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center text-accent">
        <i className={`${icon} text-[16px]`} aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center text-accent">
      {defaultIcon}
    </span>
  );
}

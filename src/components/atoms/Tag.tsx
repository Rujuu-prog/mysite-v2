type Props = {
  label: string;
};

export function Tag({ label }: Props) {
  return (
    <span className="inline-block rounded border border-border px-2 py-0.5 text-caption text-muted">
      {label}
    </span>
  );
}

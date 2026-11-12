import { priorityMeta, statusMeta } from "@/lib/ticket-meta";

export function StatusBadge({ status, className = "" }: { status: string; className?: string }) {
  const s = statusMeta(status);
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${s.badge} ${className}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

/** Indicateur de priorité à 4 barres. */
export function PriorityIndicator({ priority, showLabel = true }: { priority: string; showLabel?: boolean }) {
  const p = priorityMeta(priority);
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium ${p.badge}`} title={`${p.label} priority`}>
      <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`w-[3px] rounded-sm ${i <= p.level ? "bg-current" : "bg-current opacity-20"}`}
            style={{ height: `${25 * i}%` }}
          />
        ))}
      </span>
      {showLabel && p.label}
    </span>
  );
}

export function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  if (!name) return null;
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full font-semibold text-white ${size === "sm" ? "size-6 text-[10px]" : "size-8 text-xs"}`}
      style={{ background: `oklch(0.62 0.15 ${hash % 360})` }}
      title={name}
    >
      {initials}
    </span>
  );
}

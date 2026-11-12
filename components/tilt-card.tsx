"use client";

import Link from "next/link";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  /** Inclinaison maximale en degrés. */
  max?: number;
};

/**
 * Carte inclinée en 3D qui suit le pointeur, avec un halo lumineux sous le curseur.
 * Les éléments enfants avec la classe `tilt-pop` ressortent en profondeur.
 */
export function TiltCard({ children, className = "", href, external, max = 8 }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const props = {
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    className: `tilt-card group ${className}`,
  };

  if (href && external) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} {...props}>
      {children}
    </div>
  );
}

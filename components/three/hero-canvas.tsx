"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState } from "react";
import { HOME_PHOTO_URL } from "@/lib/site";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false, loading: () => <Fallback /> });

/** Photo en 2D : affichée pendant le chargement de la 3D, ou si WebGL est indisponible. */
function Fallback() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="absolute size-72 rounded-full bg-gradient-to-br from-brand-1 to-brand-2 opacity-40 blur-3xl" />
      <div className="relative rounded-full bg-gradient-to-br from-brand-1 to-brand-2 p-1.5 shadow-2xl shadow-brand-1/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HOME_PHOTO_URL} alt="" width={256} height={256} className="size-56 rounded-full object-cover sm:size-64" />
      </div>
    </div>
  );
}

class WebGLBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

/**
 * Scène 3D du hero : chargée uniquement côté client, figée si l'utilisateur
 * préfère réduire les animations, et mise en pause hors de l'écran.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    if (ref.current) io.observe(ref.current);
    return () => {
      mq.removeEventListener("change", onChange);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0" role="img" aria-label="Florian">
      <WebGLBoundary>
        <HeroScene animate={visible && !reducedMotion} />
      </WebGLBoundary>
    </div>
  );
}

"use client";

import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles, useTexture } from "@react-three/drei";
import { HOME_PHOTO_URL } from "@/lib/site";

const BRAND_1 = "#bd34fe";
const BRAND_2 = "#41d1ff";

/** Le groupe suit doucement le pointeur pour un effet de parallaxe 3D. */
function PointerRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.35, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.25, 3, delta);
  });
  return <group ref={group}>{children}</group>;
}

/** Photo ronde, cerclée d'un anneau brillant, qui fait toujours face au visiteur. */
function Portrait() {
  const texture = useTexture(HOME_PHOTO_URL);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
      <group>
        {/* Halo derrière la photo */}
        <mesh position={[0, 0, -0.05]}>
          <circleGeometry args={[1.62, 96]} />
          <meshBasicMaterial color={BRAND_1} transparent opacity={0.35} toneMapped={false} />
        </mesh>
        <mesh>
          <circleGeometry args={[1.4, 96]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        {/* Cadre brillant */}
        <mesh>
          <torusGeometry args={[1.45, 0.07, 32, 160]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.08} envMapIntensity={1.6} />
        </mesh>
      </group>
    </Float>
  );
}

/** Anneau en orbite, avec un petit satellite lumineux qui glisse dessus. */
function Ring({
  radius,
  tilt,
  speed,
  color,
  satellite,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  satellite: string;
}) {
  const spin = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[radius, 0.035, 24, 200]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} emissive={color} emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.13, 32, 32]} />
          <meshStandardMaterial color={satellite} emissive={satellite} emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroScene({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas
      frameloop={animate ? "always" : "demand"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} />
      <PointerRig>
        <Suspense fallback={null}>
          <Portrait />
        </Suspense>
        <Ring radius={1.95} tilt={[1.25, 0.25, 0]} speed={0.5} color={BRAND_1} satellite={BRAND_2} />
        <Ring radius={2.3} tilt={[0.45, -1.05, 0.3]} speed={-0.35} color={BRAND_2} satellite={BRAND_1} />
        <Ring radius={2.65} tilt={[-0.6, 0.9, -0.2]} speed={0.25} color="#a78bfa" satellite="#ffffff" />
        <Sparkles count={70} scale={[7, 6, 4]} size={2.4} speed={0.35} color={BRAND_2} opacity={0.8} />
        <Sparkles count={40} scale={[6, 5, 3]} size={3} speed={0.25} color={BRAND_1} opacity={0.7} />
      </PointerRig>
      {/* Environnement généré localement (aucun fichier HDR téléchargé). */}
      <Environment resolution={256}>
        <Lightformer intensity={3} color={BRAND_1} position={[-5, 2, -2]} scale={[6, 4, 1]} />
        <Lightformer intensity={3} color={BRAND_2} position={[5, -1, -2]} scale={[6, 4, 1]} />
        <Lightformer intensity={2} color="#ffffff" position={[-3, 5, 2]} rotation={[0, 0, 0.6]} scale={[6, 0.6, 1]} />
      </Environment>
    </Canvas>
  );
}

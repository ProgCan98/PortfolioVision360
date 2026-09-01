"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

export function EmbersBackground() {
  const isMobile = useIsMobile();

  const particleCount = isMobile ? 3 : 8;

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    neon: Math.random() < 0.25,
    left: 10 + (i * 80) / particleCount,
    size: isMobile ? 22 + Math.random() * 6 : 40 + Math.random() * 10,
    delay: Math.random() * 4,
    duration: isMobile ? 15 + Math.random() * 8 : 7 + Math.random() * 10,
  }));

  return (
    <div className="embers-container">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`ember ${p.neon ? "neon-x" : ""}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

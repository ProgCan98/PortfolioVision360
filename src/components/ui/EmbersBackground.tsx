"use client";

const particleCount = 8;

const particles = Array.from({ length: particleCount }, (_, i) => ({
  id: i,
  neon: Math.random() < 0.30, // 30%
  left: 10 + (i * 80) / particleCount,
  size: 40 + Math.random() * 10,
  delay: Math.random() * 4,
  duration: 7 + Math.random() * 10,
  rotation: Math.random() * 360,
}));

export function EmbersBackground() {
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

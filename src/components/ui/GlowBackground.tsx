interface GlowArcProps {
  position: "top-right" | "bottom-left" | "top-left" | "bottom-right";
  size?: number;
  opacity?: number;
}

function GlowArc({ position, size = 560, opacity = 0.28 }: GlowArcProps) {
  const offset = -(size / 2.2);
  const delayByPosition = {
    "top-right": 0,
    "bottom-left": 0.8,
    "top-left": 0.4,
    "bottom-right": 1.2,
  }[position];

  const posStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: `3px solid rgba(255, 106, 0, ${opacity})`,
    boxShadow: `
      0 0 20px rgba(255, 106, 0, ${opacity * 0.7}),
      0 0 48px rgba(255, 106, 0, ${opacity * 0.45}),
      0 0 90px rgba(255, 106, 0, ${opacity * 0.22})
    `,
    background: "radial-gradient(circle at center, rgba(255,106,0,0.03), transparent 70%)",
    animation: "arcColorShift 6s ease-in-out infinite, arcPulse 4.5s ease-in-out infinite",
    animationDelay: `${delayByPosition}s, ${delayByPosition * 0.6}s`,
    position: "absolute",
    ...(position === "top-right" && { top: offset, right: offset }),
    ...(position === "bottom-left" && { bottom: offset, left: offset }),
    ...(position === "top-left" && { top: offset, left: offset }),
    ...(position === "bottom-right" && { bottom: offset, right: offset }),
  };
  return <div style={posStyle} aria-hidden />;
}

interface GlowBackgroundProps {
  variant?: "hero" | "section";
  side?: "left" | "right";
}

// arcs disabled — will be re-implemented later
export function GlowBackground(_props: GlowBackgroundProps) {
  return null;
}

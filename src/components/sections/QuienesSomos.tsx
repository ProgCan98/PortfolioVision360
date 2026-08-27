"use client";

import { useEffect, useRef, useState } from "react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EmbersBackground } from "../ui/EmbersBackground";

export function QuienesSomos() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const handleScroll = () => {
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const raw = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clamped = Math.min(Math.max(raw, 0), 1);
      setProgress(clamped);
      setIsVisible(clamped > 0.05);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // t mapped over a wide scroll range so the orbit feels slow and deliberate
  const raw = Math.min(Math.max((progress - 0.05) / 0.72, 0), 1);
  const t = 1 - Math.pow(1 - raw, 2); // ease-out quad

  const R_x = 260;
  const R_z = 300;

  // Left card: 270° counterclockwise orbit — front→right→behind→left (final)
  // Offset is relative to the card's natural grid position (θ_final = 3π/2)
  const thetaL = t * ((3 * Math.PI) / 2);
  const leftOffsetX = R_x * (Math.sin(thetaL) + 1); // 260→520→260→0
  const leftOffsetZ = R_z * Math.cos(thetaL); // 300→0→-300→0
  const leftZIndex = leftOffsetZ < -30 ? 2 : 8;

  // Right card: 270° clockwise orbit — front→left→behind→right (final)
  // Offset is relative to the card's natural grid position (θ_final = π/2)
  const thetaR = -t * ((3 * Math.PI) / 2);
  const rightOffsetX = R_x * (Math.sin(thetaR) - 1); // -260→-520→-260→0
  const rightOffsetZ = R_z * Math.cos(thetaR); // 300→0→-300→0
  const rightZIndex = t < 0.9 ? 9 : 4;

  // Quick fade-in at entry, then fully opaque
  const cardOpacity = Math.min(raw * 4, 1);

  const settled = progress >= 0.4;
  const leftTransform = settled
    ? "translate3d(0px,0,0)"
    : `translate3d(${leftOffsetX}px,0,${leftOffsetZ}px)`;

  const rightTransform = settled
    ? "translate3d(0px,0,0)"
    : `translate3d(${rightOffsetX}px,0,${rightOffsetZ}px)`;
  ``;

  return (
    <section
      ref={sectionRef}
      id="quienes-somos"
      className="scroll-mt-32 relative min-h-screen px-4 flex items-center overflow-hidden"
    >
      <GlowBackground variant="section" />

    

      <div className="relative z-20 max-w-6xl mx-auto w-full">
        <SectionTitle
          className={`mb-39 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          ¿QUIÉNES SOMOS?
        </SectionTitle>

        {/* perspective container — required for translateZ to show 3D depth */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 sm:gap-10 items-center"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
        >
          {/* Left card — traces arc from behind the circle */}
          <div
            className="bg-[#1e1e1e]/78 backdrop-blur-sm rounded-[2rem] p-6 sm:p-8 border border-white/5"
            style={{
              position: "relative",
              zIndex: leftZIndex,
              opacity: cardOpacity,
              transform: leftTransform,
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.03), 0 18px 40px rgba(0,0,0,0.2)",
              willChange: "transform",
              transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
            }}
          >
            <p className="text-white text-base sm:text-lg leading-relaxed">
              Somos Visión 360, una agencia de comunicación integral y marketing
              estratégico.
            </p>
          </div>

          {/* Circle — fixed, upright, subtle scale-in on enter */}
          <div
            className="flex items-center justify-center"
            style={{ position: "relative", zIndex: 5 }}
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                width: 220,
                height: 220,
                transform: isVisible ? "scale(1)" : "scale(0.72)",
                transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div className="absolute inset-0 rounded-full border-[3px] border-brand-orange/90 shadow-[0_0_28px_rgba(255,102,0,0.35)]" />
              <div className="absolute inset-[18px] rounded-full border-[2px] border-brand-orange/40" />
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-l-brand-orange/90 border-r-brand-orange/30" />
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-b-brand-orange/90 border-t-brand-orange/30" />
              <span className="font-bebas text-brand-orange text-5xl sm:text-6xl leading-none">
                360°
              </span>
            </div>
          </div>

          {/* Right card — traces arc from in front of the circle */}
          <div
            className="bg-[#1e1e1e]/78 backdrop-blur-sm rounded-[2rem] p-6 sm:p-8 border border-white/5"
            style={{
              position: "relative",
              zIndex: rightZIndex,
              opacity: cardOpacity,
              transform: rightTransform,
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.03), 0 18px 40px rgba(0,0,0,0.2)",
              willChange: "transform",
              transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
            }}
          >
            <p className="text-white text-base sm:text-lg leading-relaxed">
              Ayudamos a empresas, instituciones y profesionales a fortalecer su
              imagen, conectar con su público y potenciar sus resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { servicios } from "@/content/portfolio-data";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Servicios() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const handleScroll = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height);
      setProgress(Math.min(Math.max(raw, 0), 1));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative px-4 py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      <GlowBackground variant="section" side="left" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle className="text-center">SERVICIOS</SectionTitle>

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          style={{ perspective: "1400px" }}
        >
          {servicios.map((s, index) => {
            const cardProgress = Math.min(
              Math.max((progress - index * 0.04) / 0.48, 0),
              1,
            );
            const eased = 1 - (1 - cardProgress) ** 2;
            const x = isMobile ? 0 : (1 - eased) * 180;
            const y = isMobile ? (1 - eased) * 15 : 0;
            const scale = 0.88 + eased * 0.12;
            const opacity = 0.15 + eased * 0.85;

            return (
              <div
                key={s.numero}
                className={`
                  group
                  relative
                  flex
                  flex-row
                  items-center
                  gap-5
                  rounded-[2rem]
                  border
                  px-8
                  py-6
                  transition-all
                  duration-500
                  ease-out
                  bg-[#1d1d1d]/95
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_30px_rgba(0,0,0,0.35)]
                  hover:-translate-y-5
                  hover:scale-[1.04]
                  hover:shadow-[0_32px_72px_rgba(255,102,0,0.24),0_22px_44px_rgba(0,0,0,0.5)]
                `}
                style={{
                  transformStyle: "preserve-3d",
                  opacity,
                  transform: `translate(${x}px, ${y}px) scale(${scale})`,
                  transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                }}
              >
                <div className="absolute inset-0 rounded-[2rem] border border-brand-orange/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-brand-orange/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span
                  className="relative z-10 shrink-0 font-bebas leading-none text-brand-orange"
                  style={{ fontSize: "clamp(10.2rem, 6vw, 9.5rem)" }}
                  aria-hidden
                >
                  {s.numero}
                </span>

                <p className="relative z-10 text-left text-lg font-medium leading-snug text-white/90 sm:text-xl">
                  {s.titulo}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

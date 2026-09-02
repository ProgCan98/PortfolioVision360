"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { clientes } from "@/content/portfolio-data";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Clientes() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

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
      id="clientes"
      className="relative py-20 sm:py-28 lg:py-32 px-4 overflow-hidden"
    >
      <GlowBackground variant="section" />

      {/* Side chevrons — desktop only */}

      <div className="max-w-6xl mx-auto">
        <SectionTitle className="mb-12">CLIENTES</SectionTitle>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {clientes.map((cliente, index) => {
            const cardProgress = Math.min(
              Math.max((progress - index * 0.04) / 0.48, 0),
              1,
            );
            const eased = 1 - (1 - cardProgress) ** 2;
            const isMobile = useIsMobile();
            const x = isMobile ? 0 : (1 - eased) * 180;
            const y = isMobile ? (1 - eased) * 50 : 0;
            const scale = 0.88 + eased * 0.12;
            const opacity = 0.15 + eased * 0.85;

            return (
              <div
                key={cliente.id}
                className="group relative flex aspect-square items-center justify-center rounded-[2rem] border border-white/5 bg-[#1d1d1d]/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_30px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-5 hover:scale-[1.04] hover:shadow-[0_32px_72px_rgba(255,102,0,0.24),0_22px_44px_rgba(0,0,0,0.5)] sm:p-8"
                style={{
                  opacity,
                  transform: `translateY(${y}px) scale(${scale})`,
                  transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                }}
              >
                <div className="absolute inset-0 rounded-[2rem] border border-brand-orange/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-brand-orange/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Image
                  src={cliente.logo}
                  alt={cliente.alt}
                  width={160}
                  height={160}
                  className="relative z-10 object-contain transition-transform duration-300 group-hover:scale-105"
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "180px",
                    maxHeight: "158px",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

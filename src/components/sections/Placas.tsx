"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { placas } from "@/content/portfolio-data";

const AUTO_DELAY = 4000;
const MANUAL_DELAY = 6000;
const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2];

export function Placas() {
  const count = placas.length;
  const [index, setIndexState] = useState(0);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // single recursive timer keeps the sequence continuous: it always resumes
  // from whatever slide is currently shown, whether that came from autoplay or a manual click
  const scheduleNext = useCallback(
    (ms: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        indexRef.current = (indexRef.current + 1 + count) % count;
        setIndexState(indexRef.current);
        scheduleNext(AUTO_DELAY);
      }, ms);
    },
    [count]
  );

  useEffect(() => {
    scheduleNext(AUTO_DELAY);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scheduleNext]);

  const goToManual = useCallback(
    (step: number) => {
      indexRef.current = (indexRef.current + step + count) % count;
      setIndexState(indexRef.current);
      scheduleNext(MANUAL_DELAY);
    },
    [count, scheduleNext]
  );

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle className="mb-10">PLACAS</SectionTitle>

        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => goToManual(-1)}
            aria-label="Placa anterior"
            className="absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1d1d1d]/80 text-xl text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-brand-orange hover:text-brand-orange sm:h-12 sm:w-12"
          >
            ‹
          </button>

          <div className="relative h-[360px] w-full overflow-hidden sm:h-[460px] lg:h-[560px] [--pitch:8rem] sm:[--pitch:10.5rem] lg:[--pitch:13.5rem]">
            {VISIBLE_OFFSETS.map((offset) => {
              const i = ((index + offset) % count + count) % count;
              const placa = placas[i];
              const abs = Math.abs(offset);
              const scale = offset === 0 ? 1.35 : abs === 1 ? 0.85 : 0.55;
              const opacity = offset === 0 ? 1 : abs === 1 ? 0.55 : 0.22;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 aspect-[4/5] w-36 overflow-hidden rounded-xl bg-[#1e1e1e] shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out sm:w-48 lg:w-60"
                  style={{
                    transform: `translate(-50%, -50%) translateX(calc(var(--pitch) * ${offset})) scale(${scale})`,
                    opacity,
                    zIndex: 10 - abs,
                  }}
                >
                  <Image
                    src={placa.src}
                    alt={placa.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 20vw"
                    priority={offset === 0}
                  />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goToManual(1)}
            aria-label="Placa siguiente"
            className="absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1d1d1d]/80 text-xl text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-brand-orange hover:text-brand-orange sm:h-12 sm:w-12"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}


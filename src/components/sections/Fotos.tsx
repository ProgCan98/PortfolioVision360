"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fotos } from "@/content/portfolio-data";

// shared gradient title treatment used across all section titles
const titleClass =
  "font-bebas leading-none tracking-[0.04em] text-transparent bg-clip-text section-title-animated";
const titleStyle = {
  fontSize: "clamp(6.5rem, 10vw, 10rem)",
  backgroundImage:
    "linear-gradient(95deg, #ff6a00 0%, #ff8a1f 28%, #ffb455 50%, #ff8a1f 72%, #ff6a00 100%)",
  backgroundSize: "220% 100%",
} as const;

interface FlipRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function Fotos() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const photoRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [startRect, setStartRect] = useState<FlipRect | null>(null);
  const [expanded, setExpanded] = useState(false);

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

  const openPhoto = useCallback((index: number) => {
    const el = photoRefs.current[index];
    if (el) {
      const r = el.getBoundingClientRect();
      setStartRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });
    }
    setSelected(index);
    // two-frame delay so the browser paints the start rect before transitioning to center
    requestAnimationFrame(() => requestAnimationFrame(() => setExpanded(true)));
  }, []);

  const closePhoto = useCallback(() => {
    setExpanded(false);
    window.setTimeout(() => {
      setSelected(null);
      setStartRect(null);
    }, 400);
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePhoto();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, closePhoto]);

  const renderPhoto = (foto: (typeof fotos)[number], globalIndex: number) => {
    // subtle staggered entrance: alternating photos slide in from the left/right page edges, resolving early
    const base = Math.min(Math.max(progress / 0.22, 0), 1);
    const staggered = Math.min(
      Math.max(base - (globalIndex % 10) * 0.012, 0),
      1,
    );
    const eased = 1 - (1 - staggered) ** 3;
    const fromLeft = globalIndex % 2 === 0;
    const x = (1 - eased) * (fromLeft ? -70 : 70);

    return (
      <button
        key={globalIndex}
        type="button"
        ref={(el) => {
          photoRefs.current[globalIndex] = el;
        }}
        onClick={() => openPhoto(globalIndex)}
        className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-[#1e1e1e] sm:mb-4"
        style={{
          visibility: selected === globalIndex ? "hidden" : "visible",
          opacity: eased,
          transform: `translateX(${x}px) scale(${0.94 + eased * 0.06})`,
          transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
        }}
      >
        <Image
          src={foto.src}
          alt={foto.alt}
          width={480}
          height={640}
          style={{ height: "auto" }}
          className="block w-full transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
        />
      </button>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="fotos"
      className="pt-8 pb-20 sm:pt-10 sm:pb-28 lg:pt-12 lg:pb-32 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <h2
            className={`${titleClass} shrink-0 text-left lg:sticky lg:top-32`}
            style={titleStyle}
          >
            FOTOS
          </h2>

          <div className="columns-2 sm:columns-3 lg:columns-3 xl:columns-4 gap-3 sm:gap-4">
            {fotos.map((foto, i) => renderPhoto(foto, i))}
          </div>
        </div>
      </div>

      {selected !== null && startRect && (
        <div className="fixed inset-0 z-50" onClick={closePhoto}>
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-[400ms]"
            style={{ opacity: expanded ? 1 : 0 }}
          />
          <button
            type="button"
            onClick={closePhoto}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#1d1d1d]/80 text-2xl text-white/80 transition-opacity duration-300 hover:border-brand-orange hover:text-brand-orange sm:right-8 sm:top-8"
            style={{ opacity: expanded ? 1 : 0 }}
          >
            ×
          </button>
          <div
            className="fixed flex items-center justify-center rounded-xl transition-all duration-[400ms]"
            style={
              expanded
                ? {
                    inset: 0,
                    top: "50%",
                    left: "50%",
                    width: `min(90vw, ${Math.round(startRect.width * 2.2)}px)`,
                    height: `min(85vh, ${Math.round(startRect.height * 2.2)}px)`,
                    transform: "translate(-50%, -50%)",
                  }
                : {
                    top: startRect.top,
                    left: startRect.left,
                    width: startRect.width,
                    height: startRect.height,
                    transform: "translate(0, 0)",
                  }
            }
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fotos[selected].src}
              alt={fotos[selected].alt}
              width={1600}
              height={1600}
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export function TrabajosIntro() {
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

  const t = Math.min(Math.max((progress - 0.02) / 0.75, 0), 1);
  const ease = 1 - (1 - t) ** 2;
  const titleX = (1 - ease) * 180;
  const titleOpacity = 0.15 + ease * 0.85;
  const phoneScale = 0.88 + ease * 0.12;
  const logosScale = 0.55 + ease * 0.7;
  const logosOpacity = 0.1 + ease * 0.9;
  const emojiReveal = Math.min(Math.max((progress - 0.06) / 0.65, 0), 1);
  // staggered offsets; dx = px to push back so start position aligns with logo center
  const floatingEmojis = [
    { emoji: "😍", left: "-6.8rem", top: "10%", offset: 0, dx: 175 },
    { emoji: "💬", left: "-8.8rem", top: "28%", offset: 0.07, dx: 205 },
    { emoji: "🎉", left: "-6.5rem", top: "46%", offset: 0.14, dx: 170 },
    { emoji: "👍", left: "-8.2rem", top: "63%", offset: 0.21, dx: 195 },
    { emoji: "❤️", left: "-7.1rem", top: "78%", offset: 0.28, dx: 182 },
  ];

  return (
    <section
      ref={sectionRef}
      id="trabajos"
      className="relative overflow-hidden px-4 py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 52% 68% at 82% 50%, rgba(255,102,0,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 flex justify-center lg:order-1 lg:justify-end">
          <div
            className="relative w-44 sm:w-52 lg:w-60"
            style={{
              transform: `scale(${phoneScale})`,
              transition: "transform 0.35s ease-out",
            }}
          >
            <div
              className="absolute -inset-8 rounded-full"
              aria-hidden
              style={{
                background:
                  "radial-gradient(circle, rgba(255,102,0,0.18) 0%, rgba(255,102,0,0.08) 28%, transparent 72%)",
                filter: "blur(8px)",
              }}
            />
            {/* z-[2] keeps phone body in front of emoji layer below */}
            <div className="relative z-[2] aspect-[9/19] overflow-hidden rounded-[2.6rem] border-2 border-white/10 bg-[#1a1a1a] shadow-[0_35px_60px_rgba(0,0,0,0.45)]">
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background:
                    "radial-gradient(circle at 50% 68%, rgba(24,90,210,0.09) 0%, rgba(14,14,18,0.99) 35%, rgba(10,10,10,1) 100%)",
                }}
              />
              <div
                className="absolute inset-x-3 top-3 h-4 rounded-full bg-black/90"
                aria-hidden
              />
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-4 pt-6">
                <div
                  className="flex flex-col items-center gap-5"
                  style={{
                    transform: `translate3d(${(1 - ease) * -36}px, ${(1 - ease) * 24}px, 0) scale(${logosScale + 0.35}) rotate(${(1 - ease) * 8}deg)`,
                    opacity: logosOpacity,
                    transition: "all 0.42s cubic-bezier(0.16, 1, 0.3, 1)",
                    transformOrigin: "center center",
                    filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.4))",
                  }}
                >
                  <div
                    className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/15 shadow-[0_18px_32px_rgba(0,0,0,0.5)] lg:h-[4.4rem] lg:w-[4.4rem]"
                    style={{
                      background:
                        "linear-gradient(135deg,#ff5b7d 0%, #f1344f 35%, #ff7a2a 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 20px rgba(255,122,92,0.42), 0 0 34px rgba(255,120,60,0.2), 0 12px 20px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_28%)]" />
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      aria-label="Instagram"
                      className="relative z-10 lg:h-9 lg:w-9"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="white" />
                    </svg>
                  </div>
                  <div
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 shadow-[0_18px_32px_rgba(0,0,0,0.5)] lg:h-[4.4rem] lg:w-[4.4rem]"
                    style={{
                      background:
                        "linear-gradient(180deg,#3b97ff 0%, #1c62d8 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.22), 0 0 20px rgba(72,145,255,0.55), 0 0 40px rgba(24,100,220,0.28), 0 12px 20px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.38),transparent_28%)]" />
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="white"
                      aria-label="Facebook"
                      className="relative z-10 lg:h-8 lg:w-8"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* emoji layer outside overflow-hidden so they can escape the phone bounds */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1]"
              aria-hidden
            >
              {floatingEmojis.map((item) => {
                const eRaw = Math.min(
                  Math.max(
                    (emojiReveal - item.offset) / (0.82 - item.offset),
                    0,
                  ),
                  1,
                );
                const eased = 1 - (1 - eRaw) ** 3;
                // quadratic so emojis are tiny+invisible as they cross the phone edge, then burst
                const scaleEase = eased * eased;
                return (
                  <span
                    key={item.emoji}
                    className="absolute select-none"
                    style={{
                      left: item.left,
                      top: item.top,
                      fontSize: "2.4rem",
                      opacity: scaleEase * 0.95,
                      transform: `translate3d(${(1 - eased) * item.dx}px, 0, 0) scale(${0.15 + scaleEase * 1.35}) perspective(500px) rotateY(${(1 - eased) * 35}deg)`,
                      textShadow: "0 6px 18px rgba(0,0,0,0.55)",
                      transition:
                        "transform 0.15s ease-out, opacity 0.15s ease-out",
                    }}
                  >
                    {item.emoji}
                  </span>
                );
              })}
            </div>

            <div
              className="absolute -bottom-4 left-1/2 h-6 w-28 -translate-x-1/2 rounded-full blur-xl"
              aria-hidden
              style={{ background: "rgba(255,102,0,0.18)" }}
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2
            className="font-bebas leading-none tracking-[0.04em] text-transparent bg-clip-text section-title-animated"
            style={{
              fontSize: "clamp(5.5rem, 14vw, 12rem)",
              backgroundImage:
                "linear-gradient(95deg, #ff6a00 0%, #ff8a1f 28%, #ffb455 50%, #ff8a1f 72%, #ff6a00 100%)",
              backgroundSize: "220% 100%",
              opacity: titleOpacity,
              transform: `translate3d(${titleX}px, 0, 0) scale(${0.88 + ease * 0.12})`,
              transition: "all 0.35s ease-out",
              filter: "drop-shadow(0 0 18px rgba(255,102,0,0.15))",
            }}
          >
            TRABAJOS
          </h2>
        </div>
      </div>
    </section>
  );
}

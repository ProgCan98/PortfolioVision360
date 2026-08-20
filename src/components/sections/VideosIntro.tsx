"use client";

import { useEffect, useRef, useState } from "react";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { VideoCard } from "@/components/ui/VideoCard";

import { telefonoVideoSrc } from "@/content/portfolio-data";

export function VideosIntro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const handleScroll = () => {
      const rect = node.getBoundingClientRect();
      const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
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

  const titleProgress = Math.min(Math.max((progress - 0.02) / 0.7, 0), 1);
  const ease = 1 - (1 - titleProgress) ** 2;
  const titleX = (1 - ease) * 180;
  const titleOpacity = 0.15 + ease * 0.85;
  const videoLogos = [
    { name: "YouTube", color: "#ff1744", top: "18%", delay: 0, x: 96 },
    { name: "Reels", color: "#ff4f9a", top: "43%", delay: 0.08, x: 122 },
    { name: "TikTok", color: "#25f4ee", top: "68%", delay: 0.16, x: 104 },
  ];

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="relative py-20 sm:py-28 lg:py-32 px-4"
    >
      <GlowBackground variant="hero" />

      {/* Side chevrons */}
      <span
        className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 text-brand-orange text-xl opacity-50 select-none"
        aria-hidden
      >
        ❯❯
      </span>
      <span
        className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 text-brand-orange text-xl opacity-50 select-none"
        aria-hidden
      >
        ❮❮
      </span>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Phone mockup with video */}
        <div className="flex justify-center lg:justify-end order-2 lg:order-1">
          <div className="relative w-44 sm:w-52 lg:w-60">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden lg:block" aria-hidden>
              {videoLogos.map((logo, index) => {
                const logoProgress = Math.min(
                  Math.max((titleProgress - logo.delay) / (0.72 - logo.delay), 0),
                  1
                );
                const logoEase = 1 - (1 - logoProgress) ** 3;
                const offsetX = (1 - logoEase) * logo.x;

                return (
                  <div
                    key={logo.name}
                    className="absolute -left-[7.2rem] flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 shadow-[0_18px_34px_rgba(0,0,0,0.5)]"
                    style={{
                      top: logo.top,
                      opacity: logoEase,
                      transform: `translate3d(${offsetX}px, 0, 0) scale(${0.5 + logoEase * 0.5}) rotateY(${(1 - logoEase) * 25}deg)`,
                      transition: "transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.42s ease-out",
                      background:
                        logo.name === "YouTube"
                          ? "linear-gradient(145deg, #ff3b30, #c40024)"
                          : logo.name === "Reels"
                            ? "linear-gradient(145deg, #ffc83d 0%, #ff5a24 34%, #f51d48 67%, #d00091 100%)"
                            : "linear-gradient(145deg, #171717, #050505)",
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), 0 0 20px ${logo.color}66, 0 16px 30px rgba(0,0,0,0.45)`,
                    }}
                  >
                    {logo.name === "YouTube" && (
                      <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                        <rect width="32" height="24" rx="7" fill="white" />
                        <path d="M13 7.5L22 12L13 16.5V7.5Z" fill="#ff1744" />
                      </svg>
                    )}
                    {logo.name === "Reels" && (
                      <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
                        <rect x="3" y="3" width="39" height="39" rx="11" stroke="white" strokeWidth="3.2" />
                        <path d="M7 17.5H38M12 5.5L18.5 17.5M23 5.5L29.5 17.5M19.5 23L29.5 28.8L19.5 34.5V23Z" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {logo.name === "TikTok" && (
                      <svg width="31" height="34" viewBox="0 0 31 34" fill="none">
                        <path d="M20.4 3.5C21.4 7.1 23.6 9.3 27.2 10.3V15.8C24.7 15.5 22.4 14.6 20.5 13.1V24C20.5 29.4 16.2 33 10.8 33C5.2 33 1.5 29.4 1.5 24.4C1.5 19.3 5.3 15.8 10.8 15.8C11.4 15.8 12 15.9 12.6 16V21.5C12.1 21.3 11.5 21.2 10.8 21.2C8.5 21.2 6.9 22.5 6.9 24.4C6.9 26.3 8.5 27.5 10.8 27.5C13.3 27.5 15 26.1 15 23.7V3.5H20.4Z" fill="#25F4EE" transform="translate(-1 -1)" />
                        <path d="M20.4 3.5C21.4 7.1 23.6 9.3 27.2 10.3V15.8C24.7 15.5 22.4 14.6 20.5 13.1V24C20.5 29.4 16.2 33 10.8 33C5.2 33 1.5 29.4 1.5 24.4C1.5 19.3 5.3 15.8 10.8 15.8C11.4 15.8 12 15.9 12.6 16V21.5C12.1 21.3 11.5 21.2 10.8 21.2C8.5 21.2 6.9 22.5 6.9 24.4C6.9 26.3 8.5 27.5 10.8 27.5C13.3 27.5 15 26.1 15 23.7V3.5H20.4Z" fill="#FE2C55" transform="translate(1 1)" />
                        <path d="M20.4 3.5C21.4 7.1 23.6 9.3 27.2 10.3V15.8C24.7 15.5 22.4 14.6 20.5 13.1V24C20.5 29.4 16.2 33 10.8 33C5.2 33 1.5 29.4 1.5 24.4C1.5 19.3 5.3 15.8 10.8 15.8C11.4 15.8 12 15.9 12.6 16V21.5C12.1 21.3 11.5 21.2 10.8 21.2C8.5 21.2 6.9 22.5 6.9 24.4C6.9 26.3 8.5 27.5 10.8 27.5C13.3 27.5 15 26.1 15 23.7V3.5H20.4Z" fill="white" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Orange circle glow */}
            <div
              className="absolute -inset-10 rounded-full"
              aria-hidden
              style={{
                background:
                  "radial-gradient(circle, rgba(255,102,0,0.22) 0%, transparent 65%)",
              }}
            />
            {/* Phone frame */}
            <div className="relative bg-[#1a1a1a] rounded-[2.6rem] border-2 border-white/10 overflow-hidden shadow-2xl aspect-[9/19]">
              {/* Notch */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-10"
                aria-hidden
              />
              <VideoCard
                video={{ src: telefonoVideoSrc, title: "Video de trabajos" }}
                className="absolute inset-0 h-full w-full"
                
              />
              
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="order-1 lg:order-2">
          <h2
            className="font-bebas leading-none tracking-[0.04em] text-transparent bg-clip-text section-title-animated"
            style={{
              fontSize: "clamp(5rem, 14vw, 10rem)",
              backgroundImage: "linear-gradient(95deg, #ff6a00 0%, #ff8a1f 28%, #ffb455 50%, #ff8a1f 72%, #ff6a00 100%)",
              backgroundSize: "220% 100%",
              opacity: titleOpacity,
              transform: `translate3d(${titleX}px, 0, 0) scale(${0.88 + ease * 0.12})`,
              transition: "all 0.35s ease-out",
            }}
          >
            VIDEOS
          </h2>
        </div>
      </div>
    </section>
  );
}

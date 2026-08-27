import Image from "next/image";
2
import { GlowBackground } from "@/components/ui/GlowBackground";
3
import { EmbersBackground } from "@/components/ui/EmbersBackground";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      <GlowBackground variant="hero" />

      

      <div className="relative z-10 px-4 pt-3 sm:pt-24">
        <h1
          className="font-bebas leading-[0.92] tracking-[0.06em] text-transparent bg-clip-text hero-title-animated"
          style={{
            fontSize: "clamp(5rem, 18vw, 14rem)",
            fontWeight: 900,
            backgroundImage:
              "linear-gradient(95deg, #ff6a00 0%, #ff8a1f 28%, #ffb455 50%, #ff8a1f 72%, #ff6a00 100%)",
            backgroundSize: "220% 100%",
          }}
        >
          PORTFOLIO
        </h1>

        <div className="-mt-20 flex justify-end pr-1 sm:-mt-26 lg:-mt-30">
          <Image
            src="/logos/logo-vision360.png"
            alt="Visión 360"
            width={420}
            height={142}
            className="w-52 sm:w-64 lg:w-80"
            style={{ height: "auto" }}
            priority
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}

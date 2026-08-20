import Image from "next/image";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Cierre() {
  return (
    <section
      id="contacto"
      className="relative flex items-center justify-center min-h-screen px-4"
    >
      <GlowBackground variant="hero" />

      <div className="relative z-10 flex max-w-5xl flex-col items-center gap-8 text-center">
        <SectionTitle align="center" className="mb-0">
          NO ES MAGIA,
          <br />
          ES ESTRATEGIA
        </SectionTitle>

        <Image
          src="/logos/logo-vision360.png"
          alt="Visión 360"
          width={220}
          height={76}
          className="w-40 sm:w-48 lg:w-56"
          style={{ height: "auto" }}
        />

        <WhatsAppButton label="Contactanos por WhatsApp" />
      </div>
    </section>
  );
}

import Image from "next/image";
import { NAV_ITEMS, WHATSAPP_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a]/90 px-4 py-12 sm:py-14">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,106,0,0.6), transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-start">
        <div className="relative flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <div
            className="absolute left-1/2 top-6 -translate-x-1/2 sm:left-10 sm:translate-x-0 rounded-full"
            style={{
              width: "180px",
              height: "180px",
              background:
                "radial-gradient(circle, rgba(255,106,0,0.10), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <Image
            src="/logos/logo-vision360.png"
            alt="Visión 360"
            width={150}
            height={52}
            className="h-12 w-auto"
            style={{ width: "auto" }}
          />

          <p className="max-w-xs text-sm italic leading-relaxed text-white/50">
            &ldquo;No es magia, es estrategia.&rdquo;
          </p>
        </div>

        <nav
          className="flex flex-col items-center gap-3 sm:items-start"
          aria-label="Navegación del pie de página"
        >
          <span className="font-bebas text-sm tracking-[0.20em] text-brand-orange">
            EXPLORAR
          </span>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center text-sm text-white/55 transition-colors hover:text-brand-orange"
            >
              <>
                <span className="text-brand-orange mr-2">•</span>
                {item.label}
              </>
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <span className="font-bebas text-sm tracking-[0.20em] text-brand-orange">
            CONTACTO
          </span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-brand-orange/20 bg-brand-orange/[0.04] px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:border-brand-orange/40 hover:text-brand-orange"
            aria-label="Contactar por WhatsApp"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contactanos
          </a>
          <p className="text-xs text-white/30">
            Comunicación, estrategia y resultados.
          </p>
        </div>

        <p className="col-span-full border-t border-white/10 pt-5 text-center text-xs text-white/25">
          © {new Date().getFullYear()} Visión 360. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

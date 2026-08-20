"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { NAV_ITEMS, WHATSAPP_URL } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";

const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const scrollingDown = y > lastScrollY.current;
      setScrolled(y > 60);

      if (menuOpen) {
        setHidden(false);
        lastScrollY.current = y;
        return;
      }

      if (y <= 60) {
        setHidden(false);
        lastScrollY.current = y;
        return;
      }

      if (scrollingDown) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (menuOpen) return;

      if (window.scrollY <= 60) {
        setHidden(false);
        return;
      }

      setHidden(event.clientY > 90);
    };

    const onMouseLeave = () => {
      if (!menuOpen && window.scrollY > 60) {
        setHidden(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [menuOpen]);

  // siempre mostrar cuando se abre el menu
  useEffect(() => { if (menuOpen) setHidden(false); }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[#111111]/95 backdrop-blur-sm shadow-lg shadow-black/50"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <a href="#inicio" onClick={closeMenu} className="flex-shrink-0">
          <Image
            src="/logos/logo-vision360.png"
            alt="Visión 360"
            width={200}
            height={68}
            className="h-22 sm:h-30"
            style={{ width: "auto" }}
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          aria-label="Navegación principal"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-brand-orange ${
                active === item.href.replace("#", "")
                  ? "text-brand-orange"
                  : "text-white/80"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 text-white/85 font-bold text-sm px-4 py-2 rounded-lg border border-white/30 hover:text-brand-orange hover:border-brand-orange transition-colors duration-200"
          aria-label="Contactar por WhatsApp"
        >
          {WA_ICON}
          WhatsApp
        </a>

        {/* Hamburger */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-200 ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current my-1.5 transition-all duration-200 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
          className="lg:hidden bg-[#1a1a1a]/98 border-t border-white/10 px-4 py-6 flex flex-col gap-5"
          aria-label="Menú móvil"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`text-base font-medium transition-colors duration-200 hover:text-brand-orange ${
                active === item.href.replace("#", "")
                  ? "text-brand-orange"
                  : "text-white/80"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/85 font-bold text-sm px-4 py-2.5 rounded-lg border border-white/30 w-fit mt-1 transition-colors duration-200 hover:text-brand-orange hover:border-brand-orange"
            aria-label="Contactar por WhatsApp"
          >
            {WA_ICON}
            WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

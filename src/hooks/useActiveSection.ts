"use client";
import { useEffect, useState } from "react";

const SECTION_IDS = [
  "inicio",
  "quienes-somos",
  "servicios",
  "clientes",
  "trabajos",
  "videos",
  "contacto",
];

export function useActiveSection() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35, rootMargin: "-80px 0px 0px 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

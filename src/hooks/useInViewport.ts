"use client";
import { useEffect, useRef, useState } from "react";

export function useInViewport(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inViewport };
}

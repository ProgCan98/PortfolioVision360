export const WHATSAPP_NUMBER = "5493516568415";
export const WHATSAPP_MESSAGE =
  "Hola Visión 360, me gustaría consultar sobre sus servicios.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// For local dev, videos are served from /videos (public folder).
// For production, set NEXT_PUBLIC_CDN_BASE_URL to your CDN domain.
export const CDN_BASE_URL =
  process.env.NEXT_PUBLIC_CDN_BASE_URL?.trim() || "/videos";

export const NAV_ITEMS = [
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Clientes", href: "#clientes" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Videos", href: "#videos" },
];

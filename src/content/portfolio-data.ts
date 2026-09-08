import type { ClienteData, FotoData, PlacaData, VideoGroup } from "@/types/media";
import type { Servicio } from "@/types/section";
//import { videoUrl } from "@/lib/media";

export const servicios: Servicio[] = [
  { numero: 1, titulo: "Gestión Integral de Comunicación y Contenidos" },
  { numero: 2, titulo: "Estrategia de Marketing, Campañas, Diseño y Fidelización" },
  { numero: 3, titulo: "Relaciones Públicas y Comunicación Institucional" },
];

export const clientes: ClienteData[] = [
  {
    id: "mil-articulos",
    nombre: "1000 Artículos Variables",
    logo: "/logos/logo-mil-articulos.png",
    alt: "Logo 1000 Artículos Variables",
  },
  {
    id: "nodo",
    nombre: "Nodo Tecnológico",
    logo: "/logos/logo-nodo-nuevo.png",
    alt: "Logo Nodo Tecnológico",
  },
  {
    id: "wunsch",
    nombre: "Wunsch Artesanal",
    logo: "/logos/logo-wunsch.png",
    alt: "Logo Wunsch Artesanal",
  },
  {
    id: "galpon-bacco",
    nombre: "El Galpón de Bacco",
    logo: "/logos/logo-galpon-bacco.png",
    alt: "Logo El Galpón de Bacco",
  },
];

// order interleaves landscape and portrait shots so the masonry columns balance
// out evenly instead of ending in a ragged staircase
const FOTOS_ORDER = [4, 5, 1, 6, 7, 2, 8, 9, 3, 12, 10, 13, 14, 11, 16, 17, 15];

export const fotos: FotoData[] = FOTOS_ORDER.map((n) => ({
  src: `/fotos/foto-${String(n).padStart(2, "0")}.jpg`,
  alt: `Trabajo realizado por Visión 360 — fotografía ${n}`,
}));

export const placas: PlacaData[] = [
  { src: "/placas/placa-01.png", alt: "Diseño Feed Aconquija" },
  { src: "/placas/placa-02.png", alt: "Diseño Feed Aconquija 2" },
  { src: "/placas/placa-03.png", alt: "Diseño para Grido" },
  { src: "/placas/placa-04.png", alt: "Placa publicitaria" },
  { src: "/placas/placa-05.png", alt: "4 Tips para el éxito" },
  { src: "/placas/placa-06.png", alt: "Diseño UK" },
  { src: "/placas/placa-07.png", alt: "Diseño de contenido" },
  { src: "/placas/placa-08.png", alt: "Diseño de contenido" },
  { src: "/placas/placa-09.png", alt: "Diseño de contenido" },
  { src: "/placas/placa-10.png", alt: "Diseño de contenido" },
];

const videoUrl = (filename: string) => {
  if (filename.startsWith("http")) {
    return filename;
  }

  return `/videos/${filename}`;
};

export const videoGroups: VideoGroup[] = [
  {
    cliente: "1000 Artículos",
    videos: [
      { src: videoUrl("Mil-articulos-1.mp4"), title: "Mil Artículos — Video 1" },
      { src: videoUrl("Mil-articulos-2.mp4"), title: "Mil Artículos — Video 2" },
      { src: videoUrl("Mil-articulos-3.mp4"), title: "Mil Artículos — Video 3" },
    ],
  },
  {
    cliente: "Folk4",
    videos: [
      { src: videoUrl("Folk4-1.mp4"), title: "Folk4 — Video 1" },
      { src: videoUrl("folk4-2-fixed.mp4"), title: "Folk4 — Video 2" },
      { src: videoUrl("Folk4-3.mp4"), title: "Folk4 — Video 3" },
    ],
  },
  {
    cliente: "Nodo Tecnológico",
    videos: [
      { src: videoUrl("Nodo-1.mp4"), title: "Nodo Tecnológico — Video 1" },
      { src: videoUrl("Nodo-2.mp4"), title: "Nodo Tecnológico — Video 2" },
      { src: videoUrl("Nodo-3.mp4"), title: "Nodo Tecnológico — Video 3" },
    ],
  },
  {
    cliente: "Nodo Aconquija",
    videos: [
      { src: videoUrl("Nodo-aconquija-1.mp4"), title: "Nodo Aconquija — Video 1" },
      { src: videoUrl("Nodo-aconquija-2.mp4"), title: "Nodo Aconquija — Video 2" },
      { src: videoUrl("Nodo-aconquija-3.mp4"), title: "Nodo Aconquija — Video 3" },
    ],
  },
  {
    cliente: "Wunsch Artesanal",
    videos: [
      { src: videoUrl("Wunsch-1.mp4"), title: "Wunsch Artesanal — Video 1" },
      { src: videoUrl("Wunsch-2.mp4"), title: "Wunsch Artesanal — Video 2" },
      { src: videoUrl("Wunsch-3.mp4"), title: "Wunsch Artesanal — Video 3" },
    ],
  },
];

export const telefonoVideoSrc = "./videos/TelefonoVideos.mp4";

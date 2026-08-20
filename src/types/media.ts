export interface VideoItem {
  src: string;
  title: string;
}

export interface VideoGroup {
  cliente: string;
  videos: VideoItem[];
}

export interface ClienteData {
  id: string;
  nombre: string;
  logo: string;
  alt: string;
}

export interface FotoData {
  src: string;
  alt: string;
}

export interface PlacaData {
  src: string;
  alt: string;
}

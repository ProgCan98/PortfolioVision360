import { CDN_BASE_URL } from "./constants";

export function videoUrl(filename: string): string {
  return `${CDN_BASE_URL}/${filename}`;
}

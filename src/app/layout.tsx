import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visión 360 | Agencia de Comunicación y Marketing",
  description:
    "Agencia de comunicación integral y marketing estratégico. Ayudamos a empresas, instituciones y profesionales a fortalecer su imagen, conectar con su público y potenciar sus resultados.",
  keywords:
    "agencia comunicación, marketing estratégico, redes sociales, diseño, visión 360, argentina",
  openGraph: {
    title: "Visión 360 | No es magia, es estrategia",
    description:
      "Agencia de comunicación integral y marketing estratégico.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visión 360 | No es magia, es estrategia",
    description:
      "Agencia de comunicación integral y marketing estratégico.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

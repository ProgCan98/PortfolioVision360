import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Servicios } from "@/components/sections/Servicios";
import { Clientes } from "@/components/sections/Clientes";
import { TrabajosIntro } from "@/components/sections/TrabajosIntro";
import { Placas } from "@/components/sections/Diseños";
import { Fotos } from "@/components/sections/Fotos";
import { VideosIntro } from "@/components/sections/VideosIntro";
import { VideoTriptico } from "@/components/sections/VideoTriptico";
import { Cierre } from "@/components/sections/Cierre";
import { videoGroups } from "@/content/portfolio-data";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <QuienesSomos />
        <Servicios />
        <Clientes />
        <TrabajosIntro />
        <Placas />
        <Fotos />
        <VideosIntro />
        {videoGroups.map((group) => (
          <VideoTriptico key={group.cliente} group={group} />
        ))}
        <Cierre />
      </main>
      <Footer />
    </>
  );
}

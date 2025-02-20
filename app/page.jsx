import Footer1 from "@/components/footers/Footer1";
import BannerCollection from "@/components/homes/home-1/BannerCollection";
import BannerCountdown from "@/components/homes/home-1/BannerCountdown";
import Features from "@/components/common/Features";
import Hero from "@/components/homes/home-1/Hero";
import Products1 from "@/components/common/Products3";
import Products2 from "@/components/homes/fashion-modernRetreat/Products2";
import Products from "@/components/homes/decor/Products";
import Header2 from "@/components/headers/Header2";

export const metadata = {
  title: "Lari Buquês",
  description: "A Lari Buquês é uma floricultura em São Paulo especializada em buquês personalizados e arranjos florais para todas as ocasiões. Encante-se com a beleza das nossas flores!",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#FFFFFF",
  icons: {
    icon: "favicon.ico",
  },
  openGraph: {
    locale: "pt-BR",
    title: "Lari Buquês - Floricultura em SP",
    siteName: "Lari Buquês",
    type: "website",
    description: "A Lari Buquês é uma floricultura em São Paulo especializada em buquês personalizados e arranjos florais para todas as ocasiões. Encante-se com a beleza das nossas flores!",
    url: "https://laribuques.com.br/",
    images: [
      {
        url: "/images/logo/logo.png",
      },
    ],
  },
  alternates: {
    canonical: "https://laribuques.com.br/",
  },
  keywords: ["Lari Buquês", "Floricultura", "Flores", "Buquês", "Arranjos florais", "São Paulo", "SP", "Presentes", "Casamentos", "Eventos", "Decoração", "Flores frescas", "Rosas", "Orquídeas", "Entrega de flores"],
  authors: [{ name: "Lari Buquês", url: "https://laribuques.com.br/" }],
};
export default function Home() {
  return (
    <>
      <Header2 />
      <Hero />
      <Products1 />
      <BannerCountdown />
      <Products />
      <BannerCollection />
      <Products2 />
      <Features />
      <Footer1 />
    </>
  );
}

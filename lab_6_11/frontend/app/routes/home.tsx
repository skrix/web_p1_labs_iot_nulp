import type { Route } from "./+types/home";
import { Layout } from "../components/Layout";
import { Hero } from "../components/Hero";
import { TilesSection } from "../components/TilesSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Third Wave Coffee Shop - Premium Accessories, Filters & Beans" },
    { name: "description", content: "Discover premium coffee accessories, precision filters, and artisan beans for third wave coffee enthusiasts. Elevate your coffee experience." },
  ];
}

export default function Home() {
  return (
    <Layout>
      <Hero />
      <TilesSection />
    </Layout>
  );
}

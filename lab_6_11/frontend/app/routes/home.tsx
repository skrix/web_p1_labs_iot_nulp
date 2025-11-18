import type { Route } from "./+types/home";
import { Layout } from "../components/Layout";
import { Hero } from "../components/Hero";
import { TilesSection } from "../components/TilesSection";
import { ProductsSection } from "../components/ProductsSection";
import { ProtectedRoute } from "../components/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vasyl&Co - RAYDROP" },
    { name: "description", content: "Vasyl&Co RayDrop — це пуровер ручної роботи з харчової нержавіючої сталі AISI 304 для заварювання кави." },
  ];
}

export default function Home() {
  return (
    <ProtectedRoute>
    <Layout>
      <Hero />
      <TilesSection />
      <ProductsSection />
    </Layout>
    </ProtectedRoute>
  );
}

import { useState } from "react";
import type { Route } from "./+types/catalog";
import { Layout } from "../components/Layout";
import { CatalogGrid } from "../components/CatalogGrid";
import { FilterBar } from "../components/FilterBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Магазин - Vasyl&Co" },
    { name: "description", content: "Каталог преміальних аксесуарів для кави від Vasyl&Co" },
  ];
}

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 bg-white dark:bg-gray-950 min-h-screen">
        <FilterBar onSearchChange={setSearchQuery} />
        <CatalogGrid searchQuery={searchQuery} />
      </div>
    </Layout>
  );
}

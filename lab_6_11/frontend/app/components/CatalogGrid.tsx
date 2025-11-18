import { useMemo, useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { Spinner } from "./Spinner";
import { useProducts } from "../context/ProductsContext";
import type { ProductFilters } from "../services/products.api";

interface CatalogGridProps {
  searchQuery?: string;
  category?: string;
  brand?: string;
  priceRange?: string;
}

export function CatalogGrid({
  searchQuery = "",
  category = "",
  brand = "",
  priceRange = ""
}: CatalogGridProps) {
  const { products, error, fetchProducts } = useProducts();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const filters: ProductFilters = {};

      if (category) { filters.category = category; }
      if (brand) { filters.brand = brand; }
      if (searchQuery.trim()) { filters.search = searchQuery; }

      if (priceRange) {
        if (priceRange === "0-300") {
          filters.maxPrice = 300;
        } else if (priceRange === "300-600") {
          filters.minPrice = 300;
          filters.maxPrice = 600;
        } else if (priceRange === "600-1000") {
          filters.minPrice = 600;
          filters.maxPrice = 1000;
        } else if (priceRange === "1000-1500") {
          filters.minPrice = 1000;
          filters.maxPrice = 1500;
        } else if (priceRange === "1500-2000") {
          filters.minPrice = 1500;
          filters.maxPrice = 2000;
        } else if (priceRange === "2000-3000") {
          filters.minPrice = 2000;
          filters.maxPrice = 3000;
        } else if (priceRange === "3000+") {
          filters.minPrice = 3000;
        }
      }

      setLoading(true);
      await fetchProducts(filters);
      setLoading(false);
    };

    loadProducts();
  }, [searchQuery, category, brand, priceRange, fetchProducts]);

  const productCards = useMemo(
    () =>
      products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      )),
    [products]
  );

  return (
    <>
      {loading && <Spinner message="Завантаження каталогу..." />}
      {!loading && (
        <div className="pb-16">
          {error ? (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg">Помилка: {error}</p>
            </div>
          ) : productCards.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Нічого не знайдено за запитом "{searchQuery || category || brand}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {productCards}
            </div>
          )}
        </div>
      )}
    </>
  );
}

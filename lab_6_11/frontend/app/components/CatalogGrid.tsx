import { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { useProducts } from "../context/ProductsContext";

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
  const { products } = useProducts();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by brand
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }

    // Filter by price range
    if (priceRange) {
      filtered = filtered.filter((product) => {
        const price = product.price;

        if (priceRange === "0-300") {
          return price <= 300;
        } else if (priceRange === "300-600") {
          return price > 300 && price <= 600;
        } else if (priceRange === "600-1000") {
          return price > 600 && price <= 1000;
        } else if (priceRange === "1000-1500") {
          return price > 1000 && price <= 1500;
        } else if (priceRange === "1500-2000") {
          return price > 1500 && price <= 2000;
        } else if (priceRange === "2000-3000") {
          return price > 2000 && price <= 3000;
        } else if (priceRange === "3000+") {
          return price > 3000;
        }

        return true;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        return (
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [products, searchQuery, category, brand, priceRange]);

  const productCards = useMemo(
    () =>
      filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      )),
    [filteredProducts]
  );

  return (
    <div className="pb-16">
      {productCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCards}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Нічого не знайдено за запитом "{searchQuery || category || brand}"
          </p>
        </div>
      )}
    </div>
  );
}

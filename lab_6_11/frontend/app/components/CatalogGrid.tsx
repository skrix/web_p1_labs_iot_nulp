import { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { useProducts } from "../context/ProductsContext";

interface CatalogGridProps {
  searchQuery?: string;
}

export function CatalogGrid({ searchQuery = "" }: CatalogGridProps) {
  const { products } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
  }, [products, searchQuery]);

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
            Нічого не знайдено за запитом "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}

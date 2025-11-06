import { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { useProducts } from "../context/ProductsContext";

export function CatalogGrid() {
  const { products } = useProducts();

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
    <div className="pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {productCards}
      </div>
    </div>
  );
}

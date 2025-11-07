import { useMemo, useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts, selectProducts } from "../store/productsSlice";

const PER_PAGE = 3;

export function ProductsSection() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [visibleProductsCount, setVisibleProductsCount] = useState(PER_PAGE);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const visibleProducts = useMemo(
    () => products.slice(0, visibleProductsCount),
    [products, visibleProductsCount]
  );

  const handleLoadMore = () => {
    setVisibleProductsCount((prev) =>
      Math.min(prev + PER_PAGE, products.length)
    );
  };

  const hasMoreProducts = visibleProductsCount < products.length;

  return (
    <section className="bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          Товари
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              currency={product.currency}
              image={product.image}
            />
          ))}
        </div>

        {hasMoreProducts && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-black hover:bg-black/50 dark:bg-white dark:hover:bg-white/50 text-white dark:text-black font-medium transition-colors cursor-pointer"
            >
              Переглянути більше
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

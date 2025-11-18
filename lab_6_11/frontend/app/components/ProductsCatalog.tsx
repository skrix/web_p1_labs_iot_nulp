import { useMemo, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Spinner } from "./Spinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts, selectProducts, selectProductsLoading, selectProductsError } from "../store/productsSlice";
import type { ProductFilters } from "../services/products.api";
import { parsePriceRange } from "../utils/filters";

interface ProductsCatalogProps {
  searchQuery?: string;
  category?: string;
  brand?: string;
  priceRange?: string;
}

export function ProductsCatalog({
  searchQuery = "",
  category = "",
  brand = "",
  priceRange = ""
}: ProductsCatalogProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    const filters: ProductFilters = {
      ...(category && { category }),
      ...(brand && { brand }),
      ...(searchQuery.trim() && { search: searchQuery }),
      ...(priceRange && parsePriceRange(priceRange)),
    };

    dispatch(fetchProducts(filters));
  }, [searchQuery, category, brand, priceRange, dispatch]);

  const productCards = useMemo(
    () =>
      products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          currency={product.currency}
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

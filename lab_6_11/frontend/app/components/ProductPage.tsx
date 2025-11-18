import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import type { Product } from "../services/products.api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { fetchProductById, selectProductsLoading } from "../store/productsSlice";
import { formatPrice } from "../utils/currency";

interface ProductPageProps {
  productId: string | undefined;
  onBack: () => void;
}

export function ProductPage({ productId, onBack }: ProductPageProps) {
  const [quantity, setQuantity] = useState("1");
  const [selectedOption, setSelectedOption] = useState("");
  const [product, setProduct] = useState<Product | null>(null);

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await dispatch(fetchProductById(parseInt(productId)));
      if (result.meta.requestStatus === 'fulfilled') {
        setProduct(result.payload as Product);
      }
    };

    fetchProduct();
  }, [productId, dispatch]);

  return (
    <>
      {loading && <Spinner message="Завантаження товару..." />}
      {!loading && !product && (
        <div className="text-center py-16">
          <p className="text-red-500 text-lg">Товар не знайдено</p>
          <button
            onClick={onBack}
            className="mt-4 px-8 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
          >
            Повернутися
          </button>
        </div>
      )}
      {!loading && product && (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-200 dark:bg-gray-800 aspect-square flex items-center justify-center">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col">
              <div className="flex gap-3 mb-6">
                {product.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-800 dark:bg-gray-700"
                  >
                    {category.label}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {product.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Кількість
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Варіант
                  </label>
                  <div className="relative">
                    <select
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-gray-900 dark:focus:border-white appearance-none cursor-pointer transition-colors"
                    >
                      <option value="">Оберіть</option>
                      <option value="standard">Стандартний</option>
                      <option value="premium">Преміум</option>
                      <option value="deluxe">Делюкс</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900 dark:text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-6 border-t border-gray-300 dark:border-gray-700">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              Ціна: {formatPrice(product.price, product.currency)}
            </div>

            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
              >
                Повернутися
              </button>
              <button
                onClick={() => {
                  if (product) {
                    dispatch(addToCart({ product, quantity: parseInt(quantity) || 1 }));
                  }
                }}
                className="px-8 py-3 bg-black hover:bg-black/50 dark:bg-white dark:hover:bg-white/50 text-white dark:text-black font-medium transition-colors"
              >
                Додати в кошик
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

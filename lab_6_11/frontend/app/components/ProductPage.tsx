import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import type { Product, ProductItem } from "../services/products.api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { fetchProductById, selectProductsLoading } from "../store/productsSlice";
import { formatPrice } from "../utils/currency";

interface ProductPageProps {
  productId: string | undefined;
  onBack: () => void;
}

export function ProductPage({ productId, onBack }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedProductItem, setSelectedProductItem] = useState<ProductItem | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;

      const result = await dispatch(fetchProductById(parseInt(productId)));

      if (result.meta.requestStatus === 'fulfilled') {
        const fetchedProduct = result.payload as Product;
        setProduct(fetchedProduct);

        const firstAvailable = fetchedProduct.items?.find(
          item => item.isAvailable && item.stock > 0
        );
        setSelectedProductItem(firstAvailable || null);
      }
    };

    loadProduct();
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

              {/* Out of Stock Message */}
              {(!product.items || product.items.length === 0 || !product.items.some(item => item.isAvailable && item.stock > 0)) && (
                <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded">
                  <p className="text-red-600 dark:text-red-400 font-bold text-lg text-center">
                    Товар тимчасово відсутній
                  </p>
                  <p className="text-red-500 dark:text-red-400 text-sm text-center mt-2">
                    Всі варіанти наразі розпродані
                  </p>
                </div>
              )}

              {/* Variant Selector and Quantity (only show if items are available) */}
              {product.items && product.items.length > 0 && product.items.some(item => item.isAvailable && item.stock > 0) && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {/* Variant Selector */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      Варіант
                    </label>
                    <div className="relative">
                      <select
                        value={selectedProductItem?.id || ""}
                        onChange={(e) => {
                          const item = product.items?.find(i => i.id === parseInt(e.target.value));
                          setSelectedProductItem(item || null);
                          setQuantity(1);
                        }}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-gray-900 dark:focus:border-white appearance-none cursor-pointer transition-colors"
                      >
                        <option value="">Оберіть варіант</option>
                        {product.items.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                            disabled={!item.isAvailable || item.stock <= 0}
                          >
                            {item.variation.charAt(0).toUpperCase() + item.variation.slice(1)} - {formatPrice(item.price, item.currency)}
                            {!item.isAvailable || item.stock <= 0 ? " (Немає в наявності)" : ` (${item.stock} шт.)`}
                          </option>
                        ))}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900 dark:text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      Кількість
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={selectedProductItem?.stock || 999}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                    />
                    {selectedProductItem && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Доступно: {selectedProductItem.stock} шт.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between py-6 border-t border-gray-300 dark:border-gray-700">
            {/* Price Display */}
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedProductItem ? (
                <>Ціна: {formatPrice(selectedProductItem.price, selectedProductItem.currency)}</>
              ) : (
                <>Ціна: —</>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
              >
                Повернутися
              </button>

              {/* Only show Add to Cart if product has available items */}
              {product.items && product.items.length > 0 && product.items.some(item => item.isAvailable && item.stock > 0) && (
                <button
                  onClick={() => {
                    if (!selectedProductItem) {
                      alert("Будь ласка, оберіть варіант товару");
                      return;
                    }

                    if (!selectedProductItem.isAvailable) {
                      alert("Цей варіант товару недоступний");
                      return;
                    }

                    if (selectedProductItem.stock < quantity) {
                      alert(`Недостатньо товару на складі. Доступно: ${selectedProductItem.stock} шт.`);
                      return;
                    }

                    dispatch(addToCart({
                      product,
                      productItem: selectedProductItem,
                      quantity
                    }));
                  }}
                  disabled={!selectedProductItem || !selectedProductItem.isAvailable || selectedProductItem.stock <= 0}
                  className="px-8 py-3 bg-black hover:bg-black/50 dark:bg-white dark:hover:bg-white/50 text-white dark:text-black font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Додати в кошик
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

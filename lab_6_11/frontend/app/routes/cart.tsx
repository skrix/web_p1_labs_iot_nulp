import type { Route } from "./+types/cart";
import { Layout } from "../components/Layout";
import { CartItem } from "../components/CartItem";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCartItems, selectCartTotalAmount, clearCart } from "../store/cartSlice";
import { formatPrice } from "../utils/currency";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Кошик - Vasyl&Co" },
    { name: "description", content: "Ваш кошик покупок" },
  ];
}

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectCartTotalAmount);

  const currency = 'UAH';

  const handleClearCart = () => {
    if (confirm("Ви впевнені, що хочете очистити кошик?")) {
      dispatch(clearCart());
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 bg-white dark:bg-gray-950 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Кошик покупок
          </h1>
          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="px-4 py-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border border-red-500 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Очистити кошик
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Ваш кошик порожній
            </p>
            <Link
              to="/catalog"
              className="inline-block px-8 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Перейти до каталогу
            </Link>
          </div>
        ) : (
          <>
            <div className="max-w-4xl mx-auto space-y-4 mb-8">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="max-w-4xl mx-auto border-t-2 border-gray-300 dark:border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-2 text-gray-600 dark:text-gray-400">
                <span className="text-lg">Проміжна сума ({items.reduce((sum, item) => sum + item.quantity, 0)} товарів):</span>
                  <span className="text-lg font-medium">{formatPrice(totalAmount, currency)}</span>
              </div>
              <div className="flex justify-between items-center mb-8 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 pt-4">
                <span className="text-2xl font-bold">Всього:</span>
                  <span className="text-3xl font-bold">{formatPrice(totalAmount, currency)}</span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link
                  to="/catalog"
                  className="w-full sm:w-auto text-center px-8 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  ← Продовжити покупки
                </Link>
                <button className="w-full sm:w-auto px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-bold text-lg">
                  Оформити замовлення →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

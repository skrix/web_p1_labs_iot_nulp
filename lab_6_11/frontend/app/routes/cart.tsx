import type { Route } from "./+types/cart";
import { Layout } from "../components/Layout";
import { CartItem } from "../components/CartItem";
import { CartEmpty } from "../components/CartEmpty";
import { CartSummary } from "../components/CartSummary";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCartItems, selectCartTotalAmount, clearCart } from "../store/cartSlice";
import { ProtectedRoute } from "../components/ProtectedRoute";

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
    <ProtectedRoute>
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
          <CartEmpty />
        ) : (
          <>
            <div className="max-w-4xl mx-auto space-y-4 mb-8">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <CartSummary
              itemCount={items.reduce((sum, item) => sum + item.quantity, 0)}
              totalAmount={totalAmount}
              currency={currency}
            />
          </>
        )}
      </div>
    </Layout>
    </ProtectedRoute>
  );
}

import type { Route } from "./+types/order-success";
import { Layout } from "../components/Layout";
import { Link, useLocation } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Замовлення оформлено - Vasyl&Co" },
    { name: "description", content: "Ваше замовлення успішно оформлено" },
  ];
}

interface LocationState {
  order?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    pickupLocation: string;
    paymentMethod: string;
    amount: string;
    currency: string;
    carrier?: {
      name: string;
    };
    items?: Array<{
      quantity: number;
      product?: {
        title: string;
        price: string;
      };
    }>;
  };
}

export default function OrderSuccess() {
  const location = useLocation();
  const state = location.state as LocationState;
  const order = state?.order;

  useEffect(() => {
    // Redirect to catalog if no order data
    if (!order) {
      window.location.href = '/catalog';
    }
  }, [order]);

  if (!order) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 bg-white dark:bg-gray-950 min-h-screen">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon and Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Успішно!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              Ваше замовлення відправлено в обробку!
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Перевірте свою електронну пошту для отримання додаткової інформації.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Деталі замовлення
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Номер замовлення:</span>
                <span className="font-medium text-gray-900 dark:text-white">#{order.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Ім'я:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {order.firstName} {order.lastName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                <span className="font-medium text-gray-900 dark:text-white">{order.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Телефон:</span>
                <span className="font-medium text-gray-900 dark:text-white">{order.phone}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Місто:</span>
                <span className="font-medium text-gray-900 dark:text-white">{order.city}</span>
              </div>

              {order.carrier && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Спосіб доставки:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{order.carrier.name}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Місце видачі:</span>
                <span className="font-medium text-gray-900 dark:text-white">{order.pickupLocation}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Спосіб оплати:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {order.paymentMethod === 'cash' && 'Готівка при отриманні'}
                  {order.paymentMethod === 'card' && 'Банківська карта'}
                  {order.paymentMethod === 'online' && 'Онлайн оплата'}
                  {order.paymentMethod === 'bank-transfer' && 'Банківський переказ'}
                </span>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <span className="text-gray-900 dark:text-white font-bold">Сума замовлення:</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {parseFloat(order.amount).toFixed(2)} {order.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {order.items && order.items.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Товари
              </h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.product?.title} x {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.product?.price} {order.currency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to Catalog Button */}
          <div className="text-center">
            <Link
              to="/catalog"
              className="inline-block px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-bold text-lg"
            >
              Повернутися до каталогу
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

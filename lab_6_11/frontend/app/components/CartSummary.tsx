import { Link } from "react-router";
import { formatPrice } from "../utils/currency";

interface CartSummaryProps {
  itemCount: number;
  totalAmount: number;
  currency: string;
}

export function CartSummary({ itemCount, totalAmount, currency }: CartSummaryProps) {
  return (
    <div className="max-w-4xl mx-auto border-t-2 border-gray-300 dark:border-gray-700 pt-6">
      <div className="flex justify-between items-center mb-2 text-gray-600 dark:text-gray-400">
        <span className="text-lg">Проміжна сума ({itemCount} товарів):</span>
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
        <Link
          to="/checkout"
          className="w-full sm:w-auto px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-bold text-lg"
        >
          Оформити замовлення →
        </Link>
      </div>
    </div>
  );
}

import { memo } from "react";
import { Link } from "react-router";
import { formatPrice } from "../utils/currency";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
}

export const ProductCard = memo(function ProductCard({ id, title, description, price, currency, image }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 overflow-hidden flex flex-col border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-colors h-full">
      <div className="p-4 flex flex-col h-full">
        <div className="aspect-square overflow-hidden mb-4">
          <img src={image} alt={title} className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-1">
          {description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-gray-900 dark:text-white">Ціна:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(price, currency)}</span>
          </div>

          <button className="w-full bg-black hover:bg-black/50 dark:bg-white dark:hover:bg-white/50 text-white dark:text-black py-3 font-medium transition-colors cursor-pointer">
            <Link to={`/product/${id}`} className="block">
              Переглянути
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
});

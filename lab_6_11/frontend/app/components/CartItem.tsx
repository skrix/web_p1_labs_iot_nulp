import { memo } from "react";
import type { CartItem as CartItemType } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";
import { updateQuantity, removeFromCart } from "../store/cartSlice";
import { formatPrice } from "../utils/currency";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = memo(function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, productItem, quantity } = item;

  const isLowStock = productItem.stock < 10;
  const itemTotal = productItem.price * quantity;

  const handleDecrease = () => {
    const newQuantity = quantity - 1;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productItemId: productItem.id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart({ productItemId: productItem.id }));
    }
  };

  const handleIncrease = () => {
    if (quantity >= productItem.stock) {
      alert(`Неможливо додати більше. Доступно лише ${productItem.stock} шт.`);
      return;
    }
    dispatch(updateQuantity({ productItemId: productItem.id, quantity: quantity + 1 }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ productItemId: productItem.id }));
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow">
      <div className="w-full md:w-24 h-48 md:h-24 shrink-0 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 w-full">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">
          Варіант: {productItem.variation}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatPrice(productItem.price, productItem.currency)} за шт.
        </p>
        {isLowStock && (
          <p className="text-xs text-orange-500 dark:text-orange-400 mt-1">
            Залишилось {productItem.stock} шт.
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrease}
            className="w-10 h-10 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center font-bold"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-gray-900 dark:text-white font-bold min-w-12 text-center text-lg">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={quantity >= productItem.stock}
            className="w-10 h-10 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
            title={quantity >= productItem.stock ? `Максимум: ${productItem.stock} шт.` : "Збільшити кількість"}
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-gray-900 dark:text-white font-bold text-xl min-w-24 text-center md:text-right">
            {formatPrice(itemTotal, productItem.currency)}
          </div>

          <button
            onClick={handleRemove}
            className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded"
            aria-label="Remove item"
            title="Remove from cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

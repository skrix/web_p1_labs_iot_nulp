import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductItem } from '../services/products.api';

export interface CartItem {
  product: Product;  // Abstract template (for display info)
  productItem: ProductItem;  // Actual orderable item (REQUIRED)
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const CART_STORAGE_KEY = 'cart';

const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; productItem: ProductItem; quantity?: number }>) => {
      const { product, productItem, quantity = 1 } = action.payload;

      // Find existing cart item by productItem ID
      const existingItem = state.items.find(item => item.productItem.id === productItem.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, productItem, quantity });
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<{ productItemId: number }>) => {
      state.items = state.items.filter(item => item.productItem.id !== action.payload.productItemId);
      saveCartToStorage(state.items);
    },

    updateQuantity: (state, action: PayloadAction<{ productItemId: number; quantity: number }>) => {
      const { productItemId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter(item => item.productItem.id !== productItemId);
      } else {
        const item = state.items.find(item => item.productItem.id === productItemId);
        if (item) {
          item.quantity = quantity;
        }
      }

      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotalAmount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + (item.productItem.price * item.quantity), 0);

export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;

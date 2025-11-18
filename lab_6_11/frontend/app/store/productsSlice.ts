import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '../services/products.api';
import type { Product, ProductFilters } from '../services/products.api';
import { sleep } from '../utils/sleep';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters?: ProductFilters) => {
    const data = await productsApi.getAll(filters);
    await sleep(600);
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const data = await productsApi.getById(id);
    await sleep(600);
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
      });
  },
});

export const { clearError } = productsSlice.actions;

export const selectProducts = (state: { products: ProductsState }) => state.products.products;
export const selectProductsLoading = (state: { products: ProductsState }) => state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;

export default productsSlice.reducer;

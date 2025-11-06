import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { productsApi, type ProductFilters, type Product } from "../services/products.api";
import { sleep } from "../utils/sleep";

interface ProductsContextType {
  products: Product[];
  error: string | null;
  fetchProducts: (filters?: ProductFilters) => Promise<Product[] | null>;
  getProductById: (id: number) => Promise<Product | null>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (filters?: ProductFilters): Promise<Product[] | null> => {
    setError(null);
    try {
      const data = await productsApi.getAll(filters);
      await sleep(600);
      setProducts(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
      return null;
    }
  }, []);

  const getProductById = useCallback(async (id: number): Promise<Product | null> => {
    try {
      const data = await productsApi.getById(id);
      await sleep(600);
      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider value={{ products, error, fetchProducts, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}

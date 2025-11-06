import apiClient from './api';
import axios from 'axios';
import type { Product } from '../context/ProductsContext';

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  label: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  brand: Brand[];
}

export const productsApi = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    const params = new URLSearchParams();

    if (filters?.category) { params.append('category', filters.category); };
    if (filters?.brand)    { params.append('brand', filters.brand); };
    if (filters?.minPrice) { params.append('minPrice', filters.minPrice.toString()); };
    if (filters?.maxPrice) { params.append('maxPrice', filters.maxPrice.toString()); };
    if (filters?.search)   { params.append('search', filters.search); };

    const response = await apiClient.get<Product[]>(`/products?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', product);
    return response.data;
  },

  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};

import apiClient from './api';
import type { Product } from './products.api';
import type { Carrier } from './carriers.api';

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  product?: Product;
}

export interface Order {
  id: number;
  userId: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  carrierId: number | null;
  pickupLocation: string;
  paymentMethod: 'cash' | 'card' | 'online' | 'bank-transfer';
  amount: string;
  currency: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  carrier?: Carrier;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface CreateOrderData {
  userId?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  carrierId?: number | null;
  pickupLocation: string;
  paymentMethod: 'cash' | 'card' | 'online' | 'bank-transfer';
  notes?: string;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

export interface OrderFilters {
  status?: string;
  userId?: number;
  paymentMethod?: string;
}

export const ordersApi = {
  create: async (orderData: CreateOrderData): Promise<Order> => {
    const response = await apiClient.post<Order>('/orders', orderData);
    return response.data;
  },

  getAll: async (filters?: OrderFilters): Promise<Order[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.userId) params.append('userId', filters.userId.toString());
    if (filters?.paymentMethod) params.append('paymentMethod', filters.paymentMethod);

    const response = await apiClient.get<Order[]>(`/orders?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },

  update: async (id: number, data: Partial<Omit<CreateOrderData, 'items'>>): Promise<Order> => {
    const response = await apiClient.put<Order>(`/orders/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/orders/${id}`);
  },
};

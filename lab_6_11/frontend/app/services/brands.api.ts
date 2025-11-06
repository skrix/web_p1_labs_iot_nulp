import api from './api';

export interface Brand {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const brandsApi = {
  getAll: async (): Promise<Brand[]> => {
    const response = await api.get<Brand[]>('/brands');
    return response.data;
  },

  getById: async (id: number): Promise<Brand> => {
    const response = await api.get<Brand>(`/brands/${id}`);
    return response.data;
  },

  create: async (brand: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>): Promise<Brand> => {
    const response = await api.post<Brand>('/brands', brand);
    return response.data;
  },

  update: async (id: number, brand: Partial<Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Brand> => {
    const response = await api.put<Brand>(`/brands/${id}`, brand);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/brands/${id}`);
  }
};

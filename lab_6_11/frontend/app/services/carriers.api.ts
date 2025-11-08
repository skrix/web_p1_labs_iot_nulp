import apiClient from './api';

export interface Carrier {
  id: number;
  name: string;
  code: string;
  description: string | null;
  logo: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const carriersApi = {
  getAll: async (): Promise<Carrier[]> => {
    const response = await apiClient.get<Carrier[]>('/carriers');
    return response.data;
  },

  getById: async (id: number): Promise<Carrier> => {
    const response = await apiClient.get<Carrier>(`/carriers/${id}`);
    return response.data;
  },
};

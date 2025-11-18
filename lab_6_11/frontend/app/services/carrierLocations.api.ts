import apiClient from './api';
import type { Carrier } from './carriers.api';

export interface CarrierLocation {
  id: number;
  carrierId: number;
  name: string;
  code: string;
  address: string;
  city: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  carrier?: Carrier;
}

export interface CarrierLocationFilters {
  carrierId?: number;
}

export const carrierLocationsApi = {
  getAll: async (filters?: CarrierLocationFilters): Promise<CarrierLocation[]> => {
    const params = new URLSearchParams();
    if (filters?.carrierId) { params.append('carrierId', filters.carrierId.toString()) };

    const queryString = params.toString();
    const response = await apiClient.get<CarrierLocation[]>(`/carrier-locations${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  getById: async (id: number): Promise<CarrierLocation> => {
    const response = await apiClient.get<CarrierLocation>(`/carrier-locations/${id}`);
    return response.data;
  },
};

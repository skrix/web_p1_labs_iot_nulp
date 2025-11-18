import apiClient from './api';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
}

export const authApi = {
  signIn: async (signInData: SignInRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/users/sign-in', signInData);
    return response.data;
  },

  signUp: async (signUpData: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/users/sign-up', signUpData);
    return response.data;
  },
};

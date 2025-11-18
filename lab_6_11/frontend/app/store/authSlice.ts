import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

// Check localStorage for existing auth data
const loadAuthFromStorage = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    const userJson = localStorage.getItem('authUser');

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        return {
          user,
          isAuthenticated: true,
          token,
        };
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    token: null,
  };
};

const initialState: AuthState = loadAuthFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;

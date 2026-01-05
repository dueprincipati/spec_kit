import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';
import { User, AuthResponse, LoginDto, RegisterDto } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (data: LoginDto) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.post<AuthResponse>('/auth/login', data);
          set({
            user: response.data.user,
            token: response.data.token,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.error || 'Errore durante il login',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data: RegisterDto) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.post<AuthResponse>('/auth/register', data);
          set({
            user: response.data.user,
            token: response.data.token,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.error || 'Errore durante la registrazione',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      fetchMe: async () => {
        try {
          const response = await api.get<User>('/auth/me');
          set({ user: response.data });
        } catch (error) {
          set({ user: null, token: null });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

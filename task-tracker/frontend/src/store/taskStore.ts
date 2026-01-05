import { create } from 'zustand';
import api from '../services/api';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: (filters?: Record<string, string>) => Promise<void>;
  createTask: (data: CreateTaskDto) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskDto) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  updateTaskStatus: (id: string, status: Task['status']) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async (filters = {}) => {
    try {
      set({ isLoading: true, error: null });
      const params = new URLSearchParams(filters);
      const response = await api.get<Task[]>(`/tasks?${params}`);
      set({ tasks: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Errore nel caricamento dei task',
        isLoading: false,
      });
    }
  },

  createTask: async (data: CreateTaskDto) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post<Task>('/tasks', data);
      set((state) => ({
        tasks: [response.data, ...state.tasks],
        isLoading: false,
      }));
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Errore nella creazione del task',
        isLoading: false,
      });
      throw error;
    }
  },

  updateTask: async (id: string, data: UpdateTaskDto) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.put<Task>(`/tasks/${id}`, data);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? response.data : task)),
        isLoading: false,
      }));
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Errore nell\'aggiornamento del task',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteTask: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await api.delete(`/tasks/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Errore nell\'eliminazione del task',
        isLoading: false,
      });
      throw error;
    }
  },

  updateTaskStatus: async (id: string, status: Task['status']) => {
    try {
      const response = await api.patch<Task>(`/tasks/${id}/status`, { status });
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? response.data : task)),
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Errore nell\'aggiornamento dello stato',
      });
      throw error;
    }
  },
}));

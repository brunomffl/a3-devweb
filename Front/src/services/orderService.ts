import api from './api';
import type {
  Order,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  PaginatedResponse,
} from '../types';

export const orderService = {
  getAll: async (page = 1, pageSize = 10): Promise<PaginatedResponse<Order>> => {
    const response = await api.get('/orders', {
      params: { page, pageSize },
    });
    return response.data.data;
  },

  getById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data.data;
  },

  getMyOrders: async (page = 1, pageSize = 10): Promise<PaginatedResponse<Order>> => {
    const response = await api.get('/orders/my-orders', {
      params: { page, pageSize },
    });
    return response.data.data;
  },

  create: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await api.post('/orders', data);
    return response.data.data;
  },

  updateStatus: async (id: string, data: UpdateOrderStatusRequest): Promise<Order> => {
    const response = await api.patch(`/orders/${id}/status`, data);
    return response.data.data;
  },

  cancel: async (id: string): Promise<Order> => {
    const response = await api.patch(`/orders/${id}/cancel`);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/orders/${id}`);
  },
};

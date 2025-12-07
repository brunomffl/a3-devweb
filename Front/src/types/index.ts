// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

// Order Types
export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CreateOrderRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface UpdateOrderStatusRequest {
  status: Order['status'];
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

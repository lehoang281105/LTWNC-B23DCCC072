/**
 * Tái sử dụng và đồng bộ trực tiếp các type từ module Quản lý đơn hàng (Tuần 1).
 * Tuân thủ tuyệt đối các nguyên tắc:
 * - Dùng enum cho OrderStatus
 * - Dùng Pick để tạo OrderItem từ Product
 * - Dùng Omit để tạo CreateOrderDto
 * - Dùng Partial để tạo UpdateOrderDto
 * - Generic Paginated<T> và ApiResponse<T>
 */

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  description?: string;
  imageUrl?: string;
}

export interface OrderItem extends Pick<Product, 'id' | 'name' | 'price'> {
  quantity: number;
}

export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  shippingAddress?: string;
  note?: string;
}

export interface CreateOrderDto extends Omit<Order, 'id' | 'totalAmount' | 'createdAt' | 'status' | 'customer'> {
  customerId: string;
}

export type UpdateOrderDto = Partial<CreateOrderDto>;

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  total: number;
}

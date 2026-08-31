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
}


export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
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

// Interface phân trang bằng Generic
export interface Paginated<T> {
  items: T[];
  page: number;
  total: number;
}

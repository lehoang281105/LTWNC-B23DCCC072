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

/*
 * Giải thích yêu cầu đề bài:
 * - Module được chia thành các interface Customer, Product, OrderItem và Order
 *   để mô tả rõ dữ liệu của khách hàng, sản phẩm và đơn hàng.
 * - OrderStatus là enum, giúp trạng thái đơn hàng chỉ nhận các giá trị hợp lệ
 *   thay vì dùng chuỗi tùy ý.
 * - OrderItem dùng Pick<Product, 'id' | 'name' | 'price'> để tái sử dụng
 *   các thuộc tính cần thiết của Product, sau đó thêm quantity.
 * - Order chứa customer kiểu Customer và items là mảng OrderItem, thể hiện
 *   quan hệ giữa đơn hàng, khách hàng và các sản phẩm trong đơn.
 * - CreateOrderDto dùng Omit để loại bỏ các trường hệ thống tự tạo hoặc tự tính
 *   như id, totalAmount, createdAt và status; đồng thời nhận customerId.
 * - UpdateOrderDto dùng Partial<CreateOrderDto>, cho phép cập nhật từng phần
 *   của đơn hàng mà không cần gửi lại toàn bộ dữ liệu.
 * - ApiResponse<T> và Paginated<T> minh họa generic: cùng một cấu trúc có thể
 *   dùng với nhiều kiểu dữ liệu khác nhau mà vẫn giữ được kiểm tra kiểu.
 * - Cách thiết kế này đáp ứng yêu cầu tái sử dụng interface, enum, generic
 *   và Utility Types (Pick, Omit, Partial), đồng thời hạn chế trùng lặp code.
 */

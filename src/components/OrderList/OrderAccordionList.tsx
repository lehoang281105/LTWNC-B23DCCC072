import React, { useState, useMemo } from 'react';
import { Order, OrderStatus } from '../../types/order-management';
import { usePagination } from '../../hooks/usePagination';
import Accordion from '../Accordion/Accordion';
import { PaginationControls } from '../PaginationControls/PaginationControls';
import './OrderAccordionList.css';

//
interface OrderAccordionListProps {
  orders: Order[];
}

export const OrderAccordionList: React.FC<OrderAccordionListProps> = ({ orders }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredOrders = useMemo(() => {
    if (selectedStatus === 'ALL') return orders;
    return orders.filter((order) => order.status === selectedStatus);
  }, [orders, selectedStatus]);

  const pagination = usePagination<Order>(filteredOrders, 4);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getStatusBadge = (status: OrderStatus) => {
    const config: Record<OrderStatus, { label: string; className: string }> = {
      [OrderStatus.PENDING]: { label: 'Chờ xử lý', className: 'badge--pending' },
      [OrderStatus.PAID]: { label: 'Đã thanh toán', className: 'badge--paid' },
      [OrderStatus.SHIPPED]: { label: 'Đã giao hàng', className: 'badge--shipped' },
      [OrderStatus.CANCELLED]: { label: 'Đã hủy', className: 'badge--cancelled' },
    };
    const { label, className } = config[status];
    return <span className={`order-badge ${className}`}>{label}</span>;
  };

  return (
    <div className="order-list-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Danh sách Đơn hàng</h2>
        </div>

        <div className="status-filter">
          <label htmlFor="statusFilter">Lọc theo trạng thái:</label>
          <select
            id="statusFilter"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              pagination.goToPage(1); // Reset về trang 1 khi lọc
            }}
            className="filter-select"
          >
            <option value="ALL">Tất cả ({orders.length})</option>
            <option value={OrderStatus.PAID}>Đã thanh toán</option>
            <option value={OrderStatus.SHIPPED}>Đã giao hàng</option>
            <option value={OrderStatus.PENDING}>Chờ xử lý</option>
            <option value={OrderStatus.CANCELLED}>Đã hủy</option>
          </select>
        </div>
      </div>

      {pagination.currentData.length === 0 ? (
        <div className="empty-state">
          <p>Không tìm thấy đơn hàng nào phù hợp với bộ lọc.</p>
        </div>
      ) : (
        <Accordion defaultOpenId={pagination.currentData[0]?.id}>
          {pagination.currentData.map((order) => (
            <Accordion.Item key={order.id} value={order.id} className="order-accordion-item">
              <Accordion.Header className="order-header-trigger">
                <div className="order-header-grid">
                  <div className="order-col-id">
                    <span className="order-id-tag">{order.id}</span>
                    <span className="order-date">{formatDate(order.createdAt)}</span>
                  </div>

                  <div className="order-col-customer">
                    <div className="customer-avatar">
                      {order.customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="customer-name">{order.customer.name}</div>
                      <div className="customer-contact">{order.customer.phone}</div>
                    </div>
                  </div>

                  <div className="order-col-status">
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="order-col-total">
                    <div className="order-total-label">Tổng tiền:</div>
                    <div className="order-total-value">{formatCurrency(order.totalAmount)}</div>
                  </div>
                </div>
              </Accordion.Header>

              <Accordion.Body className="order-body-content">
                <div className="order-detail-grid">
                  <div className="order-info-card">
                    <h4 className="info-card-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Thông tin khách hàng & Giao vận
                    </h4>
                    <div className="info-row">
                      <span className="info-label">Khách hàng:</span>
                      <span className="info-value">{order.customer.name} (Mã: {order.customer.id})</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{order.customer.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Điện thoại:</span>
                      <span className="info-value">{order.customer.phone}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Địa chỉ giao:</span>
                      <span className="info-value">{order.shippingAddress || order.customer.address}</span>
                    </div>
                    {order.note && (
                      <div className="info-row note-row">
                        <span className="info-label">Ghi chú:</span>
                        <span className="info-value note-value">{order.note}</span>
                      </div>
                    )}
                  </div>

                  <div className="order-items-card">
                    <h4 className="info-card-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      Sản phẩm trong đơn ({order.items.length} món)
                    </h4>
                    <div className="items-table-wrapper">
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th className="text-right">Đơn giá</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-right">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr key={`${item.id}-${index}`}>
                              <td>
                                <div className="item-name">{item.name}</div>
                                <div className="item-sku">SKU: {item.id}</div>
                              </td>
                              <td className="text-right">{formatCurrency(item.price)}</td>
                              <td className="text-center">
                                <span className="item-quantity">x{item.quantity}</span>
                              </td>
                              <td className="text-right font-medium">
                                {formatCurrency(item.price * item.quantity)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3} className="text-right font-bold">
                              Tổng cộng:
                            </td>
                            <td className="text-right font-bold highlight-price">
                              {formatCurrency(order.totalAmount)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}

      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        nextPage={pagination.nextPage}
        prevPage={pagination.prevPage}
        goToPage={pagination.goToPage}
        canNext={pagination.canNext}
        canPrev={pagination.canPrev}
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.itemsPerPage}
        setItemsPerPage={pagination.setItemsPerPage}
        pageSizeOptions={[2, 4, 8]}
      />
    </div>
  );
};

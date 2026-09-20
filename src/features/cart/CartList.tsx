import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCart, removeItem, updateQuantity } from './cartSlice';
import './CartList.css';

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export const CartList: React.FC = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="cart-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Giỏ hàng ({totalQuantity} sản phẩm)</h2>
        </div>
        {items.length > 0 && (
          <button type="button" className="cart-clear-btn" onClick={() => dispatch(clearCart())}>
            Xoá toàn bộ
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <p>Giỏ hàng trống. Hãy thêm sản phẩm từ tab Danh mục Sản phẩm.</p>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">{formatCurrency(item.price)}</span>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label="Giảm số lượng"
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label="Tăng số lượng"
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-item-total">{formatCurrency(item.price * item.quantity)}</span>

                  <button
                    type="button"
                    className="cart-remove-btn"
                    aria-label="Xoá sản phẩm"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Tạm tính</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            <div className="cart-summary-row cart-summary-row--total">
              <span>Tổng cộng</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;

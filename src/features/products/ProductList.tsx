import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from './productsSlice';
import { addItem } from '../cart/cartSlice';
import { usePagination } from '../../hooks/usePagination';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import './ProductList.css';

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const pagination = usePagination(items, 6);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="rtk-product-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Danh mục Sản phẩm (Redux Toolkit)</h2>
        </div>
        {status === 'failed' && (
          <button type="button" className="rtk-retry-btn" onClick={() => dispatch(fetchProducts())}>
            Thử lại
          </button>
        )}
      </div>

      {status === 'loading' && (
        <div className="rtk-status">
          <span className="rtk-spinner"></span>
          <span>Đang tải sản phẩm từ API giả lập...</span>
        </div>
      )}

      {status === 'failed' && (
        <div className="rtk-status rtk-status--error">
          <p>Lỗi: {error}</p>
        </div>
      )}

      {status === 'succeeded' && pagination.currentData.length === 0 && (
        <div className="rtk-status">
          <p>Không có sản phẩm nào.</p>
        </div>
      )}

      {status === 'succeeded' && (
        <div className="product-grid">
          {pagination.currentData.map((prod) => (
            <div key={prod.id} className="product-card">
              {prod.imageUrl && (
                <div className="product-image-box">
                  <img src={prod.imageUrl} alt={prod.name} className="product-image" loading="lazy" />
                  {prod.category && <span className="product-badge">{prod.category}</span>}
                </div>
              )}

              <div className="product-card-body">
                <div className="product-sku">Mã: {prod.id}</div>
                <h3 className="product-title" title={prod.name}>
                  {prod.name}
                </h3>
                {prod.description && <p className="product-desc">{prod.description}</p>}

                <div className="product-footer">
                  <div>
                    <div className="product-price-label">Giá bán:</div>
                    <div className="product-price">{formatCurrency(prod.price)}</div>
                  </div>
                  <div className="product-stock">
                    <span className="stock-dot"></span>
                    <span>Còn {prod.stock} sp</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="rtk-add-cart-btn"
                  onClick={() => dispatch(addItem(prod))}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {status === 'succeeded' && (
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
          pageSizeOptions={[3, 6, 9]}
        />
      )}
    </div>
  );
};

export default ProductList;

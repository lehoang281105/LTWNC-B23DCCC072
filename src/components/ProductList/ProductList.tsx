import React from 'react';
import { Product } from '../../types/order-management';
import { usePagination } from '../../hooks/usePagination';
import { PaginationControls } from '../PaginationControls/PaginationControls';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // Áp dụng custom hook usePagination<Product> cho danh sách sản phẩm
  // Đảm bảo type Generic rõ ràng không dùng any
  const pagination = usePagination<Product>(products, 6);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="product-list-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Danh mục Sản phẩm (Kho hàng)</h2>
        </div>
      </div>

      {pagination.currentData.length === 0 ? (
        <div className="empty-state">
          <p>Không có sản phẩm nào phù hợp với điều kiện tìm kiếm.</p>
        </div>
      ) : (
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
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Thanh điều khiển phân trang tái sử dụng */}
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
    </div>
  );
};

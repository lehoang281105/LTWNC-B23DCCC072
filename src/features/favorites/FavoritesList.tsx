import React from 'react';
import { useFavoritesStore } from './favoritesStore';
import { useAppDispatch } from '../../app/hooks';
import { addItem } from '../cart/cartSlice';
import './FavoritesList.css';

interface FavoritesListProps {
  onExploreProducts?: () => void;
}

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export const FavoritesList: React.FC<FavoritesListProps> = ({ onExploreProducts }) => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const dispatch = useAppDispatch();

  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <div className="favorites-title-wrap">
          <div className="favorites-icon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className="favorites-title">
            Sản phẩm yêu thích ({favorites.length})
          </h2>
        </div>

        {favorites.length > 0 && (
          <button
            type="button"
            className="favorites-clear-btn"
            onClick={clearFavorites}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Xóa danh sách
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <div className="favorites-empty-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h3>Danh sách yêu thích đang trống</h3>
          <p>
            Bạn chưa lưu sản phẩm nào. Hãy bấm biểu tượng trái tim trên các thẻ sản phẩm để lưu lại xem sau!
          </p>
          {onExploreProducts && (
            <button
              type="button"
              className="favorites-explore-btn"
              onClick={onExploreProducts}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              Khám phá sản phẩm ngay
            </button>
          )}
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id} className="fav-card">
              <div className="fav-card-image-box">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="fav-card-image" loading="lazy" />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                    Không có ảnh
                  </div>
                )}
                <button
                  type="button"
                  className="fav-remove-icon-btn"
                  title="Bỏ yêu thích"
                  onClick={() => removeFavorite(item.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              <div className="fav-card-body">
                <h3 className="fav-card-title" title={item.name}>
                  {item.name}
                </h3>
                <div className="fav-card-price">{formatCurrency(item.price)}</div>

                <div className="fav-card-actions">
                  <button
                    type="button"
                    className="fav-add-cart-btn"
                    onClick={() => dispatch(addItem(item))}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    Thêm vào giỏ
                  </button>

                  <button
                    type="button"
                    className="fav-remove-btn"
                    onClick={() => removeFavorite(item.id)}
                  >
                    Bỏ thích
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;

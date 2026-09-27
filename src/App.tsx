import { useState } from 'react';
import { mockOrders } from './data/mockData';
import { OrderAccordionList } from './components/OrderList/OrderAccordionList';
import { CartList } from './features/cart/CartList';
import { ProductList } from './features/products/ProductList';
import { FavoritesList } from './features/favorites/FavoritesList';
import { useFavoritesStore } from './features/favorites/favoritesStore';
import { useAppSelector } from './app/hooks';
import './index.css';

type TabKey = 'orders' | 'products' | 'cart' | 'favorites';

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('products');
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <div className="app-layout">
      {/* Header chính */}
      <header className="app-header">
        <div className="header-container">
          <div className="header-brand">
            <div className="brand-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="brand-title">TechShop</h1>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="main-content">
        {/* Thanh điều hướng Tab chính */}
        <nav className="nav-tabs">
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'products' ? 'nav-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span>Sản phẩm</span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'favorites' ? 'nav-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>
              Yêu thích{favoritesCount > 0 ? ` (${favoritesCount})` : ''}
            </span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'cart' ? 'nav-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>
              Giỏ hàng{cartCount > 0 ? ` (${cartCount})` : ''}
            </span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'orders' ? 'nav-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Quản lý Đơn hàng</span>
          </button>
        </nav>

        {/* Nội dung Tab */}
        <div className="tab-content-panel">
          {activeTab === 'products' && <ProductList />}

          {activeTab === 'favorites' && (
            <FavoritesList onExploreProducts={() => setActiveTab('products')} />
          )}

          {activeTab === 'cart' && <CartList />}

          {activeTab === 'orders' && <OrderAccordionList orders={mockOrders} />}
        </div>
      </main>
    </div>
  );
}

export default App;

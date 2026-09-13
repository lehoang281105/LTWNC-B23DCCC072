import { useState } from 'react';
import { mockOrders, mockProducts } from './data/mockData';
import { OrderAccordionList } from './components/OrderList/OrderAccordionList';
import { ProductList } from './components/ProductList/ProductList';
import './index.css';

export function App() {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');

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
              <h1 className="brand-title">Order Management &amp; React Design Patterns</h1>
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
            className={`nav-tab-btn ${activeTab === 'orders' ? 'nav-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Quản lý Đơn hàng (Accordion + Pagination)</span>
          </button>

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
            <span>Danh mục Sản phẩm (usePagination&lt;Product&gt;)</span>
          </button>
        </nav>

        {/* Nội dung Tab */}
        <div className="tab-content-panel">
          {activeTab === 'orders' && <OrderAccordionList orders={mockOrders} />}

          {activeTab === 'products' && <ProductList products={mockProducts} />}
        </div>
      </main>
    </div>
  );
}

export default App;

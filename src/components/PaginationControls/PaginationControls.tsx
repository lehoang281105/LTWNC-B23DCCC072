import React from 'react';
import './PaginationControls.css';

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  canNext: boolean;
  canPrev: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  itemsPerPage?: number;
  setItemsPerPage?: (size: number) => void;
  pageSizeOptions?: number[];
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
  canNext,
  canPrev,
  startIndex,
  endIndex,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  pageSizeOptions = [3, 5, 10],
}) => {
  // Tạo danh sách số trang hiển thị thông minh
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination-info">
        Hiển thị <strong>{startIndex}</strong> – <strong>{endIndex}</strong> trên{' '}
        <strong>{totalItems}</strong> mục
      </div>

      <div className="pagination-actions">
        {setItemsPerPage && itemsPerPage && (
          <div className="pagination-page-size">
            <label htmlFor="pageSizeSelect">Mục / trang:</label>
            <select
              id="pageSizeSelect"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="pagination-select"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="pagination-buttons">
          <button
            type="button"
            className="pagination-btn pagination-btn--nav"
            onClick={prevPage}
            disabled={!canPrev}
            title="Trang trước"
            aria-label="Trang trước"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Trước</span>
          </button>

          <div className="pagination-pages-list">
            {getPageNumbers().map((p, idx) => {
              if (p === '...') {
                return (
                  <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                    …
                  </span>
                );
              }
              const pageNum = p as number;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => goToPage(pageNum)}
                  className={`pagination-btn pagination-btn--number ${isActive ? 'pagination-btn--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="pagination-btn pagination-btn--nav"
            onClick={nextPage}
            disabled={!canNext}
            title="Trang kế tiếp"
            aria-label="Trang kế tiếp"
          >
            <span>Sau</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

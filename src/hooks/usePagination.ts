import { useState, useMemo, useEffect } from 'react';
export interface UsePaginationOptions<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  canNext: boolean;
  canPrev: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
}


export function usePagination<T>(
  data: T[],
  itemsPerPage: number = 5,
  initialPage: number = 1
): UsePaginationReturn<T> {
  const [pageSize, setPageSize] = useState<number>(() => Math.max(1, itemsPerPage));
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const totalItems = data.length;
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  useEffect(() => {
    if (itemsPerPage > 0 && itemsPerPage !== pageSize) {
      setPageSize(itemsPerPage);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  const goToPage = (page: number): void => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const canNext = currentPage < totalPages;
  const canPrev = currentPage > 1;


  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  return {
    currentPage,
    totalPages,
    currentData,
    nextPage,
    prevPage,
    goToPage,
    canNext,
    canPrev,
    startIndex,
    endIndex,
    totalItems,
    itemsPerPage: pageSize,
    setItemsPerPage: setPageSize,
  };
}

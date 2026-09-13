import { useState, useMemo, useEffect } from 'react';

/**
 * Interface cấu hình đầu vào cho hook usePagination
 */
export interface UsePaginationOptions<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

/**
 * Interface kết quả trả về từ hook usePagination<T>
 * Tuyệt đối không dùng kiểu `any`, đảm bảo tính toàn vẹn kiểu dữ liệu của T
 */
export interface UsePaginationReturn<T> {
  /** Trang hiện tại (1-indexed) */
  currentPage: number;
  /** Tổng số trang */
  totalPages: number;
  /** Mảng dữ liệu của trang hiện tại */
  currentData: T[];
  /** Hàm chuyển sang trang kế tiếp */
  nextPage: () => void;
  /** Hàm quay lại trang trước đó */
  prevPage: () => void;
  /** Hàm chuyển trực tiếp đến một trang cụ thể */
  goToPage: (page: number) => void;
  /** Cờ cho biết có thể next tiếp được không */
  canNext: boolean;
  /** Cờ cho biết có thể prev về trước được không */
  canPrev: boolean;
  /** Chỉ số phần tử bắt đầu của trang hiện tại (1-indexed) */
  startIndex: number;
  /** Chỉ số phần tử kết thúc của trang hiện tại (1-indexed) */
  endIndex: number;
  /** Tổng số phần tử trong toàn bộ danh sách */
  totalItems: number;
  /** Số phần tử trên một trang hiện tại */
  itemsPerPage: number;
  /** Hàm thay đổi số phần tử trên mỗi trang */
  setItemsPerPage: (count: number) => void;
}

/**
 * Custom Hook: usePagination<T>
 * 
 * Tuân thủ các nguyên tắc thiết kế hook nâng cao (Slide Buổi 2):
 * 1. Single Responsibility: Chỉ đảm nhận duy nhất việc tính toán phân trang dữ liệu.
 * 2. Generic Type an toàn: Hoạt động với mọi kiểu dữ liệu T[] mà không dùng `any`.
 * 3. Tách biệt hoàn toàn với UI: Không chứa bất kỳ thẻ JSX nào, cho phép tái sử dụng ở Table, Grid, Accordion...
 * 4. Tự động điều chỉnh: Khi mảng dữ liệu hoặc pageSize thay đổi khiến currentPage vượt quá totalPages,
 *    hook sẽ tự đưa về trang hợp lệ gần nhất.
 *
 * @param data Mảng dữ liệu kiểu T[]
 * @param itemsPerPage Số phần tử hiển thị trên mỗi trang (mặc định là 5)
 * @param initialPage Trang khởi tạo (mặc định là 1)
 */
export function usePagination<T>(
  data: T[],
  itemsPerPage: number = 5,
  initialPage: number = 1
): UsePaginationReturn<T> {
  // Đảm bảo số lượng phần tử trên mỗi trang luôn dương
  const [pageSize, setPageSize] = useState<number>(() => Math.max(1, itemsPerPage));
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const totalItems = data.length;

  // Tính tổng số trang (tối thiểu là 1 trang ngay cả khi danh sách rỗng)
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  // Đồng bộ lại pageSize nếu prop itemsPerPage từ bên ngoài thay đổi
  useEffect(() => {
    if (itemsPerPage > 0 && itemsPerPage !== pageSize) {
      setPageSize(itemsPerPage);
    }
  }, [itemsPerPage]);

  // Tự động kiểm tra và clamp currentPage nếu dữ liệu thay đổi
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Cắt mảng dữ liệu tương ứng với trang hiện tại
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  // Các hàm điều hướng trang
  const goToPage = (page: number): void => {
    // Chặn không cho vượt biên
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

  // Các cờ trạng thái kiểm tra biên
  const canNext = currentPage < totalPages;
  const canPrev = currentPage > 1;

  // Tính toán vị trí hiển thị (Ví dụ: "Hiển thị 1 - 5 của 20")
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

import { createContext, useContext } from 'react';

/**
 * Kiểu dữ liệu cho AccordionContext cấp cao nhất.
 * Tương tự TabsContextType trong slide Buổi 2 (trang 11).
 */
export interface AccordionContextType {
  /** ID của panel hiện đang được mở (null nếu không có panel nào mở) */
  activeId: string | null;
  /** Hàm chuyển đổi trạng thái: mở panel được chọn và tự động đóng panel khác */
  toggleItem: (id: string) => void;
}

/**
 * Context quản lý trạng thái mở/đóng duy nhất của Accordion.
 */
export const AccordionContext = createContext<AccordionContextType | null>(null);

/**
 * Custom Hook nội bộ để các component con truy cập AccordionContext an toàn.
 * Báo lỗi rõ ràng nếu component con không được bọc trong <Accordion>.
 */
export function useAccordionContext(): AccordionContextType {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext phải được sử dụng bên trong component <Accordion>');
  }
  return context;
}

/**
 * Kiểu dữ liệu cho AccordionItemContext cấp con.
 * Giúp Header và Body tự nhận diện được trạng thái mở/đóng của chính mình.
 */
export interface AccordionItemContextType {
  id: string;
  isOpen: boolean;
  toggle: () => void;
}

export const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

export function useAccordionItemContext(): AccordionItemContextType {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'Accordion.Header và Accordion.Body phải được bọc bên trong <Accordion.Item>'
    );
  }
  return context;
}

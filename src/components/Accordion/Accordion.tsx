import React, { useState } from 'react';
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from './AccordionContext';
import './Accordion.css';

// -------------------------------------------------------------
// 1. Component cha: Accordion (Quản lý trạng thái mở/đóng duy nhất)
// -------------------------------------------------------------
export interface AccordionProps {
  /** ID của panel mở mặc định ban đầu */
  defaultOpenId?: string | null;
  /** Cho phép click lại vào panel đang mở để đóng nó lại hay không (mặc định: true) */
  collapsible?: boolean;
  /** Các Accordion.Item con */
  children: React.ReactNode;
  /** Lớp CSS tùy biến */
  className?: string;
}

export function Accordion({
  defaultOpenId = null,
  collapsible = true,
  children,
  className = '',
}: AccordionProps) {
  // State lưu id của panel đang mở. Vì chỉ mở 1 panel tại 1 thời điểm, ta dùng string | null
  const [activeId, setActiveId] = useState<string | null>(defaultOpenId);

  const toggleItem = (id: string) => {
    setActiveId((prevId) => {
      // Nếu đang mở panel này và cho phép collapsible, click lại sẽ đóng
      if (prevId === id && collapsible) {
        return null;
      }
      // Mở panel mới được click -> tự động làm panel cũ trước đó bị đóng
      return id;
    });
  };

  return (
    <AccordionContext.Provider value={{ activeId, toggleItem }}>
      <div className={`accordion-container ${className}`.trim()}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// -------------------------------------------------------------
// 2. Component con: AccordionItem (Bọc từng panel với id cụ thể)
// -------------------------------------------------------------
export interface AccordionItemProps {
  /** Định danh duy nhất của panel */
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({
  value,
  children,
  className = '',
}: AccordionItemProps) {
  const { activeId, toggleItem } = useAccordionContext();
  const isOpen = activeId === value;

  const toggle = () => {
    toggleItem(value);
  };

  return (
    <AccordionItemContext.Provider value={{ id: value, isOpen, toggle }}>
      <div
        className={`accordion-item ${isOpen ? 'accordion-item--open' : ''} ${className}`.trim()}
        data-state={isOpen ? 'open' : 'closed'}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// -------------------------------------------------------------
// 3. Component con: AccordionHeader (Nút bấm mở/đóng tiêu đề)
// -------------------------------------------------------------
export interface AccordionHeaderProps {
  children: React.ReactNode;
  className?: string;
  /** Icon phụ tùy chỉnh hoặc ẩn icon chevron mặc định */
  showChevron?: boolean;
}

export function AccordionHeader({
  children,
  className = '',
  showChevron = true,
}: AccordionHeaderProps) {
  const { isOpen, toggle } = useAccordionItemContext();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={isOpen}
      className={`accordion-header ${isOpen ? 'accordion-header--active' : ''} ${className}`.trim()}
    >
      <div className="accordion-header-content">{children}</div>
      {showChevron && (
        <span
          className={`accordion-chevron ${isOpen ? 'accordion-chevron--rotated' : ''}`}
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      )}
    </button>
  );
}

// -------------------------------------------------------------
// 4. Component con: AccordionBody (Vùng nội dung hiển thị khi mở)
// -------------------------------------------------------------
export interface AccordionBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionBody({
  children,
  className = '',
}: AccordionBodyProps) {
  const { isOpen, id } = useAccordionItemContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="region"
      aria-labelledby={`accordion-header-${id}`}
      className={`accordion-body ${className}`.trim()}
    >
      <div className="accordion-body-inner">{children}</div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. Gắn các component con vào Accordion theo Compound Component Pattern
//    Hỗ trợ cả tên gọi .Item, .Header, .Body và alias .Panel, .Content
// -------------------------------------------------------------
Accordion.Item = AccordionItem;
Accordion.Panel = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Title = AccordionHeader;
Accordion.Body = AccordionBody;
Accordion.Content = AccordionBody;

export default Accordion;

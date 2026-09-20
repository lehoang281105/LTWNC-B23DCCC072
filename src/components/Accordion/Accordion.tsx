import React, { useState } from 'react';
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from './AccordionContext';
import './Accordion.css';


export interface AccordionProps {
  defaultOpenId?: string | null;
  collapsible?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  defaultOpenId = null,
  collapsible = true,
  children,
  className = '',
}: AccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultOpenId);

  const toggleItem = (id: string) => {
    setActiveId((prevId) => {
      if (prevId === id && collapsible) {
        return null;
      }
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


export interface AccordionItemProps {
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

export interface AccordionHeaderProps {
  children: React.ReactNode;
  className?: string;
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

Accordion.Item = AccordionItem;
Accordion.Panel = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Title = AccordionHeader;
Accordion.Body = AccordionBody;
Accordion.Content = AccordionBody;

export default Accordion;

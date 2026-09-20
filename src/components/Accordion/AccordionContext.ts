import { createContext, useContext } from 'react';

export interface AccordionContextType {
  activeId: string | null;
  toggleItem: (id: string) => void;
}

export const AccordionContext = createContext<AccordionContextType | null>(null);

export function useAccordionContext(): AccordionContextType {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext phải được sử dụng bên trong component <Accordion>');
  }
  return context;
}

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

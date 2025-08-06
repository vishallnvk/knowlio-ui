"use client";

import React, { createContext, useState, useCallback, ReactNode } from "react";

interface SupportModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const SupportModalContext = createContext<SupportModalState | null>(null);

interface SupportModalProviderProps {
  children: ReactNode;
}

export default function SupportModalProvider({ children }: SupportModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const contextValue: SupportModalState = {
    isOpen,
    openModal,
    closeModal,
  };

  return (
    <SupportModalContext.Provider value={contextValue}>
      {children}
    </SupportModalContext.Provider>
  );
}

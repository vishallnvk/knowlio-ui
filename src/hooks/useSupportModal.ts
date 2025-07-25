"use client";

import { useState, useCallback } from "react";

interface SupportModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// Global state for the support modal
let globalModalState: SupportModalState | null = null;
let subscribers: Array<(state: SupportModalState) => void> = [];

const createModalState = (): SupportModalState => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
    // Notify all subscribers
    subscribers.forEach(callback => callback({ isOpen: true, openModal, closeModal }));
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Notify all subscribers
    subscribers.forEach(callback => callback({ isOpen: false, openModal, closeModal }));
  }, []);

  return { isOpen, openModal, closeModal };
};

export const useSupportModal = (): SupportModalState => {
  const [state, setState] = useState<SupportModalState>(() => {
    if (!globalModalState) {
      globalModalState = createModalState();
    }
    return globalModalState;
  });

  // Subscribe to global state changes
  useState(() => {
    const updateState = (newState: SupportModalState) => {
      setState(newState);
    };
    
    subscribers.push(updateState);
    
    return () => {
      subscribers = subscribers.filter(sub => sub !== updateState);
    };
  });

  return state;
};

// Simple implementation for global access
export const openSupportModal = () => {
  if (globalModalState) {
    globalModalState.openModal();
  }
};

export const closeSupportModal = () => {
  if (globalModalState) {
    globalModalState.closeModal();
  }
};

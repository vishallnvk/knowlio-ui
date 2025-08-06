"use client";

import { useContext } from "react";
import { SupportModalContext } from "../components/Support/SupportModalProvider";

interface SupportModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSupportModal = (): SupportModalState => {
  const context = useContext(SupportModalContext);
  
  if (!context) {
    throw new Error("useSupportModal must be used within a SupportModalProvider");
  }
  
  return context;
};

// Export global functions for convenience (these will work through context)
export const openSupportModal = () => {
  // This will be handled by components that use the hook
  console.warn("openSupportModal should be called from within a component using useSupportModal hook");
};

export const closeSupportModal = () => {
  // This will be handled by components that use the hook
  console.warn("closeSupportModal should be called from within a component using useSupportModal hook");
};

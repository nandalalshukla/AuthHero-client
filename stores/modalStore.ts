import { create } from "zustand";

interface ModalState {
  showLogin: boolean;
  showSignup: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  openSignup: () => void;
  closeSignup: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showLogin: false,
  showSignup: false,
  openLogin: () => set({ showLogin: true, showSignup: false }),
  closeLogin: () => set({ showLogin: false }),
  openSignup: () => set({ showSignup: true, showLogin: false }),
  closeSignup: () => set({ showSignup: false }),
}));

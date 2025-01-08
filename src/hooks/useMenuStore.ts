import { create } from "zustand";

interface menuState {
  menu: string | null;
  setMenu: (menu: string | null) => void;
}

const useMenuStore = create<menuState>((set) => ({
  menu: null,
  setMenu: (menu) => set({ menu }),
}));

export default useMenuStore;
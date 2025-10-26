import { create } from "zustand";



type GlobalState = {
  category: string;
  restaurant: string;
  setCategory: (value: string) => void;
  setRestaurant: (value: string) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  category: "",
  restaurant: "",
  setCategory: (value) => set({ category: value }),
  setRestaurant: (value) => set({ restaurant: value }),
}));

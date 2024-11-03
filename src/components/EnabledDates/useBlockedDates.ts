// store/useBlockedDates.js
import { create } from 'zustand';


export const generateUniqueId = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
  const r = (Math.random() * 16) | 0;
  const v = c === "x" ? r : (r & 0x3) | 0x8;
  return v.toString(16);
  }); 
};

const useBlockedDatesStore = create((set) => ({
  enabledDates: [],

  // Agrega un rango de fechas habilitadas
  addEnabledDate: (range) =>
    set((state) => ({
      enabledDates: [...state.enabledDates, range],
    })),

  // Elimina un rango de fechas habilitadas por índice
  removeEnabledDate: (index) =>
    set((state) => ({
      enabledDates: state.enabledDates.filter((_, i) => i !== index),
    })),
}));

export default useBlockedDatesStore;

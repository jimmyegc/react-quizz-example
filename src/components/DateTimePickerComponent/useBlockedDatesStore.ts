// store/useBlockedDates.js
import {create} from 'zustand';

const useBlockedDatesStore = create((set) => ({
  blockedDates: [],
  addBlockedDate: (dateRange) =>
    set((state) => ({
      blockedDates: [...state.blockedDates, dateRange],
    })),
  removeBlockedDate: (index) =>
    set((state) => ({
      blockedDates: state.blockedDates.filter((_, i) => i !== index),
    })),
    // Habilitar un bloque de fechas cambiando su estado a "enabled"
  enableBlockedDate: (id) =>
    set((state) => ({
      blockedDates: state.blockedDates.map((date) =>
        date.id === id ? { ...date, status: "enabled" } : date
      )
    })),
}));

export default useBlockedDatesStore;

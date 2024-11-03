import { create } from 'zustand';

export const generateUniqueId = (): string => {
  return (
    Date.now().toString(36) + // Timestamp en base 36
    Math.random().toString(36).substring(2, 10) // Parte aleatoria en base 36
  );
};

export const useEnabledDatesStore = create((set) => ({
  enabledDates: [],

  setEnabledDate: (dateRange) =>
    set((state) => {
      const existingIndex = state.enabledDates.findIndex(date => date.id === dateRange.id);
      if (existingIndex !== -1) {
        // Actualizar la fecha si ya existe
        const updatedDates = [...state.enabledDates];
        updatedDates[existingIndex] = dateRange; // Reemplazar el objeto existente
        return { enabledDates: updatedDates };
      }
      // Agregar nueva fecha si no existe
      return { enabledDates: [...state.enabledDates, dateRange] };
    }),

  removeEnabledDate: (id) =>
      set((state) => ({
        enabledDates: state.enabledDates.filter((date) => date.id !== id),
      })),

  loadEnabledDates: (dates) => 
    set({ enabledDates: dates }),  
}));

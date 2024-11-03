import { create } from 'zustand';

export const generateUniqueId = (): string => {
  return (
    Date.now().toString(36) + // Timestamp en base 36
    Math.random().toString(36).substring(2, 10) // Parte aleatoria en base 36
  );
};

const useBlockedDatesStore = create((set) => ({
  blockedDates: [],

  // Agregar o actualizar una fecha bloqueada
  setBlockedDate: (dateRange) =>
    set((state) => {
      const existingIndex = state.blockedDates.findIndex(date => date.id === dateRange.id);
      if (existingIndex !== -1) {
        // Actualizar la fecha si ya existe
        const updatedDates = [...state.blockedDates];
        updatedDates[existingIndex] = dateRange; // Reemplazar el objeto existente
        return { blockedDates: updatedDates };
      }
      // Agregar nueva fecha si no existe
      return { blockedDates: [...state.blockedDates, dateRange] };
    }),

  // Eliminar una fecha bloqueada
  removeBlockedDate: (id) =>
    set((state) => ({
      blockedDates: state.blockedDates.filter((date) => date.id !== id),
    })),

  // Cargar fechas bloqueadas desde una configuración inicial
  loadBlockedDates: (dates) => 
    set({ blockedDates: dates }),
}));

export default useBlockedDatesStore;

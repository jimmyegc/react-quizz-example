import { create } from 'zustand';

export const generateUniqueId = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
  const r = (Math.random() * 16) | 0;
  const v = c === "x" ? r : (r & 0x3) | 0x8;
  return v.toString(16);
  }); 
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

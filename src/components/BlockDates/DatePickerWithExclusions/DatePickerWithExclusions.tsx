import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useBlockedDatesStore, { generateUniqueId } from '../useBlockedDates';
import { disabledDays } from '../BlockDatesMock';

export const DatePickerWithExclusions = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { blockedDates, loadBlockedDates, setBlockedDate } = useBlockedDatesStore();

  // Convierte los rangos bloqueados en fechas individuales para excluir
  const getExcludedDates = () => {
    const excludedDates = [];
    blockedDates.forEach((range) => {
      if (range.status === "disabled") { // Solo considerar días deshabilitados
        const rawDates = range.rawDate.split('@'); // Separar las fechas
        const startDate = new Date(rawDates[0].trim()); // Primera fecha
        const endDate = new Date(rawDates[1].trim()); // Segunda fecha
        const currentDate = startDate;
        while (currentDate <= endDate) {
          excludedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });
    return excludedDates;
  };



  useEffect(() => {
    // Cargar las fechas bloqueadas desde la configuración inicial
    loadBlockedDates(disabledDays.objConf.disabledDays);
  }, [loadBlockedDates]);

  // Ejemplo de cómo habilitar un bloque de fecha cuando se seleccione
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const id = generateUniqueId() /* tu lógica para determinar el ID correspondiente */;
      // Habilitar la fecha seleccionada (puedes ajustar esto según tus necesidades)
      setBlockedDate({
        id,
        rawDate: date.toString(),
        humanDate: `(${date.toLocaleDateString()})`, // Formato humano simple
        status: "enabled"
      });
    }
  };

  return (
    <div>
      <h2>Seleccionar Fecha</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        excludeDates={getExcludedDates()}
        placeholderText="Selecciona una fecha"
      />      
    </div>
  );
};

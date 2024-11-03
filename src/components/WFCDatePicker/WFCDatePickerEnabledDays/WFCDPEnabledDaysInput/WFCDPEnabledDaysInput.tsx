
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enabledDays } from '../../../BlockDates/BlockDatesMock'
import { useEnabledDatesStore } from '../useEnabledDates'

export const WFCDPEnabledDaysInput = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { enabledDates, loadEnabledDates } = useEnabledDatesStore();

  // Genera un array de fechas permitidas a partir de los rangos habilitados
  const getEnabledDates = () => {
    const includedDates = [];
    if(!enabledDates) return
    enabledDates.forEach((range) => {
      if (range.status === "enabled") { // Solo considerar días habilitados
        const rawDates = range.rawDate.split('@'); // Separar las fechas
        const startDate = new Date(rawDates[0].trim()); // Primera fecha
        const endDate = new Date(rawDates[1].trim()); // Segunda fecha

        let currentDate = startDate;
        while (currentDate <= endDate) {
          includedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });
    return includedDates;
  };
  
  useEffect(() => {    
    loadEnabledDates(enabledDays.objConf.enabledDays); // Ajusta para cargar los días habilitados
  }, [loadEnabledDates]);

  return (
    <div>
      <h2>Seleccionar Fecha</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        includeDates={getEnabledDates()} // Incluir fechas habilitadas
        placeholderText="Selecciona una fecha habilitada"
      />      
    </div>
  );
};

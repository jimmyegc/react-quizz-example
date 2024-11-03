import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useBlockedDatesStore from '../../BlockDates/useBlockedDates';
import { enabledDays } from '../../BlockDates/BlockDatesMock'
export const DatePickerWithEnabledDates = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { blockedDates, loadBlockedDates } = useBlockedDatesStore();

  // Genera un array de fechas permitidas a partir de los rangos habilitados
  const getEnabledDates = () => {
    const includedDates = [];
    if(!blockedDates) return
    blockedDates.forEach((range) => {
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

  // Cargar días habilitados desde la configuración al montar el componente
  useEffect(() => {    
    loadBlockedDates(enabledDays.objConf.enabledDays); // Ajusta para cargar los días habilitados
  }, [loadBlockedDates]);

  return (
    <div>
      <h2>Seleccionar Fecha Habilitada</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        includeDates={getEnabledDates()} // Incluir fechas habilitadas
        placeholderText="Selecciona una fecha habilitada"
      />
      <pre>
      {JSON.stringify(blockedDates,null,2)}
      </pre>
    </div>
  );
};

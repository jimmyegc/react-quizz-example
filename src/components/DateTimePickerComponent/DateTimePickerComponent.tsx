// DateTimePickerComponent.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useBlockedDatesStore from './useBlockedDatesStore';

export const DateTimePickerComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { blockedDates, addBlockedDate, removeBlockedDate } = useBlockedDatesStore();

  // Convierte los rangos bloqueados en fechas individuales para excluir
  const getExcludedDates = () => {
    const excludedDates = [];
    blockedDates.forEach((range) => {
      let currentDate = new Date(range.start);
      while (currentDate <= range.end) {
        excludedDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return excludedDates;
  };

  const handleAddDateRange = () => {
    if (startDate && endDate) {
      addBlockedDate({ start: startDate, end: endDate });
      setStartDate(null);
      setEndDate(null);
    } else {
      alert("Por favor, selecciona una fecha de inicio y fin.");
    }
  };

  return (
    <div>
      <h2>Selecciona un día o un rango de días para bloquear</h2>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          excludeDates={getExcludedDates()}
          placeholderText="Fecha de inicio"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          excludeDates={getExcludedDates()}
          placeholderText="Fecha de fin"
        />
        <button onClick={handleAddDateRange}>Bloquear Rango</button>
      </div>

      <h3>Fechas Bloqueadas</h3>
      <ul>
        {blockedDates.map((range, index) => (
          <li key={index}>
            {range.start.toLocaleDateString()} - {range.end.toLocaleDateString()}
            <button onClick={() => removeBlockedDate(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};



import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useBlockedDatesStore from '../../BlockDates/useBlockedDates';
import { enabledDatesMock } from '../../BlockDates/BlockDatesMock'; // Asegúrate de importar tu mock de configuración
import { generateUniqueId } from '../useBlockedDates';

export const EnabledDaysConfigurator = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { blockedDates, addEnabledDate, removeBlockedDate, loadBlockedDates, setBlockedDate } = useBlockedDatesStore();
  

  const handleAddEnabledRange = () => {
    if (startDate && endDate) {
      const id = generateUniqueId();
      const rawDate = `${startDate.toString()}@${endDate.toString()}`;
      const humanDate = `(${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`;
      
      // Usar setBlockedDate para agregar un nuevo rango de fechas bloqueadas
      setBlockedDate({
        id,
        rawDate,
        humanDate,
        status: "enabled" // Cambia el estado a "disabled" al agregar un rango
      });
      
      setStartDate(null);
      setEndDate(null);
    } else {
      alert("Por favor, selecciona una fecha de inicio y fin.");
    }
  };

  // Cargar días habilitados desde la configuración al montar el componente
  useEffect(() => {
    //loadBlockedDates(enabledDatesMock.objConf.enabledDays); // Ajusta para cargar los días habilitados
  }, [loadBlockedDates]);

  // Formato de fecha legible
  const formatDate = (date) => date.toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div>
      <h2>Configurar Días Habilitados</h2>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Fecha de inicio"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Fecha de fin"
        />
        <button onClick={handleAddEnabledRange}>Habilitar Rango</button>
      </div>

      <h3>Días Habilitados</h3>
      <ul>
        {blockedDates.filter(range => range.status === "enabled").map((range, index) => (
          <li key={index}>
            {formatDate(new Date(range.rawDate.split('@')[0]))} - {formatDate(new Date(range.rawDate.split('@')[1]))}
            <button onClick={() => removeBlockedDate(range.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

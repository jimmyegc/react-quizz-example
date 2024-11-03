import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enabledDays } from '../../../BlockDates/BlockDatesMock'; // Asegúrate de importar tu mock de configuración
import { generateUniqueId, useEnabledDatesStore } from '../useEnabledDates';



export const WFCDPEnabledDaysConfig = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //const { blockedDates, addEnabledDate, removeBlockedDate, loadBlockedDates, setBlockedDate } = useBlockedDatesStore();
  const { enabledDates, setEnabledDate, removeEnabledDate, loadEnabledDates } = useEnabledDatesStore()

  

  const handleAddEnabledRange = () => {
    if (startDate && endDate) {
      const id = generateUniqueId();
      const rawDate = `${startDate.toString()}@${endDate.toString()}`;
      const humanDate = `(${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`;
      
      // Usar setBlockedDate para agregar un nuevo rango de fechas bloqueadas
      setEnabledDate({
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
    loadEnabledDates(enabledDays.objConf.enabledDays)
  }, [loadEnabledDates]);

  // Formato de fecha legible
  const formatDate = (date) => date.toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div>
      <h2>Habilitar Días</h2>
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
        
        {enabledDates.filter(range => range.status === "enabled")
        .sort((a, b) => new Date(a.rawDate.split('@')[0]) - new Date(b.rawDate.split('@')[0])) // Ordena de menor a mayor por fecha de inicio
        .map((range, index) => (
          <li key={index}>            
            {formatDate(new Date(range.rawDate.split('@')[0]))} - {formatDate(new Date(range.rawDate.split('@')[1]))}
            <button onClick={() => removeEnabledDate(range.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {/* {JSON.stringify(enabledDates)} */}
    </div>
  );
};

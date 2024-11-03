import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useBlockedDatesStore, { generateUniqueId } from '../useBlockedDates';
import { enabledDays } from '../../../BlockDates/BlockDatesMock'

export const WFCDPBlockedDaysConfig = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { blockedDates, setBlockedDate, removeBlockedDate, loadBlockedDates } = useBlockedDatesStore();

  const handleAddDateRange = () => {
    if (startDate && endDate) {
      const id = generateUniqueId();
      const rawDate = `${startDate.toString()}@${endDate.toString()}`;
      const humanDate = `(${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`;      
      // Usar setBlockedDate para agregar un nuevo rango de fechas bloqueadas
      setBlockedDate({
        id,
        rawDate,
        humanDate,
        status: "disabled" // Cambia el estado a "disabled" al agregar un rango
      });
      
      setStartDate(null);
      setEndDate(null);
    } else {
      alert("Por favor, selecciona una fecha de inicio y fin.");
    }
  };

  useEffect(() => {
    loadBlockedDates(enabledDays.objConf.enabledDays); // Ajusta para cargar los días habilitados
  }, [loadBlockedDates]);

  // Formato de fecha como "DD MMM YYYY" (ej. "02 Nov 2024")
  const formatDate = (date) => date.toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div>
      <h2>Bloqueo de días</h2>
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
        <button onClick={handleAddDateRange}>Bloquear Rango</button>
      </div>

      <h3>Fechas Bloqueadas</h3>
      <ul>
        {blockedDates.filter(range => range.status === "disabled")
        .sort((a, b) => new Date(a.rawDate.split('@')[0]) - new Date(b.rawDate.split('@')[0])) // Ordena de menor a mayor por fecha de inicio
        .map((range, index) => (
          <li key={index}>
            {formatDate(new Date(range.rawDate.split('@')[0]))} - {formatDate(new Date(range.rawDate.split('@')[1]))}
            <button onClick={() => removeBlockedDate(range.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
     {/*  {JSON.stringify(blockedDates)} */}
    </div>
  );
};

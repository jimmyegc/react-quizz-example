import { useState } from 'react'
import './App.css'
//import { BlockDateConfigurator } from './components/BlockDates/BlockDateConfigurator/BlockDateConfigurator'
//import { DatePickerWithExclusions } from './components/BlockDates/DatePickerWithExclusions/DatePickerWithExclusions'

//import { AnimationComponent } from './components/Animation/AnimationComponent'
//import { DateTimePickerComponent } from './components/DateTimePickerComponent/DateTimePickerComponent'
//import { DatePickerWithEnabledDates } from './components/EnabledDates/DatePickerWithEnabledDates/DatePickerWithEnabledDates'
//import { EnabledDaysConfigurator } from './components/EnabledDates/EnabledDaysConfigurator/EnabledDaysConfigurator'
//import { Quiz } from './components/Quiz/Quiz'
/*import { Quizz } from './components/Quizz/Quizz'
import { WFCDPBlockedDaysConfig } from './components/WFCDatePicker/WFCDatePickerBlockedDays/WFCDPBlockedDaysConfig/WFCDPBlockedDaysConfig'
import { WFCDPBlockedDaysInput } from './components/WFCDatePicker/WFCDatePickerBlockedDays/WFCDPBlockedDaysInput/WFCDPBlockedDaysInput'
import { WFCDPEnabledDaysConfig } from './components/WFCDatePicker/WFCDatePickerEnabledDays/WFCDPEnabledDaysConfig/WFCDPEnabledDaysConfig'
import { WFCDPEnabledDaysInput } from './components/WFCDatePicker/WFCDatePickerEnabledDays/WFCDPEnabledDaysInput/WFCDPEnabledDaysInput'
*/
import { DatesByDays, OperationDay, Schedule } from './components/DatesByDays/DatesByDays'


const initialOperationDays: OperationDay[] = [
  /*{ day: 1, initialHour: '08:00', finalHour: '12:00', format: '24' },
  { day: 2, initialHour: '09:00', finalHour: '05:00', format: '12' },
  { day: 3, initialHour: '08:30', finalHour: '03:15', format: '12' },*/  
];

function App() {

  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleDaysChange = (updatedSchedules: Schedule[]) => {
      setSchedules(updatedSchedules);
      console.log('Updated Schedules:', updatedSchedules);
  };

  const [timeFormat, setTimeFormat] = useState(false)

  return (
    <div>
      {/* <Quizz />
      <AnimationComponent /> 
      <Quiz />       
      <DateTimePickerComponent />
      <div>
        <h1>Gestión de Fechas Bloqueadas</h1>
        <BlockDateConfigurator /> 
        <DatePickerWithExclusions />
      </div>
      <div>
        <h1>Gestión de Días Habilitados</h1>
        <EnabledDaysConfigurator />
        <DatePickerWithEnabledDates />  
      </div>
      <WFCDPBlockedDaysConfig />
      <WFCDPBlockedDaysInput />
      <hr />
      <WFCDPEnabledDaysConfig />
      <WFCDPEnabledDaysInput /> 
      */}
       <div style={{ padding: '20px' }}>
          <button onClick={()=> setTimeFormat(!timeFormat)}>{timeFormat ? '12hrs' : '24hrs'} </button>
            <h1>Configura los Horarios</h1>
            <DatesByDays 
                label="Selecciona los días y horarios"
                isRequiredActivated={true}
                operationDays={initialOperationDays}
                onChangeDays={handleDaysChange}
                timeFormat={timeFormat ? '12' : '24'} // Cambia a "24" para formato de 24 horas
            />
            {/* <div style={{ marginTop: '20px' }}>
                <h2>Resumen de Horarios Seleccionados:</h2>
                <ul>
                    {schedules.map((schedule) => (
                        <li key={schedule.day}>
                            {schedule.dayName}: {schedule.startHour}:{schedule.startMinus || '00'} - {schedule.endHour}:{schedule.endMinus || '00'}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
     </div>
  )
}

export default App

import './App.css'
import { BlockDateConfigurator } from './components/BlockDates/BlockDateConfigurator/BlockDateConfigurator'
import { DatePickerWithExclusions } from './components/BlockDates/DatePickerWithExclusions/DatePickerWithExclusions'
//import { AnimationComponent } from './components/Animation/AnimationComponent'
//import { DateTimePickerComponent } from './components/DateTimePickerComponent/DateTimePickerComponent'
import { DatePickerWithEnabledDates } from './components/EnabledDates/DatePickerWithEnabledDates/DatePickerWithEnabledDates'
import { EnabledDaysConfigurator } from './components/EnabledDates/EnabledDaysConfigurator/EnabledDaysConfigurator'
//import { Quiz } from './components/Quiz/Quiz'
import { Quizz } from './components/Quizz/Quizz'
import { WFCDPBlockedDaysConfig } from './components/WFCDatePicker/WFCDatePickerBlockedDays/WFCDPBlockedDaysConfig/WFCDPBlockedDaysConfig'
import { WFCDPBlockedDaysInput } from './components/WFCDatePicker/WFCDatePickerBlockedDays/WFCDPBlockedDaysInput/WFCDPBlockedDaysInput'
import { WFCDPEnabledDaysConfig } from './components/WFCDatePicker/WFCDatePickerEnabledDays/WFCDPEnabledDaysConfig/WFCDPEnabledDaysConfig'
import { WFCDPEnabledDaysInput } from './components/WFCDatePicker/WFCDatePickerEnabledDays/WFCDPEnabledDaysInput/WFCDPEnabledDaysInput'

function App() {

  
  

  return (
    <div>
      <Quizz />
      {/* <AnimationComponent /> 
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
      </div>*/}

      <WFCDPBlockedDaysConfig />
      <WFCDPBlockedDaysInput />
      <hr />
      <WFCDPEnabledDaysConfig />
      <WFCDPEnabledDaysInput /> 
     </div>
  )
}

export default App

import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { DaysSelector } from './components/DaysSelector/DaysSelector';
import { InputsSchedule } from './components/InputsSchedule/InputsSchedule';
import { ScheduleList } from './components/ScheduleList/ScheduleList';
import { OperationDay } from './RequestCampaigns';
import { useHourInput, useMinusInput } from '../../utils/index.hooks.utils';

export const DatesByDays = ({
    label,
    isRequiredActivated,
    operationDays,
    onChangeDays,
    timeFormat = '24'
}: {
    label: string;
    isRequiredActivated: boolean;
    operationDays: OperationDay[];
    onChangeDays: (schedules: Schedule[]) => void;
    timeFormat?: '12' | '24'; // Nueva prop para cambiar el formato de hora
}) => {

    const [days, setDays] = useState<Schedule[]>(operationDayToSchedule([], timeFormat));
    const [daySelected, setDaySelected] = useState('');
    const startHour = useHourInput('');
    const startMinus = useMinusInput('');
    const endHour = useHourInput('');
    const endMinus = useMinusInput('');
    const [inputScheduleError, setInputScheduleError] = useState<undefined|string>(undefined);

    const selectDayHandler = (day: string) => {
        setDaySelected(day);
    };

    const addSchedulesHandler = (error: string, newStateDays: Schedule[]) => {
        if (error === '') {
            setDaySelected('');
            setDays(newStateDays);
        }
        setInputScheduleError(error);
    };

    const removeSchedulesHandler = (daySelectedId: string) => {
        const newStateDays = [...days.map<Schedule>(d => ({ ...d }))];
        const daySelectedOfArray = newStateDays.find(d => d.day === daySelectedId);
        daySelectedOfArray.hasSchedule = false;
        delete daySelectedOfArray.startHour;
        delete daySelectedOfArray.startMinus;
        delete daySelectedOfArray.endHour;
        delete daySelectedOfArray.endMinus;
        setDays(newStateDays);
    };

    useEffect(() => {
        startHour.resetValue('');
        startMinus.resetValue('');
        endHour.resetValue('');
        endMinus.resetValue('');
        onChangeDays(days.filter(d => d.hasSchedule));
    }, [days]);

    useEffect(() => {
        if (operationDays.length > 0) {
            setDays(operationDayToSchedule(operationDays, timeFormat));
        }
    }, [operationDays, timeFormat]); // Agregamos `timeFormat` como dependencia

    return (
        <div className={styles.datesByDays}>
            <label>{label}</label>
            <DaysSelector 
                daySelected={daySelected} days={days} 
                isRequiredActivated={isRequiredActivated} onSelectDay={selectDayHandler}
            />
            <InputsSchedule 
                days={days}
                daySelected={daySelected} 
                startHour={startHour} startMinus={startMinus}
                endHour={endHour} endMinus={endMinus}
                onAddSchedules={addSchedulesHandler}
                timeFormat={timeFormat}
            />
            {inputScheduleError !== '' && <label className={styles.advertRequired}>{inputScheduleError}</label>}
            <ScheduleList 
                days={days} 
                onRemoveSchedules={removeSchedulesHandler} 
                timeFormat={timeFormat}
            />
        </div>
    );
};

export interface Schedule {
    dayNumber: number;
    day: string;
    dayName: string;
    hasSchedule: boolean;
    startHour?: string;
    startMinus?: string;
    endHour?: string;
    endMinus?: string;
}

const formatTo12Hour = (hour: string): [string, string] => {
    let [h, m] = hour.split(':');
    const isPM = parseInt(h, 10) >= 12;
    h = (parseInt(h, 10) % 12 || 12).toString();
    const period = isPM ? 'PM' : 'AM';
    return [`${h}:${m}`, period];
};

export const operationDayToSchedule = (operationDays: OperationDay[], timeFormat: '12' | '24'): Schedule[] => {
    const daysInit: Schedule[] = [
        { day: 'Lun', dayNumber: 1, dayName: 'Lunes', hasSchedule: false },
        { day: 'Mar', dayNumber: 2, dayName: 'Martes', hasSchedule: false },
        { day: 'Mi', dayNumber: 3, dayName: 'Miercoles', hasSchedule: false },
        { day: 'Jue', dayNumber: 4, dayName: 'Jueves', hasSchedule: false },
        { day: 'Vie', dayNumber: 5, dayName: 'Viernes', hasSchedule: false },
        { day: 'Sab', dayNumber: 6, dayName: 'Sabado', hasSchedule: false },
        { day: 'Dom', dayNumber: 7, dayName: 'Domingo', hasSchedule: false }
    ];

    return daysInit.map(d => {
        const operationDay = operationDays.find(o => o.day === d.dayNumber);
        
        if (operationDay) {
            let [startHour, startMinus] = operationDay.initialHour.split(':');
            let [endHour, endMinus] = operationDay.finalHour.split(':');

            if (timeFormat === '12') { 
                [startHour, startMinus] = formatTo12Hour(`${startHour}:${startMinus}`);
                [endHour, endMinus] = formatTo12Hour(`${endHour}:${endMinus}`);
            }

            return {
                ...d,
                startHour,
                startMinus,
                endHour,
                endMinus,
                hasSchedule: true
            };
        }

        return d;
    });
};

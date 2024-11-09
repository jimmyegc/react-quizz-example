import styles from '../../styles.module.scss';
import { Schedule } from "../../DatesByDays";
/* import { IconFortAwesome } from '../../../index.components'; */

export const ScheduleList = ({
    days,
    onRemoveSchedules,
    timeFormat = '24' // Nueva prop para especificar el formato de hora
}: {
    days: Schedule[];
    onRemoveSchedules: (daySelectedId: string) => void;
    timeFormat?: '12' | '24'; // Especifica si es en formato de 12 o 24 horas
}) => {

    const formatHourDisplay = (hour: string | undefined, minus: string | undefined) => {
        if (!hour || !minus) return '';

        let hourInt = parseInt(hour, 10);
        const minute = parseInt(minus, 10).toString().padStart(2, '0');

        if (timeFormat === '12') {
            const isPM = hourInt >= 12;
            hourInt = hourInt % 12 || 12; // Convierte a 12 horas
            return `${hourInt}:${minute} ${isPM ? 'PM' : 'AM'}`;
        }
        
        return `${hour}:${minute}`; // Formato de 24 horas
    };

    return (
        <div className={styles.listSchedules}>
            {
                days
                    .filter(d => d.hasSchedule)
                    .map(d => (
                        <div key={d.day} className={styles.schedulesItem}>
                            <li>
                                <b>{d.dayName}:</b> {formatHourDisplay(d.startHour, d.startMinus)} a {formatHourDisplay(d.endHour, d.endMinus)}
                                {/* <IconFortAwesome icon='fa fa-close' onClick={() => onRemoveSchedules(d.day)} /> */}
                            </li>
                        </div>
                    ))
            }
        </div>
    );
};

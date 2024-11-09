import styles from '../../styles.module.scss';
import { HourInputProps, MinusInputProps } from '../../../../utils/index.hooks.utils';
import { formatTimeHour, formatTimeMinus } from '../../../../utils/tools';
import { Schedule } from '../../DatesByDays';
import { useState } from 'react';

export const InputsSchedule = ({
    daySelected,
    days,
    startHour,
    endHour,
    startMinus,
    endMinus,
    onAddSchedules,
    timeFormat = '24' // Nueva prop para especificar el formato de hora
}: {
    daySelected: string;
    days: Schedule[];
    startHour: HourInputProps;
    startMinus: MinusInputProps;
    endHour: HourInputProps;
    endMinus: MinusInputProps;
    onAddSchedules: (error: string, newStateDays: Schedule[]) => void;
    timeFormat?: '12' | '24'; // Especifica si es en formato de 12 o 24 horas
}) => {

    const [startPeriod, setStartPeriod] = useState('AM'); // Estado para AM/PM en hora de inicio
    const [endPeriod, setEndPeriod] = useState('AM');     // Estado para AM/PM en hora de fin

    const addSchedulesHandler = () => {
        const paramsValid = !(startHour.props.value === '' ||
            startMinus.props.value === '' ||
            endHour.props.value === '' ||
            endMinus.props.value === '');

        let startHourValue = parseInt(startHour.props.value);
        let endHourValue = parseInt(endHour.props.value);

        // Ajusta las horas en formato de 12 horas si es necesario
        if (timeFormat === '12') {
            if (startPeriod === 'PM' && startHourValue < 12) startHourValue += 12;
            if (startPeriod === 'AM' && startHourValue === 12) startHourValue = 0;
            if (endPeriod === 'PM' && endHourValue < 12) endHourValue += 12;
            if (endPeriod === 'AM' && endHourValue === 12) endHourValue = 0;
        }

        const minusStart = startHourValue * 60 + parseInt(startMinus.props.value);
        const minusEnd = endHourValue * 60 + parseInt(endMinus.props.value);

        if (!paramsValid) {
            onAddSchedules(errorsSchedule.fieldsRequired, []);
            return;
        }

        if (minusStart > minusEnd) {
            onAddSchedules(errorsSchedule.timeOutOfRange, []);
            return;
        }

        if (minusStart === minusEnd) {
            onAddSchedules(errorsSchedule.duplicateHoursError, []);
            return;
        }

        const newStateDays = [...days.map<Schedule>(d => ({ ...d }))];
        const daySelectedOfArray = newStateDays.find(d => d.day === daySelected);
        daySelectedOfArray.hasSchedule = true;
        daySelectedOfArray.startHour = formatTimeHour(startHourValue.toString(), timeFormat);
        daySelectedOfArray.startMinus = formatTimeMinus(startMinus.props.value);
        daySelectedOfArray.endHour = formatTimeHour(endHourValue.toString(), timeFormat);
        daySelectedOfArray.endMinus = formatTimeMinus(endMinus.props.value);
        onAddSchedules('', newStateDays);
    };

    const timeLabel = timeFormat === '12' ? '(12hrs AM/PM)' : '(24hrs)';

    return (
        <>
            {daySelected !== '' &&
                <div className={styles.schedulesInputs}>
                    <div className={styles.blockInputs}>
                        <label>Inicio: </label>
                        <div className={styles.inputs}>
                            <input type="text" {...startHour.props} /> :
                            <input type="text" {...startMinus.props} />
                            {timeFormat === '12' && (
                                <select
                                    value={startPeriod}
                                    onChange={(e) => setStartPeriod(e.target.value)}
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            )}
                            <p>{timeLabel}</p>
                        </div>
                    </div>
                    <div className={styles.blockInputs}>
                        <label>Fin: </label>
                        <div className={styles.inputs}>
                            <input type="text" {...endHour.props} /> :
                            <input type="text" {...endMinus.props} />
                            {timeFormat === '12' && (
                                <select
                                    value={endPeriod}
                                    onChange={(e) => setEndPeriod(e.target.value)}
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            )}
                            <p>{timeLabel}</p>
                        </div>
                    </div>
                    <button
                        className="btn btn-circle align-self-end"
                        type='button'
                        onClick={addSchedulesHandler}
                    >
                        add
                        {/* <IconFortAwesome icon="fa fa-checkbox-marked-circle" /> */}
                    </button>
                </div>
            }
        </>
    );
};

const errorsSchedule = {
    fieldsRequired: 'Estos campos son requeridos',
    timeOutOfRange: 'La hora de inicio debe ser menor que la hora final',
    duplicateHoursError: 'La hora de inicio debe ser diferente a la hora final'
};

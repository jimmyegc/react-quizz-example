import { Schedule } from '../../DatesByDays';
import styles from '../../styles.module.scss'

export const DaysSelector = ({
    isRequiredActivated,
    days,
    daySelected,
    onSelectDay
}: {
    isRequiredActivated: boolean;
    days: Schedule[];
    daySelected: string;
    onSelectDay: CallableFunction;
}) => {
    return <div className={`${styles.days} ${isRequiredActivated ? styles.advertRequired : ''}`}>
        {
            days.map((d, i) => <div
                key={d.day}
                className={`
              ${styles.day} 
              ${i !== days.length - 1 ? styles.withBorder : ''}
              ${d.hasSchedule ? styles.filled : ''}
              ${daySelected === d.day ? styles.selected : ''}
          `}
                onClick={() => onSelectDay(d.day)}
            >
                {d.day}
            </div>)
        }
    </div>
}

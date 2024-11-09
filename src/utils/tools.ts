export const today = (format: FFDate) => {
  const date = new Date()
  let dd: number | string = date.getDate()
  let mm: number | string = date.getMonth() + 1
  const yyyy: number = date.getFullYear()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  if (format === 'dd-mm-yy') {
      return `${dd}-${mm}-${yyyy}`
  } else {
      return `${yyyy}-${mm}-${dd}`
  }
}

export const thisMonth = (format: FFDate) => {
  const date = new Date()
  let dd: number | string = date.getDate()
  let mm: number | string = date.getMonth() + 1
  const yyyy: number = date.getFullYear()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  if (format === 'dd-mm-yy') {
      return `${dd}-${mm}-${yyyy}`
  } else {
      return `${yyyy}-${mm}-${dd}`
  }
}

export const formatDate = ({
  date,
  format
}: {
  date: Date,
  format: FFDate
}) => {

  let dd: number | string = date.getDate()
  let mm: number | string = date.getMonth()
  const yyyy: number = date.getFullYear()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  if (mm === '00') mm = 12


  if (format === 'dd-mm-yy') {
      return `${dd}-${mm}-${yyyy}`
  } else {
      return `${yyyy}-${mm}-${dd}`
  }
}

export const addMonths = ({
  date,
  monthsToSum,
  format
}: {
  date: Date;
  monthsToSum: number;
  format: FFDate;
}) => {
  date.setMonth(date.getMonth() + monthsToSum)

  let dd: number | string = date.getDate()
  let mm: number | string = date.getMonth() + 1
  const yyyy: number = date.getFullYear()

  if (dd < 10) dd = '0' + dd

  if (mm < 10) mm = '0' + mm

  if (format === 'dd-mm-yy') {
      return `${dd}-${mm}-${yyyy}`
  } else {
      return `${yyyy}-${mm}-${dd}`
  }
}

//deprecated
export const createDate = (date: string) => {
  const [yyyy, mm, dd] = date.split('-')
  const year = parseInt(yyyy, 10)
  const month =
      (parseInt(mm, 10) === 12)
          ? 0
          : parseInt(mm, 10)
  const day = parseInt(dd, 10)

  return new Date(year, month, day)
}

export const createDateFix = (date: string) => {
  const [yyyy, mm, dd] = date.split('-')
  const year = parseInt(yyyy, 10)
  const month =
      (parseInt(mm, 10) === 12)
          ? 0
          : parseInt(mm, 10) - 1
  const day = parseInt(dd, 10)

  return new Date(year, month, day)
}

export type FFDate = 'yyyy-mm-dd' | 'dd-mm-yy'

export const millisecondsToMinutes = (milliseconds: number) => {
  return milliseconds / (1000 * 60)
}

/* export const formatTimeHour = (time: string) => {
  if (time.length > 1) return time.replace(/^0+/, '')
  return time
} */

export const formatTimeMinus = (time: string) => {
  if (time.length === 1) return `0${time}`
  return time
}

export const getDateDayMothYearHoursMinutesSeconds = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export const convertUTCtoCST = (utcDateStr) => {
  const utcDate = new Date(utcDateStr + ' UTC');
  const cstDate = new Date(utcDate.getTime() - 6 * 60 * 60 * 1000);
  const formattedDate = cstDate.toISOString().replace('T', ' ').slice(0, 19);
  return formattedDate;
}


export const formatDateWithTime = ({
  date,
  format,
  showSeconds = false
}: {
  date: Date,
  format: FFDate
  showSeconds?: boolean
}) => {
  let dd: number | string = date.getDate();
  let mm: number | string = date.getMonth() + 1;
  const yyyy: number = date.getFullYear();
  
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  let seconds: number | string = date.getSeconds();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;

  if (format === 'dd-mm-yy') {
      return `${dd}-${mm}-${yyyy} ${hours}:${minutes}${showSeconds ? `:${seconds}` : ""}`;
  } else {
      return `${yyyy}-${mm}-${dd} ${hours}:${minutes}${showSeconds ? `:${seconds}` : ""}`;
  }
};

export const formatTimeHour = (hour: string, timeFormat: '12' | '24') => {
  let formattedHour = hour;

  if (timeFormat === '12') {
      const hourInt = parseInt(hour, 10);
      const isPM = hourInt >= 12;
      formattedHour = `${hourInt % 12 || 12}${isPM ? ' PM' : ' AM'}`;
  }
  return formattedHour;
};
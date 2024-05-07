export function getFormattedDate(date, format) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return format
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('YYYY', year.toString())
    .replace('HH', hours.toString().padStart(2, '0'))
    .replace('mm', minutes.toString().padStart(2, '0'))
    .replace('ss', seconds.toString().padStart(2, '0'))
}

export function getHour(date = new Date()) {
  let hours = date.getHours()
  let minutes = date.getMinutes()

  // hours = hours < 10 ? `0${hours}` : hours
  // minutes = minutes < 10 ? `0${minutes}` : minutes
  hours = hours.toString().padStart(2, '0')
  minutes = minutes.toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export function getMonthAndYear(date = new Date(), namesShortMonths) {
  // const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const month = (date.getMonth())
  const year = date.getFullYear()

  return `${namesShortMonths[month]} / ${year}`
}

export function getDaysMonth(date = new Date()) {
  const days = []
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const daysOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  for (let i = 0; i < firstDay; i++) {
    // days.unshift(daysOfPrevMonth - i)
    days.unshift('')
  }

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
  for (let i = 0; i < 6 - lastDay; i++) {
    // days.push(i + 1)
    days.push('')
  }

  // rellenar para que sean 42 días
  while (days.length < 42) {
    days.push('')
  }

  return days
}
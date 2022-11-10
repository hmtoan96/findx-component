import { useState, useEffect } from 'react'
import {
  format,
  addMonths,
  subMonths,
  isDate,
  getDate,
  isEqual as isEqualDates,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addWeeks,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  eachWeekendOfInterval,
} from 'date-fns'

const createDayObject = (dateValue) => {
  return {
    dateValue,
    label: getDate(dateValue),
  }
}

function misusageThrow(methodName) {
  throw new Error(methodName)
}

export default function (props) {
  const startCurrentDateAt = props?.startCurrentDateAt
  const startSelectedDateAt = props?.startSelectedDateAt
  const startWeekAt = props?.startWeekAt || 0

  const [date, setDate] = useState(
    isDate(startCurrentDateAt) ? startCurrentDateAt : new Date()
  )
  console.log('this is date', date)
  const [selectedDate, setSelectedDate] = useState(
    isDate(startSelectedDateAt) ? startSelectedDateAt : new Date()
  )

  const getDaysInMonth = (currentDate = date) => {
    console.log(currentDate)
    if (!isDate(currentDate)) return
    return eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    }).map(createDayObject)
  }

  const getWeeksInMonth = (
    currentDate = date,
    startingDayIndex = startWeekAt
  ) => {
    if (!isDate(currentDate) || !Number.isInteger(startingDayIndex)) {
      misusageThrow('getWeeksInMonth')
    }
    console.log(currentDate)
    const weekOptions = { weekStartsOn: startingDayIndex }
    const firstDayOfMonth = startOfMonth(currentDate)
    const firstDayOfFirstWeek = startOfWeek(firstDayOfMonth, weekOptions)
    const lastDayOfFirstWeek = endOfWeek(firstDayOfMonth, weekOptions)

    const getWeeks = (startDay, endDay, weekArray = []) => {
      const week = eachDayOfInterval({
        start: startDay,
        end: endDay,
      }).map(createDayObject)
      const weeks = [...weekArray, week]
      const nextWeek = addWeeks(startDay, 1)
      const firstDayNextWeek = startOfWeek(nextWeek, weekOptions)
      const lastDayNextWeek = endOfWeek(nextWeek, weekOptions)
      if (isSameMonth(firstDayNextWeek, date)) {
        return getWeeks(firstDayNextWeek, lastDayNextWeek, weeks)
      }
      return weeks
    }
    return getWeeks(firstDayOfFirstWeek, lastDayOfFirstWeek)
  }

  return {
    getDaysInMonth,
    getWeeksInMonth,
    setDate,
  }
}

import dayjs from 'dayjs';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { useMemo, useState } from 'react';

import { getWeekDays } from '@/utils/getWeekDays';

import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle
} from './styles';

interface CalendarWeek {
  week: number;
  days: {
    date: dayjs.Dayjs;
    disabled: boolean;
  }[];
}

interface CalendarProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateChange }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1));

  const currentMonth = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');
  const weekDays = getWeekDays(true);

  const calendarWeeks = useMemo(() => {
    const daysInMonth = Array.from({
      length: currentDate.daysInMonth()
    }).map((_, i) => currentDate.set('date', i + 1));

    const firstWeekDay = currentDate.day();

    const previousMonthFill = Array.from({
      length: firstWeekDay
    })
      .map((_, i) => currentDate.subtract(i + 1, 'day'))
      .reverse();

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth()
    );

    const lastWeekDay = lastDayInCurrentMonth.day();

    const nextMonthFill = Array.from({ length: 6 - lastWeekDay }).map((_, i) =>
      lastDayInCurrentMonth.add(i + 1, 'day')
    ); // 6 = weekDays.length

    const calendarDays = [
      ...previousMonthFill.map((date) => ({ date, disabled: true })),
      ...daysInMonth.map((date) => ({
        date,
        disabled: date.endOf('day').isBefore(dayjs())
      })),
      ...nextMonthFill.map((date) => ({ date, disabled: true }))
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeek[]>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0;

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7)
          });
        }

        return weeks;
      },
      []
    );

    return calendarWeeks;
  }, [currentDate]);

  function handlePreviousMonth() {
    setCurrentDate((oldState) => oldState.subtract(1, 'month'));
  }

  function handleNextMonth() {
    setCurrentDate((oldState) => oldState.add(1, 'month'));
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle size="sm">
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Mês anterior">
            <CaretLeft />
          </button>

          <button onClick={handleNextMonth} title="Mês seguinte">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th key={day}>{day}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map((week) => (
            <tr key={week.week}>
              {week.days.map((day) => (
                <td key={day.date.toString()}>
                  <CalendarDay
                    onClick={() => onDateChange?.(day.date.toDate())}
                    disabled={day.disabled}
                  >
                    {day.date.format('D')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}

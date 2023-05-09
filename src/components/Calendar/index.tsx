import dayjs from 'dayjs';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { useMemo, useState } from 'react';

import { api } from '@/lib/axios';
import { getWeekDays } from '@/utils/getWeekDays';
import { useQuery } from '@tanstack/react-query';

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
  username: string;
  onDateChange?: (date: Date) => void;
}

interface BlockedDates {
  blockedWeekDays: number[];
  blockedDates: number[];
}

interface LoadBlockedDatesParams {
  year: number;
  month: number;
  username: string;
}

async function loadBlockedDates({
  year,
  month,
  username
}: LoadBlockedDatesParams): Promise<BlockedDates> {
  const { data } = await api.get(`/users/${username}/blocked-dates`, {
    params: {
      year,
      month: month + 1
    }
  });

  return data;
}
export function Calendar({ username, onDateChange }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1));

  const currentMonth = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');
  const year = currentDate.year();
  const month = currentDate.month();

  const weekDays = getWeekDays(true);

  const { data: blockedDates } = useQuery(
    ['blocked-days', year, month],
    async () =>
      await loadBlockedDates({
        username,
        year,
        month
      }),
    {
      enabled: !!year && !!month
    }
  );

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) return [];

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
        disabled:
          date.isBefore(dayjs(), 'day') ||
          blockedDates.blockedWeekDays.includes(date.day()) ||
          blockedDates.blockedDates.includes(date.date())
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
  }, [blockedDates, currentDate]);

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

import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { api } from '@/lib/axios';

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList
} from './styles';

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availability, setAvailability] = useState<Availability | undefined>();

  const pathname = usePathname();

  const username = pathname?.replace('/schedule/', '');

  const isDateSelected = !!selectedDate;
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : '';
  const dayOfMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : '';

  useEffect(() => {
    if (!selectedDate) return;

    async function loadAvailability() {
      const { data } = await api.get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD')
        }
      });

      setAvailability(data);
    }

    loadAvailability();
  }, [selectedDate, username]);

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{dayOfMonth}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}

import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

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

interface LoadAvailabilityParams {
  username: string;
  selectedDate: string;
}

async function loadAvailability({
  username,
  selectedDate
}: LoadAvailabilityParams): Promise<Availability> {
  const { data } = await api.get(`/users/${username}/availability`, {
    params: {
      date: dayjs(selectedDate).format('YYYY-MM-DD')
    }
  });

  return data;
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const pathname = usePathname();

  const username = pathname?.replace('/schedule/', '') ?? '';

  const isDateSelected = !!selectedDate;
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : '';
  const dayOfMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : '';

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : '';

  const { data: availability } = useQuery(
    ['availability', selectedDateWithoutTime],
    async () =>
      await loadAvailability({
        username,
        selectedDate: selectedDateWithoutTime
      }),
    {
      enabled: !!selectedDate
    }
  );

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

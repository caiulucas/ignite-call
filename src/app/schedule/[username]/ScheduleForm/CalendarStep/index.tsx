import dayjs from 'dayjs';
import { useState } from 'react';

import { Calendar } from '@/components/Calendar';

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList
} from './styles';

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const isDateSelected = !!selectedDate;
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : '';
  const dayOfMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : '';

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{dayOfMonth}</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>09:00h</TimePickerItem>
            <TimePickerItem>10:00h</TimePickerItem>
            <TimePickerItem>11:00h</TimePickerItem>
            <TimePickerItem>12:00h</TimePickerItem>
            <TimePickerItem>13:00h</TimePickerItem>
            <TimePickerItem>14:00h</TimePickerItem>
            <TimePickerItem>15:00h</TimePickerItem>
            <TimePickerItem>16:00h</TimePickerItem>
            <TimePickerItem>17:00h</TimePickerItem>
            <TimePickerItem>18:00h</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}

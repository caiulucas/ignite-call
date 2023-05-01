import { CaretLeft, CaretRight } from 'phosphor-react';

import { getWeekDays } from '@/utils/getWeekDays';

import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle
} from './styles';

export function Calendar() {
  const weekDays = getWeekDays(true);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle size="sm">
          Maio <span>2023</span>
        </CalendarTitle>

        <CalendarActions>
          <button>
            <CaretLeft />
          </button>

          <button>
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>2</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>3</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay>4</CalendarDay>
            </td>
            <td>
              <CalendarDay>5</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>6</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>7</CalendarDay>
            </td>
            <td>
              <CalendarDay>8</CalendarDay>
            </td>
            <td>
              <CalendarDay>9</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>10</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}

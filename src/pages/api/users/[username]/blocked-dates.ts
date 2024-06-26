import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const username = String(req.query.username);
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ message: 'Year or month not specified.' });
  }

  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) return res.status(404).json({ message: 'User does not exist.' });

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: { week_day: true },
    where: { user_id: user.id }
  });

  const blockedWeekDays = Array.from({ length: 7 })
    .map((_, i) => i)
    .filter(
      (weekDay) =>
        !availableWeekDays.some(
          (availableWeekDay) => availableWeekDay.week_day === weekDay
        )
    );

  const yearMonth = `${year}-${String(month).padStart(2, '0')}`;

  const blockedDatesRaw = await prisma.$queryRaw<Array<{ date: number }>>`
    SELECT
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size
    FROM schedulings AS S
    LEFT JOIN user_time_intervals AS UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))
    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${yearMonth}
    GROUP BY 
      EXTRACT(DAY FROM S.date), 
      size
    HAVING amount >= size;
  `;

  const blockedDates = blockedDatesRaw.map((item) => item.date);

  return res.json({ blockedWeekDays, blockedDates });
}

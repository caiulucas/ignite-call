import { useState } from 'react';

import { CalendarStep } from './CalendarStep';
import { ConfirmStep } from './ConfirmStep';

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>();

  function handleClearSelectedDateTime() {
    setSelectedDateTime(undefined);
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancel={handleClearSelectedDateTime}
      />
    );
  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />;
}

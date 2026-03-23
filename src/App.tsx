import { useState } from 'react';
import { useWeekDates } from './hooks/useWeekDates';
import { useChoreData } from './hooks/useChoreData';
import { WeekView } from './components/WeekView/WeekView';
import { DayView } from './components/DayView/DayView';
import { getWeekKeyForOffset } from './utils/dateUtils';

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const weekKey = getWeekKeyForOffset(weekOffset);
  const { dateStrings, weekLabel } = useWeekDates(weekOffset);
  const { toggleChore, getDayData, isChoreComplete } = useChoreData(weekKey);

  if (selectedDate) {
    return (
      <DayView
        dateStr={selectedDate}
        dayData={getDayData(selectedDate)}
        onToggle={toggleChore}
        onBack={() => setSelectedDate(null)}
      />
    );
  }

  return (
    <WeekView
      dateStrings={dateStrings}
      weekLabel={weekLabel}
      weekOffset={weekOffset}
      isChoreComplete={isChoreComplete}
      onDaySelect={setSelectedDate}
      onWeekChange={setWeekOffset}
    />
  );
}

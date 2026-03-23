import { useState, useCallback, useEffect } from 'react';
import { WeekData, DayData, ChoreId } from '../types';
import { EMPTY_COMPLETIONS } from '../constants';

function loadWeekData(weekKey: string): WeekData {
  try {
    const raw = localStorage.getItem(weekKey);
    if (raw) return JSON.parse(raw) as WeekData;
  } catch {
    // corrupted data — start fresh
  }
  return { weekKey, days: {} };
}

function saveWeekData(data: WeekData) {
  localStorage.setItem(data.weekKey, JSON.stringify(data));
}

function getOrCreateDay(weekData: WeekData, dateStr: string): DayData {
  return weekData.days[dateStr] ?? {
    date: dateStr,
    completions: { ...EMPTY_COMPLETIONS },
  };
}

export function useChoreData(weekKey: string) {
  const [weekData, setWeekData] = useState<WeekData>(() => loadWeekData(weekKey));

  // Reload when navigating to a different week
  useEffect(() => {
    setWeekData(loadWeekData(weekKey));
  }, [weekKey]);

  const toggleChore = useCallback((dateStr: string, choreId: ChoreId) => {
    setWeekData(prev => {
      const day = getOrCreateDay(prev, dateStr);
      const updated: WeekData = {
        ...prev,
        days: {
          ...prev.days,
          [dateStr]: {
            ...day,
            completions: {
              ...day.completions,
              [choreId]: !day.completions[choreId],
            },
          },
        },
      };
      saveWeekData(updated);
      return updated;
    });
  }, []);

  const getDayData = useCallback(
    (dateStr: string): DayData => getOrCreateDay(weekData, dateStr),
    [weekData]
  );

  const isChoreComplete = useCallback(
    (dateStr: string, choreId: ChoreId): boolean =>
      weekData.days[dateStr]?.completions[choreId] ?? false,
    [weekData]
  );

  return { toggleChore, getDayData, isChoreComplete };
}

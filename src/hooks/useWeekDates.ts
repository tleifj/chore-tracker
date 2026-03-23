import { useMemo } from 'react';
import { getWeekDates, getWeekLabel, toDateString } from '../utils/dateUtils';

export function useWeekDates(weekOffset: number) {
  return useMemo(() => {
    const dates = getWeekDates(new Date(), weekOffset);
    return {
      dates,
      dateStrings: dates.map(toDateString),
      weekLabel: getWeekLabel(dates),
    };
  }, [weekOffset]);
}

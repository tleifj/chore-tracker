/**
 * Returns the Monday of the week containing the given date.
 * Sunday (day 0) is treated as the last day of the previous Mon-Sun week.
 */
export function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

/** Format a Date as "YYYY-MM-DD" */
export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** localStorage key for the week containing the given date */
export function getWeekKey(date: Date): string {
  return `week-${toDateString(getMondayOfWeek(date))}`;
}

/** Returns an array of 7 Date objects for Mon–Sun of the week containing `date`, offset by N weeks */
export function getWeekDates(date: Date, weekOffset = 0): Date[] {
  const monday = getMondayOfWeek(date);
  monday.setDate(monday.getDate() + weekOffset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

/** localStorage key for a week offset from today */
export function getWeekKeyForOffset(weekOffset: number): string {
  const today = new Date();
  const monday = getMondayOfWeek(today);
  monday.setDate(monday.getDate() + weekOffset * 7);
  return `week-${toDateString(monday)}`;
}

/** "Mar 17 – Mar 23" label for a week */
export function getWeekLabel(dates: Date[]): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${fmt(dates[0])} – ${fmt(dates[6])}`;
}

/** "Monday, March 17" */
export function formatDayFull(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function isToday(dateStr: string): boolean {
  return dateStr === toDateString(new Date());
}

export function isFuture(dateStr: string): boolean {
  return dateStr > toDateString(new Date());
}

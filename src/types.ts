export type ChoreId = 'make-bed' | 'clear-table' | 'put-away-things';

export interface Chore {
  id: ChoreId;
  label: string;
  icon: string;
}

export interface DayData {
  date: string; // "YYYY-MM-DD"
  completions: Record<ChoreId, boolean>;
}

export interface WeekData {
  weekKey: string; // "week-YYYY-MM-DD" (Monday's date)
  days: Record<string, DayData>; // keyed by "YYYY-MM-DD"
}

import { Chore, ChoreId } from './types';

export const CHORES: Chore[] = [
  { id: 'make-bed',        label: 'Make Bed',           icon: '🛏️' },
  { id: 'clear-table',     label: 'Clear the Table',    icon: '🍽️' },
  { id: 'put-away-things', label: 'Put Away Things',     icon: '🧸' },
];

export const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const EMPTY_COMPLETIONS: Record<ChoreId, boolean> = {
  'make-bed': false,
  'clear-table': false,
  'put-away-things': false,
};

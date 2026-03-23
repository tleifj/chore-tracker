import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChoreId } from '../../types';
import { DayCard } from './DayCard';

interface Props {
  dateStrings: string[];
  weekLabel: string;
  weekOffset: number;
  isChoreComplete: (dateStr: string, choreId: ChoreId) => boolean;
  onDaySelect: (dateStr: string) => void;
  onWeekChange: (offset: number) => void;
}

function weekTitle(offset: number) {
  if (offset === 0) return 'This Week';
  if (offset === -1) return 'Last Week';
  if (offset === 1) return 'Next Week';
  if (offset < 0) return `${Math.abs(offset)} Weeks Ago`;
  return `${offset} Weeks Ahead`;
}

export function WeekView({ dateStrings, weekLabel, weekOffset, isChoreComplete, onDaySelect, onWeekChange }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-4xl font-black text-white drop-shadow-md tracking-tight">
          ⭐ Chore Star!
        </h1>

        {/* Week navigation */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => onWeekChange(weekOffset - 1)}
            className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronLeft size={22} strokeWidth={3} className="text-white" />
          </button>

          <div className="text-center">
            <p className="text-white font-black text-base leading-tight">{weekTitle(weekOffset)}</p>
            <p className="text-white/70 font-bold text-xs">{weekLabel}</p>
          </div>

          <button
            onClick={() => onWeekChange(weekOffset + 1)}
            className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronRight size={22} strokeWidth={3} className="text-white" />
          </button>
        </div>

        {/* Jump back to current week */}
        {weekOffset !== 0 && (
          <div className="flex justify-center mt-2">
            <button
              onClick={() => onWeekChange(0)}
              className="text-white/80 font-black text-xs bg-white/20 rounded-full px-3 py-1 active:scale-95 transition-transform"
            >
              Back to this week
            </button>
          </div>
        )}
      </div>

      {/* Day cards */}
      <div className="flex-1 px-4 pb-8 flex flex-col gap-3">
        {dateStrings.map((dateStr, i) => {
          const completions: Record<string, boolean> = {};
          (['make-bed', 'clear-table', 'put-away-things'] as ChoreId[]).forEach(id => {
            completions[id] = isChoreComplete(dateStr, id);
          });
          return (
            <DayCard
              key={dateStr}
              dateStr={dateStr}
              completions={completions}
              colorIndex={i}
              onClick={() => onDaySelect(dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
}

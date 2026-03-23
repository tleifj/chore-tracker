import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ChoreId } from '../../types';
import { CHORES } from '../../constants';
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

function fireConfetti() {
  const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa', '#f472b6'];
  confetti({ particleCount: 80, spread: 70, origin: { y: 0.3 }, colors });
  setTimeout(() => confetti({ particleCount: 60, spread: 90, origin: { y: 0.5 }, colors }), 300);
  setTimeout(() => confetti({ particleCount: 40, angle: 60,  spread: 60, origin: { x: 0, y: 0.6 }, colors }), 600);
  setTimeout(() => confetti({ particleCount: 40, angle: 120, spread: 60, origin: { x: 1, y: 0.6 }, colors }), 600);
}

export function WeekView({ dateStrings, weekLabel, weekOffset, isChoreComplete, onDaySelect, onWeekChange }: Props) {
  const allWeekDone = dateStrings.every(dateStr =>
    CHORES.every(chore => isChoreComplete(dateStr, chore.id))
  );

  const celebratedKey = useRef<string | null>(null);

  useEffect(() => {
    const key = `${weekOffset}`;
    if (allWeekDone && celebratedKey.current !== key) {
      celebratedKey.current = key;
      fireConfetti();
    }
    if (!allWeekDone) {
      celebratedKey.current = null;
    }
  }, [allWeekDone, weekOffset]);

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

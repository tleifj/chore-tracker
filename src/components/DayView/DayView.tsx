import { ChevronLeft } from 'lucide-react';
import { CHORES } from '../../constants';
import { ChoreId, DayData } from '../../types';
import { formatDayFull } from '../../utils/dateUtils';
import { ChoreToggle } from './ChoreToggle';

interface Props {
  dateStr: string;
  dayData: DayData;
  onToggle: (dateStr: string, choreId: ChoreId) => void;
  onBack: () => void;
}

export function DayView({ dateStr, dayData, onToggle, onBack }: Props) {
  const completedCount = CHORES.filter(c => dayData.completions[c.id]).length;
  const allDone = completedCount === CHORES.length;

  const date = new Date(dateStr + 'T00:00:00');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 font-black text-base mb-4 -ml-1"
        >
          <ChevronLeft size={22} strokeWidth={3} />
          Back
        </button>
        <h2 className="text-3xl font-black text-white drop-shadow-md leading-tight">
          {formatDayFull(date)}
        </h2>
      </div>

      {/* Chores */}
      <div className="flex-1 px-4 flex flex-col gap-3">
        {CHORES.map(chore => (
          <ChoreToggle
            key={chore.id}
            chore={chore}
            done={dayData.completions[chore.id]}
            onToggle={(id) => onToggle(dateStr, id)}
          />
        ))}
      </div>

      {/* Progress */}
      <div className="px-4 py-8 text-center">
        {allDone ? (
          <div className="bg-white/40 rounded-3xl py-4 px-6">
            <p className="text-2xl font-black text-white drop-shadow">
              Amazing job! 🎉🌟
            </p>
            <p className="text-white/80 font-bold mt-1">All chores done!</p>
          </div>
        ) : (
          <div className="flex justify-center gap-3">
            {CHORES.map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                  i < completedCount ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

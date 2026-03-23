import { CHORES, DAYS_SHORT } from '../../constants';
import { isToday, isFuture } from '../../utils/dateUtils';
import { ChoreIcon } from './ChoreIcon';

const DAY_COLORS = [
  'bg-red-400',
  'bg-orange-400',
  'bg-yellow-400',
  'bg-green-400',
  'bg-sky-400',
  'bg-violet-400',
  'bg-pink-400',
];

interface Props {
  dateStr: string;
  completions: Record<string, boolean>;
  colorIndex: number;
  onClick: () => void;
}

export function DayCard({ dateStr, completions, colorIndex, onClick }: Props) {
  const date = new Date(dateStr + 'T00:00:00');
  const dayIndex = (date.getDay() + 6) % 7;
  const dayShort = DAYS_SHORT[dayIndex];
  const dayNum = date.getDate();
  const monthShort = date.toLocaleDateString('en-US', { month: 'short' });

  const today = isToday(dateStr);
  const future = isFuture(dateStr);
  const allDone = CHORES.every(c => completions[c.id]);
  const doneCount = CHORES.filter(c => completions[c.id]).length;

  const accentColor = DAY_COLORS[colorIndex % DAY_COLORS.length];

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center rounded-3xl overflow-hidden
        shadow-md active:scale-95 transition-transform duration-100
        ${future ? 'opacity-50' : ''}
        ${today ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent' : ''}
      `}
    >
      {/* Colored day tab */}
      <div className={`${accentColor} flex-shrink-0 w-20 self-stretch flex flex-col items-center justify-center py-4`}>
        <span className="text-white font-black text-lg leading-none">{dayShort}</span>
        <span className="text-white/80 font-bold text-xs mt-0.5">{monthShort} {dayNum}</span>
        {today && <span className="mt-1 text-white text-xs font-black bg-white/30 rounded-full px-1.5 py-0.5">TODAY</span>}
      </div>

      {/* Chore emoji icons */}
      <div className="flex-1 bg-white flex items-center justify-around px-2 py-4 min-h-[76px]">
        {CHORES.map(chore => (
          <ChoreIcon
            key={chore.id}
            emoji={chore.icon}
            done={completions[chore.id] ?? false}
          />
        ))}
      </div>

      {/* Right badge */}
      <div className="bg-white self-stretch flex items-center pr-3 pl-1 min-h-[76px]">
        {allDone ? (
          <span className="text-2xl">⭐</span>
        ) : doneCount > 0 ? (
          <span className="text-sm font-black text-gray-400">{doneCount}/3</span>
        ) : (
          <span className="text-xl opacity-30">☆</span>
        )}
      </div>
    </button>
  );
}

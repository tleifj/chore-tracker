import { Chore, ChoreId } from '../../types';

const CHORE_THEME: Record<string, { undone: string; done: string }> = {
  'make-bed':        { undone: 'bg-blue-50 border-blue-200',     done: 'bg-blue-100 border-blue-400'     },
  'clear-table':     { undone: 'bg-orange-50 border-orange-200', done: 'bg-orange-100 border-orange-400' },
  'put-away-things': { undone: 'bg-green-50 border-green-200',   done: 'bg-green-100 border-green-400'   },
};

interface Props {
  chore: Chore;
  done: boolean;
  onToggle: (id: ChoreId) => void;
}

export function ChoreToggle({ chore, done, onToggle }: Props) {
  const theme = CHORE_THEME[chore.id];

  return (
    <button
      onClick={() => onToggle(chore.id)}
      className={`
        w-full flex items-center gap-4 px-4 min-h-[80px] rounded-3xl border-2
        active:scale-95 transition-transform duration-100 text-left
        ${done ? theme.done : theme.undone}
      `}
    >
      {/* Emoji */}
      <span className={`text-4xl transition-all duration-150 ${done ? 'scale-110' : 'opacity-60 grayscale'}`}>
        {chore.icon}
      </span>

      {/* Label */}
      <span className={`flex-1 text-xl font-black ${done ? 'text-gray-700' : 'text-gray-400'}`}>
        {chore.label}
      </span>

      {/* Star */}
      <span className={`text-3xl transition-all duration-200 ${done ? '' : 'opacity-20 grayscale'}`}>
        ⭐
      </span>
    </button>
  );
}

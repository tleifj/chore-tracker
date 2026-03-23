interface Props {
  emoji: string;
  done: boolean;
}

export function ChoreIcon({ emoji, done }: Props) {
  return (
    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl transition-all duration-150 ${done ? 'scale-110' : 'opacity-40 grayscale'}`}>
      {emoji}
    </div>
  );
}

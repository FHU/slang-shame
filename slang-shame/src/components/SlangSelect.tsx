type SlangSelectProps = {
  word: string;
  selected: boolean;
  onClick: () => void;
};

export default function SlangSelect({ word, selected, onClick }: SlangSelectProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-2 rounded-md m-1 cursor-pointer font-semibold
        transition-all border-2
        ${selected
          ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)]'
          : 'bg-white dark:bg-[var(--color-black)] text-black dark:text-white border-gray-400 dark:border-gray-600 hover:border-[var(--color-secondary)]'
        }
      `}
    >
      {word}
    </button>
  );
}
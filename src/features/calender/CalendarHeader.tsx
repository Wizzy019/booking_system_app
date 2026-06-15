interface Props {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
}

const monthFormatter = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" });

export default function CalendarHeader({ currentMonth, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="text-(--text-primary) font-semibold text-lg md:text-xl">
        {monthFormatter.format(currentMonth)}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous month"
          className="p-2 rounded-md border border-(--border-default) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next month"
          className="p-2 rounded-md border border-(--border-default) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

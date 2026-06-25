const DotsVerticalIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

export interface UpcomingConsultationCardProps {
  name: string;
  type: string;
  date: string;
}

export default function UpcomingConsultationCard({
  name,
  type,
  date,
}: UpcomingConsultationCardProps) {
  return (
    <div className="bg-(--bg-surface) border border-(--border-default) rounded-lg p-4 shadow-subtle flex flex-col gap-3">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-(--primary-soft) flex items-center justify-center shrink-0 text-(--primary)">
            <UserIcon />
          </div>
          <div className="min-w-0">
            <p className="text-(--text-primary) text-sm font-semibold truncate">
              {name}
            </p>
            <p className="text-(--text-muted) text-xs mt-0.5 truncate">
              {type}
            </p>
          </div>
        </div>
        <button className="text-(--text-muted) hover:text-(--text-primary) p-0.5 shrink-0 ml-2 transition-colors">
          <DotsVerticalIcon />
        </button>
      </div>

      {/* Date */}
      <p className="text-(--text-muted) text-xs">{date}</p>

      {/* Status pill */}
      <span className="inline-block w-fit text-xs font-medium text-(--text-secondary) border border-(--border-default) bg-(--bg-elevated) px-2.5 py-0.5 rounded-full">
        Status
      </span>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto">
        <button className="flex-1 py-1.5 text-xs font-semibold text-(--primary) border border-(--border-default) rounded-md hover:bg-(--primary-soft) transition-colors">
          View
        </button>
        <button className="flex-1 py-1.5 text-xs font-medium text-(--text-secondary) border border-(--border-default) rounded-md hover:bg-(--bg-app) transition-colors">
          Edit
        </button>
        <button className="flex-1 py-1.5 text-xs font-medium text-(--text-secondary) border border-(--border-default) rounded-md hover:bg-(--bg-app) transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

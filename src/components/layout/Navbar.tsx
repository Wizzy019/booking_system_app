import { useAuthStore, type User } from "../../features/auth/hooks/authStore";

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
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

// const ChevronDownIcon = () => (
//   <svg viewBox="0 0 20 20" fill="currentColor" className="sixe-8">
//     <path
//       fillRule="evenodd"
//       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

export default function Navbar() {
  const { user: userData } = useAuthStore();

  const user: User | null = userData;
  const avater = user?.avater;

  return (
    <>
      <header className="hidden md:flex md:items-center md:justify-between py-2 px-6 shrink-0 bg-(--bg-surface) border-b border-(--border-default)">
        <div className="w-full flex items-center justify-between gap-3 lg:gap-4">
          <div>Dashboard</div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative hidden md:block">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted) pointer-events-none">
                <SearchIcon />
              </span>
              <input
                type="search"
                placeholder="Search"
                className="h-9 w-48 lg:w-56 rounded-md border border-(--border-default) bg-(--bg-elevated) pl-8 pr-3 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--selected-border)"
              />
            </div>
            <button className="hidden md:block relative p-1 text-(--text-muted) hover:text-(--text-primary) transition-colors">
              <BellIcon />
              {/* <span className="absolute top-0 right-0 h-3.5 rounded-full bg-(--danger) border-2 border-(--bg-surface) flex items-center justify-center text-[9px] text-white font-bold leading-none"></span> */}
            </button>

            {/* User */}
            <div className="flex items-center justify-center gap-2">
              <div>
                {avater ? (
                  <div className="flex items-center justify-center">
                    <img src={avater} className="size-10 rounded-full" />
                  </div>
                ) : (
                  <UserIcon />
                )}
              </div>
              {/* <div>
              <span className="hidden md:block text-text-primary">{name}</span>
              <span className="mb-1 hidden md:block text-text-secondary">
                {role}
              </span>
            </div> */}
            </div>
            <span className="hidden sm:block text-sm font-medium text-(--text-primary) whitespace-nowrap">
              Today2023
            </span>
            {/* <span className="text-text-muted text-sm">
            <ChevronDownIcon />
          </span> */}
            {/* <div className="px-2 rounded-3xl bg-bg-surface flex flex-col items-center justify-center shrink-0 text-primary">
          </div> */}
          </div>
        </div>
      </header>

      <header className="md:hidden flex items-center justify-between py-2 px-4">
        <div>
          {avater ? (
            <div className="flex items-center justify-center">
              <img src={avater} className="size-10 rounded-full" />
            </div>
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-(--text-primary) font-bold text-sm leading-tight">
            Apex
          </p>
          <p className="text-(--text-muted) text-[11px]">Consulting</p>
        </div>
        <div>
          <span className="text-(--text-muted) pointer-events-none">
            <SearchIcon />
          </span>
        </div>
      </header>
    </>
  );
}

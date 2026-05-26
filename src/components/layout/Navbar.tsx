import { Search, Bell, Menu2, User } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  userName?: string;
  userRole?: string;
  onProfileClick?: () => void;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
}

export default function Navbar({
  userName = 'John Doe',
  userRole = 'Admin',
  onProfileClick,
  onMenuClick,
  onNotificationClick,
}: NavbarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <nav className="sticky top-0 z-40 h-[72px] bg-[var(--bg-surface)] border-b border-[var(--border-default)] backdrop-blur-sm">
      <div className="h-full px-[var(--space-2)] sm:px-[var(--space-3)] lg:px-[var(--space-4)] flex items-center justify-between gap-[var(--space-3)]">
        {/* LEFT: Page Title Placeholder */}
        <div className="hidden sm:flex items-center min-w-0">
          <h1 className="text-sm font-semibold text-[var(--text-primary)] truncate">
            Dashboard
          </h1>
        </div>

        {/* CENTER: Search Bar */}
        <div className="flex-1 max-w-lg">
          <div
            className={`relative h-9 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border transition-all duration-200 ${
              isFocused
                ? 'border-[var(--primary)] shadow-lg'
                : 'border-[var(--border-default)]'
            }`}
          >
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-full px-3 pl-9 text-sm bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
          </div>
        </div>

        {/* RIGHT: Actions & Profile */}
        <div className="flex items-center gap-[var(--space-2)]">
          {/* Notification Icon */}
          <button
            onClick={onNotificationClick}
            aria-label="Notifications"
            className="p-2 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            aria-label="Menu"
            className="p-2 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-all duration-200"
          >
            <Menu2 className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <button
            onClick={onProfileClick}
            aria-label="Profile"
            className="flex items-center gap-2 px-2 py-1 rounded-[var(--radius-sm)] hover:bg-[var(--bg-elevated)] transition-all duration-200"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[var(--primary-soft)] border border-[var(--primary)] flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--primary)]" />
            </div>

            {/* Profile Info - Desktop Only */}
            <div className="hidden md:flex flex-col items-start gap-0.5 min-w-0">
              <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                {userName}
              </span>
              <span className="text-xs text-[var(--text-muted)] truncate">
                {userRole}
              </span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

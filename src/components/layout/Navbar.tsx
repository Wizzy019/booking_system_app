import { useState } from "react";
import { Search, Bell, Menu, User, X } from "lucide-react";
import { useAuthStore } from "../../features/auth/hooks/authStore";

interface NavbarProps {
  onProfileClick?: () => void;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  isSidebarOpen?: boolean;
}

function Navbar({
  onProfileClick,
  onMenuClick,
  onNotificationClick,
  isSidebarOpen,
}: NavbarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const { user } = useAuthStore();

  console.log(user);

  const email = user?.email;
  const role = user?.role;

  return (
    <nav className="sticky top-0 z-40 h-18 bg-(--bg-surface) border-b border-(--border-default) backdrop-blur-sm">
      <div className="h-full px-(--space-2) sm:px-(--space-3) lg:px-(--space-4) flex items-center justify-between gap-(--space-3)">
        <div className="hidden sm:flex items-center min-w-0">
          <h1 className="text-sm font-semibold text-(--text-primary) truncate"></h1>
        </div>
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          aria-label="Menu"
          className="p-2 rounded-sm text-(--text-secondary) hover:bg-(--bg-elevated) transition-all duration-200 md:hidden"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
        {/* CENTER: Search Bar */}
        <div className="flex-1 max-w-lg">
          <div
            className={`relative h-9 rounded-md bg-(--bg-elevated) border transition-all duration-200 ${
              isFocused
                ? "border-(--primary) shadow-lg"
                : "border-(--border-default)"
            }`}
          >
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-full px-3 pl-9 text-sm bg-transparent text-(--text-primary) placeholder-(--text-muted) outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-secondary)" />
          </div>
        </div>
        {/* RIGHT: Actions & Profile */}
        <div className="flex items-center gap-(--space-2)">
          {/* Notification Icon */}
          <button
            onClick={onNotificationClick}
            aria-label="Notifications"
            className="p-2 rounded-sm text-(--text-secondary) hover:bg-(--bg-elevated) transition-all duration-200 cursor-pointer"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <button
            onClick={onProfileClick}
            aria-label="Profile"
            className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-(--bg-elevated) transition-all duration-200"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-(--primary-soft) border border-(--primary) flex items-center justify-center">
              <User className="w-4 h-4 text-(--primary)" />
            </div>

            {/* Profile Info - Desktop Only */}
            <div className="hidden md:flex flex-col items-start gap-0.5 min-w-0">
              <span className="text-xs font-semibold text-(--text-primary) truncate">
                {email}
              </span>
              <span className="text-xs text-(--text-muted) truncate">
                {role}
              </span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

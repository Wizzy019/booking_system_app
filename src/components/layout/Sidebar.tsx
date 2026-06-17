import {
  LogOut,
  Home,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type IconName = "home" | "calendar" | "chart" | "settings" | "help";

const iconMap = {
  home: Home,
  calendar: Calendar,
  chart: BarChart3,
  settings: Settings,
  help: HelpCircle,
} as const;

export interface SidebarItem {
  label: string;
  to: string;
  icon?: IconName;
}

interface SidebarProps {
  brandName?: string;
  logo?: IconName;
  navItems: SidebarItem[];
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

function Sidebar({
  brandName = "Apex Consulting",
  logo,
  navItems,
  isOpen,
  onClose,
  onLogout,
}: SidebarProps) {
  const LogoIcon = logo ? iconMap[logo] : undefined;

  const content = (
    <aside
      className={`flex h-full w-72 flex-col bg-(--bg-surface) border-r border-border-default md:fixed md:left-0 md:top-0 md:bottom-0 z-50`}
    >
      <div className="flex flex-col gap-2 border-b border-border-default px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary">
            {LogoIcon ? <LogoIcon className="h-5 w-5" /> : null}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">
              {brandName}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const ItemIcon = item.icon ? iconMap[item.icon] : undefined;

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-r-md border-l-4 border-transparent px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary-soft text-primary border-primary"
                        : "text-text-secondary hover:bg-bg-elevated"
                    } cursor-pointer`
                  }
                  onClick={onClose}
                >
                  {ItemIcon ? (
                    <span className="flex h-5 w-5 items-center justify-center text-text-secondary transition-all duration-200 group-hover:text-text-primary">
                      <ItemIcon className="h-5 w-5" />
                    </span>
                  ) : null}

                  <span className="truncate">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-border-default px-4 py-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-danger/20 bg-transparent px-3 py-2 text-sm font-semibold text-danger transition-all duration-200 hover:bg-danger/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div
        className={`absolute inset-0 z-50 bg-bg-app/70 transition-opacity duration-200 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <div
        className={`fixed left-0 top-0 h-full w-72 z-50 transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar drawer"
      >
        {content}
      </div>
      <div className="hidden md:block">{content}</div>
    </>
  );
}

export default Sidebar;

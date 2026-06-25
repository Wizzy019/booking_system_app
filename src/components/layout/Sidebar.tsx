import React from "react";
import { useAuthStore } from "../../features/auth/hooks/authStore";
import { LogOut } from "lucide-react";
const GridIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
  </svg>
);

// const CalendarIcon = () => (
//   <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
//     <path
//       fillRule="evenodd"
//       d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const UsersIcon = () => (
//   <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
//     <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//   </svg>
// );

// const SettingsIcon = () => (
//   <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
//     <path
//       fillRule="evenodd"
//       d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
        active
          ? "bg-(--primary-soft) text-(--primary)"
          : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-app)"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  return (
    <aside className="hidden h-screen lg:flex flex-col w-52 shrink-0 bg-(--bg-elevated) border-r border-(--border-default)">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-(--border-default)">
        <div className="w-8 h-8 rounded-lg bg-(--primary) flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M12 4L20 19H4L12 4Z" fill="white" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-(--text-primary) font-bold text-sm leading-tight">
            Apex
          </p>
          <p className="text-(--text-muted) text-[11px]">Consulting</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <NavItem icon={<GridIcon />} label="Dashboard" active />
        <NavItem icon={<ChatIcon />} label="Consultations" />
      </nav>
      <button
        onClick={logout}
        className="text-danger text-xl mb-5 border border-border-default "
      >
        <div className="flex items-center justify-center gap-1">
          {" "}
          <LogOut />
          Log Out
        </div>
      </button>
    </aside>
  );
}

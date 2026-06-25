import { EllipsisVertical, Grid, Users } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <a
      href="#"
      className={`flex flex-col items-center justify-between gap-1 rounded-full p-1 text-sm font-medium transition-colors ${
        active
          ? "text-(--primary)"
          : "text-(--text-secondary) hover:text-text-primary hover:bg-bg-app"
      }`}
    >
      <p>{icon}</p>
      <p className="text-[11px]">{label}</p>
    </a>
  );
}

const BottomNav = () => {
  return (
    <footer className=" flex md:hidden mb-0 bg-bg-elevated">
      <nav className="w-full flex justify-between space-y-0.5">
        <NavItem icon={<Users />} label="Consultations" />
        <NavItem icon={<Grid />} label="Dashboard" active />
        <NavItem icon={<EllipsisVertical />} label="More" />
      </nav>
    </footer>
  );
};

export default BottomNav;

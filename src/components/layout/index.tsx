import { CreditCard, Home, PieChart, User } from 'lucide-react';
import { Link, LinkProps, Outlet } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function Layout() {
  return (
    <main className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-scroll overflow-x-hidden">
        <Outlet />
      </div>
      <NavBar />
    </main>
  );
}

function NavBar() {
  return (
    <footer className="bottom-0 left-0 w-full border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] bg-white">
      <nav className="flex justify-around">
        <NavButton icon={<Home />} to="/" label="Home" />
        <NavButton icon={<PieChart />} to="category" label="Analytics" />
        <NavButton icon={<CreditCard />} to="2" label="Sources" />
        <NavButton icon={<User />} to="3" label="Profile" />
      </nav>
    </footer>
  );
}

function NavButton({
  icon,
  label,
  ...linkProps
}: { icon: React.ReactNode; label: string } & LinkProps) {
  return (
    <Link
      className="flex-1 flex justify-center items-center pt-2 pb-4"
      {...linkProps}
    >
      <Button variant="ghost" className="flex flex-col items-center">
        {icon}
        <span className="text-xs">{label}</span>
      </Button>
    </Link>
  );
}

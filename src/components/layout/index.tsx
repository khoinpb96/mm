import { Pencil2Icon } from '@radix-ui/react-icons';
import { Link, LinkProps, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className="h-screen pt-5 pb-5 relative">
      <Outlet />
      <NavBar />
    </main>
  );
}

function NavBar() {
  return (
    <div className="absolute w-full bottom-0 left-0 flex items-center">
      <NavButton icon={<Pencil2Icon />} to="/" />
      <NavButton icon={<Pencil2Icon />} to="category" />
      <NavButton icon={<Pencil2Icon />} to="2" />
      <NavButton icon={<Pencil2Icon />} to="3" />
    </div>
  );
}

function NavButton({
  icon,
  ...linkProps
}: { icon: React.ReactNode } & LinkProps) {
  return (
    <Link
      className="flex-1 flex justify-center items-center py-4"
      {...linkProps}
    >
      {icon}
    </Link>
  );
}

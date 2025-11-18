import { NavLink } from "react-router";
import type { ReactNode } from "react";

interface HeaderLinkProps {
  to: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function HeaderLink({ to, onClick, children, className }: HeaderLinkProps) {
  const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return `${className} ${isActive && "border border-gray-900 dark:border-white"} px-6 py-2 text-gray-900 dark:text-white text-center hover:bg-white/10 dark:hover:bg-white/10`;
  };

  return (
    <NavLink to={to} onClick={onClick} className={getLinkClasses}>
      {children}
    </NavLink>
  );
}

import type { ReactNode } from "react";
import { HeaderLink } from "./HeaderLink";

interface CartLinkProps {
  to: string;
  children: ReactNode;
}

export function CartLink({ to, children }: CartLinkProps) {
  return (
    <div className="relative">
      <HeaderLink to={to}>{children}</HeaderLink>
    </div>
  );
}

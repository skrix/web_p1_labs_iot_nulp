import type { ReactNode } from "react";
import { HeaderLink } from "./HeaderLink";
import { CartBadge } from "./CartBadge";

interface CartLinkProps {
  to: string;
  children: ReactNode;
  count: number;
}

export function CartLink({ to, children, count }: CartLinkProps) {
  return (
    <HeaderLink to={to} className="relative">
      {children}
      {!!count && <CartBadge count={count} />}
    </HeaderLink>
  );
}

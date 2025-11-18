import { Logo } from "./Logo";
import { HamburgerButton } from "./HamburgerButton";
import { HeaderLink } from "./HeaderLink";
import { CartLink } from "./CartLink";
import { HeaderUserProfile } from "./HeaderUserProfile";
import { useState } from "react";

interface HeaderAuthenticatedProps {
  cartItemCount: number;
  firstName: string;
  onLogout: () => void;
}

export function HeaderAuthenticated({
  cartItemCount,
  firstName,
  onLogout,
}: HeaderAuthenticatedProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/80 dark:bg-black/30 text-gray-900 dark:text-white backdrop-blur-sm py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <HeaderLink to="/">Головна</HeaderLink>
            <HeaderLink to="/catalog">Магазин</HeaderLink>
            <CartLink to="/cart" count={cartItemCount}>Кошик</CartLink>

            <HeaderUserProfile firstName={firstName} onLogout={onLogout} />
          </nav>

          <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4">
            <HeaderLink to="/" onClick={closeMenu}>
              Головна
            </HeaderLink>
            <HeaderLink to="/catalog" onClick={closeMenu}>
              Магазин
            </HeaderLink>
            <CartLink to="/cart" count={cartItemCount}>
              Кошик
            </CartLink>

            <HeaderUserProfile firstName={firstName} onLogout={() => {
              onLogout();
              closeMenu();
            }} />
          </nav>
        )}
      </div>
    </header>
  );
}

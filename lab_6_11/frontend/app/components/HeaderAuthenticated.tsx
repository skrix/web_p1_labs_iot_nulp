import { Logo } from "./Logo";
import { CartBadge } from "./CartBadge";
import { HamburgerButton } from "./HamburgerButton";
import { HeaderLink } from "./HeaderLink";
import { CartLink } from "./CartLink";
import { useState } from "react";

interface HeaderAuthenticatedProps {
  cartItemCount: number;
  username: string;
  onLogout: () => void;
}

export function HeaderAuthenticated({
  cartItemCount,
  username,
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
            <CartLink to="/cart">
              Кошик
              <CartBadge count={cartItemCount} />
            </CartLink>

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {username}
              </span>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-900 dark:border-white transition-colors"
              >
                Вийти
              </button>
            </div>
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
            <CartLink to="/cart">
              Кошик
              <CartBadge count={cartItemCount} />
            </CartLink>

            <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 px-6">
                {username}
              </p>
              <button
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
                className="w-full px-6 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-900 dark:border-white transition-colors"
              >
                Вийти
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

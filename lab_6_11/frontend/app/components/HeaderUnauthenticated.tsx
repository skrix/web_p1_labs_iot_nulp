import { Logo } from "./Logo";
import { HamburgerButton } from "./HamburgerButton";
import { HeaderLink } from "./HeaderLink";
import { useState } from "react";

export function HeaderUnauthenticated() {
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
            <HeaderLink to="/sign-in">Вхід</HeaderLink>
            <HeaderLink to="/sign-up">Реєстрація</HeaderLink>
          </nav>

          <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4">
            <HeaderLink to="/sign-in" onClick={closeMenu}>Вхід</HeaderLink>
            <HeaderLink to="/sign-up" onClick={closeMenu}>Реєстрація</HeaderLink>
          </nav>
        )}
      </div>
    </header>
  );
}

"use client";

import { NavLink } from "react-router";
import { Logo } from "./Logo";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { selectCartItemCount } from "../store/cartSlice";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = useAppSelector(selectCartItemCount);

  const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return `px-6 py-2 text-gray-900 dark:text-white text-center ${isActive ? "border border-gray-900 dark:border-white" : "hover:bg-white/10 dark:hover:bg-white/10"}`;
  };

  return (
    <header className="bg-white/80 dark:bg-black/30 text-gray-900 dark:text-white backdrop-blur-sm py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <NavLink to="/" className={getLinkClasses}>
              Головна
            </NavLink>
            <NavLink to="/catalog" className={getLinkClasses}>
              Магазин
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => `relative ${getLinkClasses({ isActive })}`}>
              Кошик
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={getLinkClasses}
            >
              Головна
            </NavLink>
            <NavLink
              to="/catalog"
              onClick={() => setIsMenuOpen(false)}
              className={getLinkClasses}
            >
              Магазин
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `relative ${getLinkClasses({ isActive })}`}
            >
              Кошик
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

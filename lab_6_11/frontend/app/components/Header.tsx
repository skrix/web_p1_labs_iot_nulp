"use client";

import { Link } from "react-router";
import { Logo } from "./Logo";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/30 backdrop-blur-sm text-white py-4 absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link
              to="/"
              className="px-6 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="px-6 py-2 hover:text-gray-300 transition-colors"
            >
              Catalog
            </Link>
            <Link
              to="/cart"
              className="px-6 py-2 hover:text-gray-300 transition-colors"
            >
              Cart
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm text-center"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-2 hover:text-gray-300 transition-colors text-center"
            >
              Catalog
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-2 hover:text-gray-300 transition-colors text-center"
            >
              Cart
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

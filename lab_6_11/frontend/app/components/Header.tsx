import { Link } from "react-router";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="bg-black/30 backdrop-blur-sm text-white py-4 absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="flex gap-6">
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
        </div>
      </div>
    </header>
  );
}

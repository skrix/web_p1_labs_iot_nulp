import { Link } from "react-router";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="flex gap-6">
            <Link
              to="/"
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition-colors"
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

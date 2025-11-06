import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">Third Wave Coffee Shop</h3>
            <p className="text-gray-600 text-sm max-w-xs">
              We're passionate about bringing you the finest coffee accessories, filters, and beans. Dedicated to helping you craft exceptional coffee, one cup at a time.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Logo />
            <SocialLinks />
          </div>
        </div>
        <div className="border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
          2024 © Third Wave Coffee Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

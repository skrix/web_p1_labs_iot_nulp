import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">Vasyl&Co</h3>
            <p className="text-gray-600 text-sm max-w-xs">
              Ми створюємо преміальні аксесуари для кави ручної роботи. Кожен продукт поєднує естетику мінімалізму та професійний підхід до заварювання кави.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Logo />
            <SocialLinks />
          </div>
        </div>
        <div className="border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
          2024 © Vasyl&Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

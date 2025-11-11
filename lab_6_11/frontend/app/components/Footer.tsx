import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-start justify-between mb-8 flex-col lg:flex-row">
          <div className="flex w-xs flex-col">
            <h3 className="font-mono text-lg mb-2">Vasyl&Co</h3>
            <p className="text-gray-600 text-sm">
              Ми створюємо преміальні аксесуари для кави ручної роботи.
              Кожен продукт поєднує естетику мінімалізму та професійний підхід до заварювання кави.
            </p>
          </div>
          <div className="flex w-xs items-center justify-center self-center">
            <Logo />
          </div>
          <div className="flex w-xs items-center gap-4">
            <SocialLinks />
          </div>
        </div>
        <div className="border-t border-white pt-4 text-center text-sm text-gray-600">
          2025 © Vasyl&Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

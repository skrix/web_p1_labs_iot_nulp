interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
      aria-label="Toggle menu"
    >
      <span
        className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
}

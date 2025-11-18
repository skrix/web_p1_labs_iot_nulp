interface HeaderUserProfileProps {
  firstName: string;
  onLogout: () => void;
}

export function HeaderUserProfile({
  firstName,
  onLogout,
}: HeaderUserProfileProps) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4 ml-4 pl-4 border-l border-gray-300 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {firstName}
        </span>
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-900 dark:border-white transition-colors"
        >
          Вийти
        </button>
      </div>

      {/* Mobile */}
      <div className="md:hidden border-t border-gray-300 dark:border-gray-700 pt-4 mt-2">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 px-6">
          {firstName}
        </p>
        <button
          onClick={onLogout}
          className="w-full px-6 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-900 dark:border-white transition-colors"
        >
          Вийти
        </button>
      </div>
    </>
  );
}

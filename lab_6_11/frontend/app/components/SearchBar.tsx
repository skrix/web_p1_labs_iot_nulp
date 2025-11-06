export function SearchBar() {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Пошук..."
        className="w-full px-6 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-400 transition-colors"
      />
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: Array<{ value: string; label: string }>;
}

export function FilterDropdown({ value, onChange, label, options }: FilterDropdownProps) {
  return (
    <div className="relative min-w-[180px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-3 pr-10 bg-gray-100 text-gray-900 focus:outline-none focus:bg-gray-200 appearance-none cursor-pointer transition-colors hover:bg-gray-200 font-medium"
      >
        <option value="" className="text-gray-900">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

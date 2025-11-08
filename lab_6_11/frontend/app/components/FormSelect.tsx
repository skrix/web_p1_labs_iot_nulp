export function FormSelect({
  label,
  error,
  touched,
  children,
  ...props
}: {
  label: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const hasError = touched && error;

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}
      </label>
      <select
        className={`w-full px-4 py-3 border ${
          hasError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
        } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem',
        }}
        {...props}
      >
        {children}
      </select>
      {hasError && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

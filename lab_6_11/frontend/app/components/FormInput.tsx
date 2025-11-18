export function FormInput({
  label,
  error,
  touched,
  ...props
}: {
  label: string;
  error?: string;
  touched?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const hasError = touched && error;

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
      >
        {label}
      </label>
      <input
        className={`w-full px-4 py-3 border ${
          hasError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-700 focus:ring-gray-900 dark:focus:ring-white'
        } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
        {...props}
      />
      {hasError && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

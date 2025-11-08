interface CartBadgeProps {
  count: number;
}

export function CartBadge({ count }: CartBadgeProps) {
  return (count &&
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
      {count}
    </span>
  );
}

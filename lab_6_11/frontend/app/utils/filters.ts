export function parsePriceRange(priceRange: string): { minPrice?: number; maxPrice?: number } {
  const ranges: Record<string, { minPrice?: number; maxPrice?: number }> = {
    "0-300": { maxPrice: 300 },
    "300-600": { minPrice: 300, maxPrice: 600 },
    "600-1000": { minPrice: 600, maxPrice: 1000 },
    "1000-1500": { minPrice: 1000, maxPrice: 1500 },
    "1500-2000": { minPrice: 1500, maxPrice: 2000 },
    "2000-3000": { minPrice: 2000, maxPrice: 3000 },
    "3000+": { minPrice: 3000 },
  };

  return ranges[priceRange] || {};
}

export const PRICE_RANGE_OPTIONS = [
  { value: "0-300", label: "До 300 ₴" },
  { value: "300-600", label: "300-600 ₴" },
  { value: "600-1000", label: "600-1000 ₴" },
  { value: "1000-1500", label: "1000-1500 ₴" },
  { value: "1500-2000", label: "1500-2000 ₴" },
  { value: "2000-3000", label: "2000-3000 ₴" },
  { value: "3000+", label: "Понад 3000 ₴" },
];

export const PAYMENT_METHOD_OPTIONS = [
  { value: "cash", label: "Готівка при отриманні" },
  { value: "card", label: "Банківська карта (Visa/Mastercard)" },
  { value: "online", label: "Онлайн оплата (Apple Pay/Google Pay)" },
  { value: "transfer", label: "Банківський переказ" },
];

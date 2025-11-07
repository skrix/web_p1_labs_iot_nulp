const currencySymbols: Record<string, string> = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export function getCurrencySymbol(currencyCode: string): string {
  return currencySymbols[currencyCode.toUpperCase()] || currencyCode;
}

export function formatPrice(price: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);
  return `${Number(price).toFixed(2)} ${symbol}`;
}

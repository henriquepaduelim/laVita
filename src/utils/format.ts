const currencyFormatters = new Map<number, Intl.NumberFormat>();
const numberFormatters = new Map<number, Intl.NumberFormat>();

function getCurrencyFormatter(digits: number) {
  if (!currencyFormatters.has(digits)) {
    currencyFormatters.set(
      digits,
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
      }),
    );
  }

  return currencyFormatters.get(digits)!;
}

function getNumberFormatter(digits: number) {
  if (!numberFormatters.has(digits)) {
    numberFormatters.set(
      digits,
      new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
      }),
    );
  }

  return numberFormatters.get(digits)!;
}

export function formatCurrency(value: number, digits = 0) {
  return getCurrencyFormatter(digits).format(value);
}

export function formatSignedCurrency(value: number, digits = 0) {
  const signal = value > 0 ? '+' : '';
  return `${signal}${formatCurrency(value, digits)}`;
}

export function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNumber(value: number, digits = 0) {
  return getNumberFormatter(digits).format(value);
}

export function formatPercent(value: number, digits = 1) {
  return `${formatNumber(value * 100, digits)}%`;
}

export function formatSignedPercent(value: number, digits = 1) {
  const signal = value > 0 ? '+' : '';
  return `${signal}${formatPercent(value, digits)}`;
}

export function formatRatio(value: number, digits = 2) {
  return formatNumber(value, digits);
}

export function formatPlainPercent(value: number, digits = 1) {
  return `${formatNumber(value, digits)}%`;
}

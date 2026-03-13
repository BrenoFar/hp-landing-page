// "31-07-1980" → "31/07/1980"
export function formatDate(date: string | undefined): string {
  if (!date) return "—";
  return date.replace(/-/g, "/");
}

// 11 (polegadas) → "27,9 cm"
export function formatWandLength(length: number | undefined): string {
  if (!length) return "—";
  const cm = (length * 2.54).toFixed(1).replace(".", ",");
  return `${cm} cm`;
}

export function formatNumber(
  value: number | string,
  decimals: number = 2
): string {
  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "-";
  const fixed = num.toFixed(decimals);
  return fixed.replace(/\.?0+$/, "");
}

export const dateMask = [
  /\d/, /\d/, '/',
  /\d/, /\d/, '/',
  /\d/, /\d/, /\d/, /\d/
];

export function parseDateFromString(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  if (
    !day || !month || !year ||
    day < 1 || day > 31 ||
    month < 1 || month > 12 ||
    year < 1900 || year > 2100
  ) return null;

  return new Date(year, month - 1, day);
}

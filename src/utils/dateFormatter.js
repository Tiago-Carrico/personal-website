/**
 * Formats a YYYY-MM date string into a localized format (e.g. "jan. 2023")
 * Returns "Present" if date is null. (The language is English but months are pt-PT as requested)
 */
export function formatDate(dateStr, locale = 'pt-PT') {
  if (!dateStr) return '';

  const [year, month] = dateStr.split('-');
  const date = new Date(year, parseInt(month) - 1);
  
  if (isNaN(date)) return dateStr;

  return date.toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric'
  });
}

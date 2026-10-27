// Bengali words converter and money formatters matching madrasha.hostzonebd.com

const bWords = [
  '', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ',
  'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোলো', 'সতেরো', 'আঠারো', 'উনিশ', 'বিশ',
  'একুশ', 'বাইশ', 'তেইশ', 'চব্বিশ', 'পঁচিশ', 'ছাব্বিশ', 'সাতাশ', 'আটাশ', 'ঊনত্রিশ', 'ত্রিশ',
  'একত্রিশ', 'বত্রিশ', 'তেত্রিশ', 'চৌত্রিশ', 'পঁয়ত্রিশ', 'ছত্রিশ', 'সাঁইত্রিশ', 'আটত্রিশ', 'ঊনচল্লিশ', 'চল্লিশ',
  'একচল্লিশ', 'বিয়াল্লিশ', 'তেতাল্লিশ', 'চুয়াল্লিশ', 'পঁয়তাল্লিশ', 'ছেচল্লিশ', 'সাতচল্লিশ', 'আটচল্লিশ', 'ঊনপঞ্চাশ', 'পঞ্চাশ',
  'একান্ন', 'বায়ান্ন', 'তিপ্পান্ন', 'চুয়ান্ন', 'পঞ্চান্ন', 'ছাপ্পান্ন', 'সাতান্ন', 'আটান্ন', 'ঊনষাট', 'ষাট',
  'একষট্টি', 'বাষট্টি', 'তেষট্টি', 'চৌষট্টি', 'পঁয়ষট্টি', 'ছেষট্টি', 'সাতষট্টি', 'আটষট্টি', 'ঊনসত্তর', 'সত্তর',
  'একাত্তর', 'বাহাত্তর', 'তিয়াত্তর', 'চৌহাত্তর', 'পঁচাত্তর', 'ছিয়াত্তর', 'সাতাত্তর', 'আটাত্তর', 'ঊনআশি', 'আশি',
  'একাশি', 'বিরাশি', 'তিরাশি', 'চৌরাশি', 'পঁচাশি', 'ছিয়াশি', 'সাতাশি', 'অষ্টআশি', 'ঊননব্বই', 'নব্বই',
  'একানব্বই', 'বানব্বই', 'তিরানব্বই', 'চুরানব্বই', 'পঁচানব্বই', 'ছিয়ানব্বই', 'সাতানব্বই', 'আটানব্বই', 'নিরানব্বই'
];

/**
 * Converts a numeric value into full Bengali words (e.g. 14254 -> 'চৌদ্দ হাজার দুই শত চুয়ান্ন')
 */
export function numberToBengaliWords(num) {
  const n = Math.floor(Math.abs(Number(num) || 0));
  if (n === 0) return 'শূন্য';

  let words = '';
  const crore = Math.floor(n / 10000000);
  let rem = n % 10000000;
  const lakh = Math.floor(rem / 100000);
  rem %= 100000;
  const thousand = Math.floor(rem / 1000);
  rem %= 1000;
  const hundred = Math.floor(rem / 100);
  rem %= 100;

  if (crore > 0) words += `${numberToBengaliWords(crore)} কোটি `;
  if (lakh > 0) words += `${bWords[lakh]} লাখ `;
  if (thousand > 0) words += `${bWords[thousand]} হাজার `;
  if (hundred > 0) words += `${bWords[hundred]} শত `;
  if (rem > 0) words += bWords[rem];

  const prefix = Number(num) < 0 ? 'ঋণাত্মক ' : '';
  return prefix + words.trim();
}

/**
 * Formats a number to standard English digits with comma separators and 2 decimal places (e.g. 14,254.00)
 */
export function formatMoney(num) {
  const n = Number(num) || 0;
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Formats date string (YYYY-MM-DD) to DD/MM/YYYY
 */
export function formatDateDDMMYYYY(dateStr) {
  if (!dateStr) return '';
  const cleanStr = String(dateStr).split('T')[0];
  const parts = cleanStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  }
  return dateStr;
}

/**
 * Normalizes any date string (DD/MM/YYYY, YYYY-MM-DD, DD-MM-YYYY, YYYY/MM/DD, ISO) to standard YYYY-MM-DD
 */
export function toStandardDateStr(dStr) {
  if (!dStr) return '';
  const s = String(dStr).trim().split('T')[0].split(' ')[0];
  const sep = s.includes('/') ? '/' : s.includes('-') ? '-' : null;
  if (sep) {
    const parts = s.split(sep);
    if (parts.length === 3) {
      const [p1, p2, p3] = parts;
      if (p1.length === 4) {
        return `${p1}-${p2.padStart(2, '0')}-${p3.padStart(2, '0')}`;
      } else if (p3.length === 4) {
        return `${p3.padStart(4, '20')}-${p2.padStart(2, '0')}-${p1.padStart(2, '0')}`;
      }
    }
  }
  return s;
}


// Bangla digits mapping
const banglaDigits: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const englishDigits: { [key: string]: string } = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

export function toBanglaNumber(input: number | string): string {
  const str = input.toString();
  return str.replace(/[0-9]/g, (digit) => banglaDigits[digit] || digit);
}

export function toEnglishNumber(input: string): string {
  return input.replace(/[০-৯]/g, (digit) => englishDigits[digit] || digit);
}

export function formatCurrency(amount: number, lang: 'bn' | 'en' = 'bn'): string {
  if (lang === 'bn') {
    return `৳ ${toBanglaNumber(amount.toLocaleString('en-IN'))}`;
  }
  return `BDT ${amount.toLocaleString('en-US')}`;
}

export function formatDate(dateString: string, lang: 'bn' | 'en' = 'bn'): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;

  if (lang === 'bn') {
    const day = toBanglaNumber(d.getDate());
    const year = toBanglaNumber(d.getFullYear());
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    return `${day} ${months[d.getMonth()]}, ${year}`;
  }

  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}


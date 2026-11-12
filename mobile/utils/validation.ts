import { toEnglishNumber } from './formatting';

export function validatePhoneNumber(phone: string): { isValid: boolean; errorKey?: string } {
  const normalized = toEnglishNumber(phone).replace(/\s|-/g, '');
  // Matches Bangladesh mobile numbers: 013, 014, 015, 016, 017, 018, 019 with 11 digits (or +8801...)
  const bdPhoneRegex = /^(?:\+?880)?1[3-9]\d{8}$/;
  if (!normalized) {
    return { isValid: false, errorKey: 'phone_required' };
  }
  if (!bdPhoneRegex.test(normalized)) {
    return { isValid: false, errorKey: 'phone_invalid' };
  }
  return { isValid: true };
}

export function validateNID(nid: string): { isValid: boolean; errorKey?: string } {
  const normalized = toEnglishNumber(nid).trim();
  if (!normalized) {
    return { isValid: false, errorKey: 'nid_required' };
  }
  // Smart NID: 10 digits; Old NID: 13 or 17 digits
  const nidRegex = /^(\d{10}|\d{13}|\d{17})$/;
  if (!nidRegex.test(normalized)) {
    return { isValid: false, errorKey: 'nid_invalid' };
  }
  return { isValid: true };
}

export function validateEmail(email: string): { isValid: boolean; errorKey?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return { isValid: true }; // optional
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, errorKey: 'email_invalid' };
  }
  return { isValid: true };
}

export function validateRequired(value: any): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
}


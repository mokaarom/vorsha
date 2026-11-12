import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bn from './bn.json';
import en from './en.json';
import { Config } from '../constants/config';

export const resources = {
  bn: { translation: bn },
  en: { translation: en },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: Config.DEFAULT_LANGUAGE,
  fallbackLng: Config.FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

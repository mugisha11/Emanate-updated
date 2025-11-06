import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import sw from './locales/sw.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  sw: { translation: sw },
  fr: { translation: fr },
};

const saved = typeof window !== 'undefined' ? (localStorage.getItem('emanate_lang') ?? 'en') : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: saved,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

// Ensure document language attribute is set
try {
  if (typeof document !== 'undefined') document.documentElement.lang = i18n.language || 'en';
} catch (e) {
  // ignore
}

export default i18n;

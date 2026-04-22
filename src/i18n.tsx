import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { en } from './locales/en';
import { nl } from './locales/nl';

type Locale = 'en' | 'nl';
type Translations = typeof en;

interface I18nContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode, defaultLocale?: Locale }> = ({ children, defaultLocale = 'nl' }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const t = locale === 'en' ? en : nl;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

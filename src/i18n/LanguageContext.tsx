'use client'

import * as React from 'react'
import { translations, type Locale, type TranslationKey } from './translations'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored === 'en' || stored === 'fr') return stored
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(getInitialLocale)

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale === 'fr' ? 'fr-CA' : 'en'
  }, [])

  const t = React.useCallback(
    (key: TranslationKey): string => {
      const resolve = (obj: unknown, path: string): unknown => {
        const segments = path.split('.')
        let current: unknown = obj
        for (const segment of segments) {
          if (current == null || typeof current !== 'object') return undefined
          current = (current as Record<string, unknown>)[segment]
        }
        return current
      }
      const value = resolve(translations[locale], key) ?? resolve(translations.en, key) ?? key
      return typeof value === 'string' ? value : key
    },
    [locale]
  )

  React.useEffect(() => {
    document.documentElement.lang = locale === 'fr' ? 'fr-CA' : 'en'
  }, [locale])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir: 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLocale(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLocale must be used within a LanguageProvider')
  }
  return ctx
}

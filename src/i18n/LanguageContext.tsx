'use client'

import * as React from 'react'
import { translations, type Locale, type TranslationKey } from './translations'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  localizedHref: (href: string) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

const LOCALE_PATTERN = /^\/(en|fr)(\/|$)/

function parseHash(hash: string): { locale: Locale; section: string | null } {
  const inner = hash.replace(/^#/, '')
  const match = inner.match(LOCALE_PATTERN)
  if (match) {
    const rest = inner.slice(match[0].length)
    return { locale: match[1] as Locale, section: rest || null }
  }
  return { locale: 'en', section: null }
}

function buildHash(locale: Locale, section: string | null): string {
  return `#/${locale}${section ? '/' + section : ''}`
}

function hasLocalePrefix(hash: string): boolean {
  return LOCALE_PATTERN.test(hash.replace(/^#/, ''))
}

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const { locale } = parseHash(window.location.hash)
    if (locale === 'en' || locale === 'fr') return locale
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
    if (typeof window !== 'undefined') {
      const { section } = parseHash(window.location.hash)
      window.location.hash = buildHash(newLocale, section)
    }
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

  const localizedHref = React.useCallback(
    (href: string) => {
      if (href.startsWith('#') && !href.startsWith('#/')) {
        const section = href.replace(/^#/, '')
        return buildHash(locale, section)
      }
      return href
    },
    [locale]
  )

  React.useEffect(() => {
    document.documentElement.lang = locale === 'fr' ? 'fr-CA' : 'en'
  }, [locale])

  React.useEffect(() => {
    const handleHashChange = () => {
      const { locale: next } = parseHash(window.location.hash)
      if (next !== locale) {
        setLocaleState(next)
        localStorage.setItem('locale', next)
        document.documentElement.lang = next === 'fr' ? 'fr-CA' : 'en'
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [locale])

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !hasLocalePrefix(window.location.hash)) {
      const inner = window.location.hash.replace(/^#/, '')
      const section = inner ? inner.replace(/^\//, '') : null
      window.location.replace(buildHash(locale, section))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, localizedHref, dir: 'ltr' }}>
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

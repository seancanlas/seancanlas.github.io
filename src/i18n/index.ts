import { translations, type Locale } from './translations'

export type { Locale, TranslationKey } from './translations'

export const locales: Locale[] = ['en', 'fr']

export const paths: Record<Locale, string> = {
  en: '/',
  fr: '/fr/',
}

function resolve(source: unknown, path: string): unknown {
  let current = source
  for (const segment of path.split('.')) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[segment]
  }
  return current
}

export function t(locale: Locale, key: string): string {
  const value = resolve(translations[locale], key) ?? resolve(translations.en, key) ?? key
  return typeof value === 'string' ? value : key
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'fr' : 'en'
}

export function languageTag(locale: Locale): string {
  return locale === 'fr' ? 'fr-CA' : 'en'
}

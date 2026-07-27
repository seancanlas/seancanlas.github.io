'use client'

import { useLocale } from '@/i18n/LanguageContext'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="w-3 h-3 text-text-muted shrink-0" />
      <div className="flex items-center bg-bg-base rounded-full border border-border-muted p-0.5">
        <button
          onClick={() => setLocale('en')}
          className={cn(
            'px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-ts',
            locale === 'en'
              ? 'bg-brand-ts/20 text-brand-ts font-semibold'
              : 'text-text-muted hover:text-text-secondary'
          )}
          aria-label="English"
        >
          EN
        </button>
        <button
          onClick={() => setLocale('fr')}
          className={cn(
            'px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-ts',
            locale === 'fr'
              ? 'bg-brand-ts/20 text-brand-ts font-semibold'
              : 'text-text-muted hover:text-text-secondary'
          )}
          aria-label="Français"
        >
          FR
        </button>
      </div>
    </div>
  )
}

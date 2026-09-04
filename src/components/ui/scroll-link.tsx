'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/i18n/LanguageContext'

interface ScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
}

export function ScrollLink({
  href,
  className,
  onClick,
  ...props
}: ScrollLinkProps) {
  const { localizedHref } = useLocale()
  const localized = localizedHref(href)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.replace(/^#/, '').replace(/^\/(en|fr)\//, '')
      const target = document.getElementById(targetId)
      if (target) {
        // scrollIntoView respects the section's `scroll-margin-top`, which
        // is set on the Section component to clear the fixed navbar.
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        target.focus({ preventScroll: true })
      }
      window.location.hash = localized
    }
    onClick?.(e)
  }

  return (
    <a
      href={localized}
      onClick={handleClick}
      className={cn(className)}
      {...props}
    />
  )
}
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
        // Measure the actual fixed header at runtime and scroll so the
        // section's top edge sits flush against the bottom of the header.
        // Using getBoundingClientRect + window.scrollTo with the real
        // measured offset (instead of a hardcoded guess) avoids the
        // previous section's bottom peeking through.
        const header = document.querySelector<HTMLElement>('header[role="banner"]')
        const headerHeight = header ? header.getBoundingClientRect().height : 64
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset
        const scrollY = Math.max(0, targetTop - headerHeight)

        window.scrollTo({ top: scrollY, behavior: 'smooth' })
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
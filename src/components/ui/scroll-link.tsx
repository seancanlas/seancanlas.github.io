'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href) as HTMLElement | null
      if (target) {
        const headerOffset = 80
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })

        target.focus({ preventScroll: true })
      }
    }
    onClick?.(e)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(className)}
      {...props}
    />
  )
}
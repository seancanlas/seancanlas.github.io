import * as React from 'react'
import { cn } from '@/lib/utils'
import { badgeVariants, type BadgeBrand } from './badge-variants'

export type { BadgeBrand }

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | BadgeBrand
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
export { getBrandVariant } from './badge-variants'

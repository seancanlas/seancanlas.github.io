import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'brand-ts' | 'brand-php' | 'brand-react' | 'brand-node' | 'brand-pg' | 'brand-maple' | 'brand-symfony' | 'brand-docker'
}

const badgeVariants = {
  default: 'bg-brand-ts/10 text-brand-ts border border-brand-ts/20',
  secondary: 'bg-bg-hover text-text-secondary border border-border-muted',
  destructive: 'bg-red-600/10 text-red-400 border border-red-600/20',
  outline: 'text-text-primary border border-border-muted',
  'brand-ts': 'bg-brand-ts/10 text-brand-ts border border-brand-ts/20',
  'brand-php': 'bg-brand-php/10 text-brand-php border border-brand-php/20',
  'brand-react': 'bg-brand-react/10 text-brand-react border border-brand-react/20',
  'brand-node': 'bg-brand-node/10 text-brand-node border border-brand-node/20',
  'brand-pg': 'bg-brand-pg/10 text-brand-pg border border-brand-pg/20',
  'brand-maple': 'bg-brand-maple/10 text-brand-maple border border-brand-maple/20',
  'brand-symfony': 'bg-brand-symfony/10 text-brand-symfony border border-brand-symfony/20',
  'brand-docker': 'bg-brand-docker/10 text-brand-docker border border-brand-docker/20',
} as const

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
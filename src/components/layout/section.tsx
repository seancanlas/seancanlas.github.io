import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  className?: string
}

export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative w-full py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ size = 'lg', className, children, ...props }: ContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[80rem]',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: number
  responsive?: boolean
}

export function Grid({ cols = 3, gap = 6, responsive = true, className, children, ...props }: GridProps) {
  const responsiveClasses = responsive
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : `grid-cols-${cols}`

  return (
    <div
      className={cn('grid gap-6 sm:gap-8', `gap-${gap}`, responsiveClasses, className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: number
  wrap?: boolean
}

export function Flex({
  direction = 'row',
  align = 'center',
  justify = 'start',
  gap = 4,
  wrap = false,
  className,
  children,
  ...props
}: FlexProps) {
  return (
    <div
      className={cn(
        'flex',
        `flex-${direction}`,
        `items-${align}`,
        `justify-${justify}`,
        `gap-${gap}`,
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
import * as React from 'react'
import { cn } from '@/lib/utils'

export type BadgeBrand =
  | 'brand-ts'
  | 'brand-php'
  | 'brand-react'
  | 'brand-node'
  | 'brand-pg'
  | 'brand-maple'
  | 'brand-symfony'
  | 'brand-docker'
  | 'brand-python'
  | 'brand-fastapi'
  | 'brand-redis'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | BadgeBrand
}

/**
 * Shared pill/badge used across the site (Stack panels, Portfolio "Tech
 * Highlights", AI agentic disclosure tools/models, etc.).
 *
 * Brand variants render with the framework's signature color — text and
 * border use the solid brand token, background uses a soft (semi-transparent)
 * brand token so the pill reads as "branded" while keeping text legible.
 */
const badgeVariants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-brand-ts-soft text-brand-ts border border-brand-ts-border',
  secondary: 'bg-bg-hover text-text-secondary border border-border-muted',
  destructive: 'bg-red-600/10 text-red-400 border border-red-600/20',
  outline: 'text-text-primary border border-border-muted',
  'brand-ts': 'bg-brand-ts-soft text-brand-ts border border-brand-ts-border',
  'brand-php': 'bg-brand-php-soft text-brand-php border border-brand-php-border',
  'brand-react': 'bg-brand-react-soft text-brand-react border border-brand-react-border',
  'brand-node': 'bg-brand-node-soft text-brand-node border border-brand-node-border',
  'brand-pg': 'bg-brand-pg-soft text-brand-pg border border-brand-pg-border',
  'brand-maple': 'bg-brand-maple-soft text-brand-maple border border-brand-maple-border',
  'brand-symfony': 'bg-brand-symfony-soft text-brand-symfony border border-brand-symfony-border',
  'brand-docker': 'bg-brand-docker-soft text-brand-docker border border-brand-docker-border',
  'brand-python': 'bg-brand-python-soft text-brand-python border border-brand-python-border',
  'brand-fastapi': 'bg-brand-fastapi-soft text-brand-fastapi border border-brand-fastapi-border',
  'brand-redis': 'bg-brand-redis-soft text-brand-redis border border-brand-redis-border',
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }

/**
 * Maps a tech/framework name to the appropriate brand variant. Returns
 * `undefined` when no brand color applies so callers can fall back.
 */
export function getBrandVariant(name: string): BadgeBrand | undefined {
  const normalized = name.toLowerCase().trim()
  // PHP ecosystem
  if (/php|laravel|twig|phpstorm|composer/.test(normalized)) return 'brand-php'
  // JavaScript / TypeScript
  if (/typescript|next\.?js|nx\b/.test(normalized)) return 'brand-ts'
  if (/react|next\.?js/.test(normalized)) return 'brand-react'
  if (/vue\b|nuxt/.test(normalized)) return 'brand-ts'
  if (/javascript/.test(normalized)) return 'brand-ts'
  if (/tailwind/.test(normalized)) return 'brand-ts'
  if (/node\.?js|express|fastify/.test(normalized)) return 'brand-node'
  // Frameworks
  if (/symfony/.test(normalized)) return 'brand-symfony'
  if (/django/.test(normalized)) return 'brand-python'
  if (/python|fastapi|flask|pydantic/.test(normalized)) return 'brand-python'
  if (/fastapi/.test(normalized)) return 'brand-fastapi'
  // Data
  if (/postgres|postgresql|\bpg\b/.test(normalized)) return 'brand-pg'
  if (/mysql|mariadb/.test(normalized)) return 'brand-php'
  if (/redis|memcached/.test(normalized)) return 'brand-redis'
  if (/mongo|elasticsearch/.test(normalized)) return 'brand-node'
  // DevOps
  if (/docker|kubernetes|k8s|container/.test(normalized)) return 'brand-docker'
  if (/linux|nginx|apache|server/.test(normalized)) return 'brand-docker'
  if (/gitlab|github|ci\/cd|actions|pipeline/.test(normalized)) return 'brand-maple'
  // AI tooling — neutral ts
  if (/claude|opencode|codex|copilot|gpt|sonnet|minimax|spark|nemotron|deepseek|model|llm/.test(normalized)) return 'brand-ts'
  return undefined
}

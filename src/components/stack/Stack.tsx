'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { techStack } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { Section, Container } from '@/components/layout/section'
import { Code2, Database, Wrench, Sparkles, Layers, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/i18n/LanguageContext'
import { translations } from '@/i18n/translations'

const CATEGORIES = ['all', 'language', 'framework', 'database', 'tool'] as const
type Category = typeof CATEGORIES[number]

const categoryIcons: Record<Category, React.ReactNode> = {
  all: <Layers className="w-4 h-4" />,
  language: <Code2 className="w-4 h-4" />,
  framework: <Cpu className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  tool: <Wrench className="w-4 h-4" />,
}

const techKeyMap: Record<string, string> = {
  'OpenCode': 'OpenCode',
  'PHP 8.3': 'PHP83',
  'Symfony 7': 'Symfony7',
  'Twig 3': 'Twig3',
  'TypeScript 5': 'TypeScript5',
  'React 18': 'React18',
  'NodeJS': 'NodeJS',
  'PostgreSQL 16': 'PostgreSQL16',
  'JavaScript (ES2024)': 'JavaScript',
  'Laravel 11': 'Laravel11',
  'Vue.js 3': 'Vue3',
  'Java 17/21': 'Java',
  'MySQL 8': 'MySQL8',
  'Redis': 'Redis',
  'Docker': 'Docker',
  'GitLab CI/CD': 'GitLabCI',
  'GitHub Actions': 'GitHubActions',
  'Linux / Nginx': 'LinuxNginx',
  'Tailwind CSS': 'TailwindCSS',
}

export function Stack() {
  const { t, locale } = useLocale()
  const [activeCategory, setActiveCategory] = React.useState<Category>('all')

  const filteredStack = React.useMemo(() => {
    if (activeCategory === 'all') return techStack
    return techStack.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <Section id="stack" className="bg-bg-base/60 relative">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="brand-ts" className="mb-3 px-3 py-1 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-react" />
            {t('stack.badge')}
          </Badge>
          <h2 className="text-fluid-3xl sm:text-fluid-4xl font-extrabold tracking-tight text-text-primary mb-4 whitespace-nowrap">
            {t('stack.heading')}
          </h2>
          <p className="text-fluid-base text-text-secondary leading-relaxed">
            {t('stack.intro')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10" role="tablist" aria-label="Filter technologies">
          {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-fluid-sm font-medium transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ts focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep',
              activeCategory === cat
                ? 'bg-brand-ts text-white shadow-md shadow-brand-ts/20'
                : 'bg-bg-elevated/80 text-text-secondary hover:text-text-primary hover:bg-bg-hover border border-border-muted'
            )}
          >
            {categoryIcons[cat]}
            <span>
              {cat === 'all' && t('stack.filterAll')}
              {cat === 'language' && t('stack.filterLanguages')}
              {cat === 'framework' && t('stack.filterFrameworks')}
              {cat === 'database' && t('stack.filterDatabases')}
              {cat === 'tool' && t('stack.filterTools')}
            </span>
          </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredStack.map((item) => {
              const suffix = techKeyMap[item.name]
              const td = suffix
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ? (translations as any)[locale]?.stack?.[`td_${suffix}`] ?? (translations as any).en.stack?.[`td_${suffix}`]
                : undefined
              const d = td?.desc ?? 'Core development tool used across production web projects.'

              return (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-2xl glass p-5 flex flex-col justify-between hover:border-brand-ts/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-ts/5"
                >
                  <div>
                    <h3 className="text-fluid-base font-bold text-text-primary group-hover:text-brand-ts transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-fluid-xs text-text-muted capitalize">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-fluid-xs text-text-secondary leading-relaxed mt-3">
                    {d}
                  </p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Primary Language Focus Note */}
        <div className="mt-12 p-6 rounded-2xl glass border border-border-muted text-center max-w-2xl mx-auto space-y-2">
          <p className="text-fluid-sm font-medium text-text-primary">
            {t('stack.focusLabel')} {t('stack.focusText')}
          </p>
          <p className="text-fluid-xs text-text-muted">
            {t('stack.focusNote')}
          </p>
        </div>

      </Container>
    </Section>
  )
}
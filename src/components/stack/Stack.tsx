'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { techStack } from '@/lib/constants'
import { Section, Container } from '@/components/layout/section'
import { Code2, Database, Wrench, Layers, Cpu, Sparkles } from 'lucide-react'
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
  'Claude Code': 'ClaudeCode',
  'PhpStorm': 'PhpStorm',
  'PHP': 'PHP',
  'Laravel': 'Laravel',
  'Symfony': 'Symfony',
  'Node.js': 'NodeJS',
  'Vue': 'Vue',
  'React': 'React',
  'JavaScript': 'JavaScript',
  'TypeScript': 'TypeScript',
  'MySQL': 'MySQL',
  'PostgreSQL': 'PostgreSQL',
  'Redis': 'Redis',
  'Twig': 'Twig',
  'Tailwind CSS': 'TailwindCSS',
  'Docker': 'Docker',
  'Linux / Nginx': 'LinuxNginx',
  'GitLab CI/CD': 'GitLabCI',
  'GitHub Actions': 'GitHubActions',
}

const AI_TOOLS = ['Claude Code', 'Codex', 'OpenCode']

const AI_MODELS = ['Sonnet (various releases)', 'GPT 5.6', 'MiniMax M3', 'Muse Spark 1.3 Free', 'Nemotron 3.5 Lightning', 'DeepSeek V4 Flash']

export function Stack() {
  const { t, locale } = useLocale()
  const [activeCategory, setActiveCategory] = React.useState<Category>('all')

  const filteredStack = React.useMemo(() => {
    if (activeCategory === 'all') return techStack
    return techStack.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <Section id="stack" className="bg-bg-base/60 relative border-y border-border-subtle">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-fluid-3xl sm:text-fluid-4xl font-extrabold tracking-tight text-text-primary mb-4 whitespace-normal break-normal text-balance sm:whitespace-nowrap">
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
                  className="group relative rounded-2xl glass p-5 flex h-full flex-col justify-start hover:border-brand-ts/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-ts/5"
                >
                  <div className="min-h-12">
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

        {/* AI Agentic Build Disclosure */}
        <aside aria-labelledby="ai-build-heading" className="mt-10 rounded-2xl glass border border-border-muted p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-bg-elevated border border-border-muted flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-ts" aria-hidden="true" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 id="ai-build-heading" className="text-fluid-base font-bold text-text-primary">
                  {t('stack.aiTitle')}
                </h3>
                <p className="text-fluid-sm text-text-secondary leading-relaxed">
                  {t('stack.aiBody')}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-fluid-xs font-semibold uppercase tracking-wider text-text-muted">
                  {t('stack.aiToolsLabel')}
                </p>
                <ul className="flex flex-wrap gap-1.5" aria-label={t('stack.aiToolsLabel')}>
                  {AI_TOOLS.map((tool) => (
                    <li
                      key={tool}
                      className="inline-flex items-center text-fluid-xs px-2.5 py-1 rounded-md bg-bg-base/80 text-text-secondary border border-border-subtle"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-fluid-xs font-semibold uppercase tracking-wider text-text-muted">
                  {t('stack.aiModelsLabel')}
                </p>
                <ul className="flex flex-wrap gap-1.5" aria-label={t('stack.aiModelsLabel')}>
                  {AI_MODELS.map((model) => (
                    <li
                      key={model}
                      className="inline-flex items-center text-fluid-xs px-2.5 py-1 rounded-md bg-bg-base/80 text-text-secondary border border-border-subtle"
                    >
                      {model}
                    </li>
                  ))}
                </ul>
                <p className="text-fluid-xs text-text-muted">
                  {t('stack.aiModelsMore')}
                </p>
              </div>
            </div>
          </div>
        </aside>

      </Container>
    </Section>
  )
}
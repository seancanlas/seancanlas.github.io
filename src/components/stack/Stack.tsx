'use client'

import { Section, Container } from '@/components/layout/section'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/i18n/LanguageContext'

interface PanelDef {
  id: string
  titleKey: string
  descKey: string
  highlight?: boolean
  stack: string[]
}

const PANELS: PanelDef[] = [
  {
    id: 'core',
    titleKey: 'stack.panels.core.title',
    descKey: 'stack.panels.core.desc',
    highlight: true,
    stack: ['PHP', 'Symfony', 'Laravel', 'Node.js', 'TypeScript'],
  },
  {
    id: 'frontend',
    titleKey: 'stack.panels.frontend.title',
    descKey: 'stack.panels.frontend.desc',
    stack: ['React', 'Vue', 'JavaScript', 'Tailwind CSS', 'Twig'],
  },
  {
    id: 'data',
    titleKey: 'stack.panels.data.title',
    descKey: 'stack.panels.data.desc',
    stack: ['PostgreSQL', 'MySQL', 'Redis'],
  },
  {
    id: 'tools',
    titleKey: 'stack.panels.tools.title',
    descKey: 'stack.panels.tools.desc',
    stack: [
      'Docker',
      'Linux / Nginx',
      'GitLab CI/CD',
      'GitHub Actions',
      'PhpStorm',
      'Claude Code',
      'OpenCode',
    ],
  },
]

const BRAND_COLORS: Record<string, string> = {
  'PHP': 'text-brand-php border-brand-php/40',
  'Symfony': 'text-brand-symfony border-brand-symfony/40',
  'Laravel': 'text-brand-php border-brand-php/40',
  'Node.js': 'text-brand-node border-brand-node/40',
  'TypeScript': 'text-brand-ts border-brand-ts/40',
  'React': 'text-brand-react border-brand-react/40',
  'Vue': 'text-brand-ts border-brand-ts/40',
  'JavaScript': 'text-brand-ts border-brand-ts/40',
  'Tailwind CSS': 'text-brand-ts border-brand-ts/40',
  'Twig': 'text-brand-php border-brand-php/40',
  'PostgreSQL': 'text-brand-pg border-brand-pg/40',
  'MySQL': 'text-brand-php border-brand-php/40',
  'Redis': 'text-brand-redis border-brand-redis/40',
  'Docker': 'text-brand-docker border-brand-docker/40',
  'Linux / Nginx': 'text-brand-docker border-brand-docker/40',
  'GitLab CI/CD': 'text-brand-maple border-brand-maple/40',
  'GitHub Actions': 'text-brand-maple border-brand-maple/40',
  'PhpStorm': 'text-brand-php border-brand-php/40',
  'Claude Code': 'text-brand-ts border-brand-ts/40',
  'OpenCode': 'text-brand-ts border-brand-ts/40',
}

const AI_TOOLS = ['Claude Code', 'Codex', 'OpenCode']

const AI_MODELS = [
  'Sonnet (various releases)',
  'GPT 5.6',
  'MiniMax M3',
  'Muse Spark 1.3 Free',
  'Nemotron 3.5 Lightning',
  'DeepSeek V4 Flash',
]

export function Stack() {
  const { t } = useLocale()

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

        {/* 4 Vertical Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PANELS.map((panel) => (
            <div
              key={panel.id}
              className={cn(
                'bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200',
                panel.highlight
                  ? 'border-l-4 border-l-blue-500 shadow-lg shadow-blue-500/10'
                  : 'border-l-4 border-l-neutral-800'
              )}
            >
              <div>
                <h3 className="text-xl font-bold text-white">
                  {t(panel.titleKey)}
                </h3>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                  {t(panel.descKey)}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2" aria-label={t(panel.titleKey)}>
                {panel.stack.map((item) => {
                  const brandClass = BRAND_COLORS[item] ?? 'text-neutral-200 border-neutral-700'
                  return (
                    <span
                      key={item}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 border bg-neutral-800',
                        brandClass
                      )}
                    >
                      {item}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* AI Agentic Build Disclosure */}
        <aside
          aria-labelledby="ai-build-heading"
          className="mt-10 rounded-2xl glass border border-border-muted p-6 sm:p-8"
        >
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

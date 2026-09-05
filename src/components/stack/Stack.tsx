'use client'

import { Section, Container } from '@/components/layout/section'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/i18n/LanguageContext'
import { Badge, getBrandVariant, type BadgeBrand } from '@/components/ui/badge'

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
      'Linux',
      'Nginx',
      'GitLab CI/CD',
      'GitHub Actions',
      'PhpStorm',
      'Claude Code',
      'OpenCode',
    ],
  },
]

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
                'bg-bg-elevated border border-border-muted rounded-2xl p-6 flex flex-col justify-between transition-all duration-200',
                panel.highlight
                  ? 'border-l-4 border-l-blue-500 shadow-lg shadow-blue-500/10'
                  : 'border-l-4 border-l-border-subtle'
              )}
            >
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {t(panel.titleKey)}
                </h3>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  {t(panel.descKey)}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2" aria-label={t(panel.titleKey)}>
                {panel.stack.map((item) => {
                  const variant = getBrandVariant(item) as BadgeBrand | undefined
                  return (
                    <Badge
                      key={item}
                      variant={variant ?? 'secondary'}
                      className="text-sm py-1.5"
                    >
                      {item}
                    </Badge>
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
                <div className="flex flex-wrap gap-1.5" aria-label={t('stack.aiToolsLabel')}>
                  {AI_TOOLS.map((tool) => {
                    const variant = getBrandVariant(tool) as BadgeBrand | undefined
                    return (
                      <Badge
                        key={tool}
                        variant={variant ?? 'secondary'}
                      >
                        {tool}
                      </Badge>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-fluid-xs font-semibold uppercase tracking-wider text-text-muted">
                  {t('stack.aiModelsLabel')}
                </p>
                <div className="flex flex-wrap gap-1.5" aria-label={t('stack.aiModelsLabel')}>
                  {AI_MODELS.map((model) => {
                    const variant = getBrandVariant(model) as BadgeBrand | undefined
                    return (
                      <Badge
                        key={model}
                        variant={variant ?? 'secondary'}
                      >
                        {model}
                      </Badge>
                    )
                  })}
                </div>
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

'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { projects } from '@/lib/constants'
import type { ProjectAccent } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Section, Container } from '@/components/layout/section'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ExternalLink, Layers, Zap, Database, Server, CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon, Hammer } from 'lucide-react'
import { useLocale } from '@/i18n/LanguageContext'
import { useTheme } from '@/hooks/useTheme'

/**
 * Fallback palette (MapleLineCards red) used when a project omits
 * its `mainColour` field. Every project should eventually specify its own.
 */
const fallbackAccent: ProjectAccent = {
  bg: 'red-500',
  text: 'white',
  border: 'red-500',
  shadow: 'red-500',
}

/**
 * Resolve the set of Tailwind utility classes for the active project's
 * accent palette.  We build literal class-name strings so that Tailwind's
 * JIT scanner can discover them statically (dynamic template literals like
 * `bg-${accent.bg}` are invisible to the scanner in the v4 alpha).
 */
const accentClassMap: Record<string, { btn: string; border: string; shadow?: string; hoverBg: string }> = {
  'red-500': {
    btn: 'bg-red-500 text-white',
    border: 'border-red-500',
    shadow: 'shadow-red-500',
    hoverBg: 'hover:bg-red-500',
  },
  'brand-craveit': {
    btn: 'bg-brand-craveit text-white',
    border: 'border-brand-craveit',
    hoverBg: 'hover:bg-brand-craveit',
  },
}

const resolveAccentClasses = (accent: ProjectAccent) => {
  const map = accentClassMap[accent.bg] ?? accentClassMap['red-500']
  return {
    btn: map.btn,
    border: map.border,
    shadow: map.shadow,
    hoverBg: map.hoverBg,
  }
}

export function Portfolio() {
  const { t } = useLocale()
  const theme = useTheme()
  const [activeId, setActiveId] = React.useState(projects[0]?.id)
  const active = projects.find(p => p.id === activeId) || projects[0]
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const p = (key: string) => t(`portfolio.projects.${active.id}.${key}`)

  const selectProject = (id: string) => {
    setActiveId(id)
    setSelectedImageIndex(0)
  }

  /** The active project's accent palette. */
  const projectMainColour: ProjectAccent = active.mainColour ?? fallbackAccent
  /** Literal Tailwind classes for the active project's accent. */
  const accentClasses = resolveAccentClasses(projectMainColour)

  // Pick the screenshot set that matches the current theme. Projects without
  // a light variant fall back to the dark (default) set.
  const darkSet = active.images && active.images.length > 0 ? active.images : [active.image]
  const lightSet = active.imagesLight && active.imagesLight.length > 0 ? active.imagesLight : darkSet
  const screenshots = theme === 'light' ? lightSet : darkSet
  const screenshotTitles = [p('screenshot1'), p('screenshot2'), p('screenshot3')]
  const metrics = [1, 2, 3, 4]
    .map(n => ({ label: p(`metricLabel${n}`), value: p(`metricValue${n}`) }))
    .filter(m => m.label && m.value)
  const isLive = active.status === 'live'

  return (
    <Section id="portfolio" className="bg-bg-deep relative">
      <Container>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-fluid-3xl sm:text-fluid-4xl font-extrabold tracking-tight text-text-primary">
            {t('portfolio.heading')}
          </h2>
          <p className="text-fluid-base text-text-secondary leading-relaxed">
            {t('portfolio.description')}
          </p>
        </div>

        {/* Project Switcher */}
        {projects.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {projects.map(proj => {
              const isActive = activeId === proj.id
              const accent = proj.mainColour ?? fallbackAccent
              const projClasses = resolveAccentClasses(accent)
              const projBtnClass = cn(
                'shadow-md hover:opacity-75',
                projClasses.btn,
                projClasses.border,
              )
              return (
                <button
                  key={proj.id}
                  onClick={() => selectProject(proj.id)}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-fluid-sm font-semibold border transition-all',
                    isActive
                      ? projBtnClass
                      : 'bg-bg-base/60 text-text-secondary border-border-muted hover:border-text-secondary hover:text-text-primary'
                  )}
                >
                  {proj.status === 'building' && <Hammer className="w-3.5 h-3.5" />}
                  {proj.title}
                </button>
              )
            })}
          </div>
        )}

        {/* Featured Showcase Card */}
        <div className="rounded-3xl glass border border-border-muted p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden space-y-8">

          {/* Top Bar: Title, Live Link, & Key Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
            <div className="space-y-2">
              <h3 className="text-fluid-2xl font-extrabold text-text-primary">
                {active.title}
              </h3>
              <p className="text-fluid-sm text-text-secondary max-w-2xl">
                {p('tagline')}
              </p>
            </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant={isLive ? undefined : 'secondary'}
                  className={cn(
                    'w-full sm:w-auto',
                    isLive ? cn('hover:opacity-75', accentClasses.hoverBg, accentClasses.btn) : 'font-semibold'
                  )}
                >
                  {p('visitLabel')}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => setIsModalOpen(true)}
              >
                {t('portfolio.architectureButton')}
              </Button>
            </div>
          </div>

          {/* Interactive Screenshot Viewer */}
          <div className="space-y-4">

            {/* Main Display Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-bg-base border border-border-muted group shadow-inner">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${active.id}-${selectedImageIndex}-${theme}`}
                  src={screenshots[selectedImageIndex]}
                  alt={`${active.title} — ${screenshotTitles[selectedImageIndex] || 'screenshot ' + (selectedImageIndex + 1)}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  fetchPriority="high"
                  width="1200"
                  height="540"
                />
              </AnimatePresence>

              {/* Navigation Overlay Arrows */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-bg-deep/80 backdrop-blur border border-border-muted flex items-center justify-center text-text-primary opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-bg-hover"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % screenshots.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-bg-deep/80 backdrop-blur border border-border-muted flex items-center justify-center text-text-primary opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-bg-hover"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-4 bg-bg-deep/90 backdrop-blur border border-border-muted px-3 py-1.5 rounded-lg text-fluid-xs font-mono text-text-secondary flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-brand-maple" />
                <span>{screenshotTitles[selectedImageIndex] || `Screenshot ${selectedImageIndex + 1}`}</span>
              </div>
            </div>

            {/* Thumbnail Selection Bar */}
            {screenshots.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {screenshots.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={cn(
                      'relative aspect-video rounded-xl overflow-hidden border-2 transition-all text-left p-1 bg-bg-base',
                      selectedImageIndex === idx
                        ? cn('shadow-lg', accentClasses.border)
                        : 'border-border-muted opacity-60 hover:opacity-100 hover:border-text-secondary'
                    )}
                  >
                    <img
                      src={src}
                      alt={`${active.title} — ${screenshotTitles[idx] || 'thumbnail ' + (idx + 1)}`}
                      className="w-full h-full object-cover object-top rounded-lg"
                      loading="lazy"
                      width="400"
                      height="225"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Metrics Grid */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-bg-base/80 border border-border-subtle text-center lg:text-left space-y-1">
                  <div className="text-fluid-xs font-mono text-text-muted uppercase tracking-wider">{m.label}</div>
                  <div className="text-fluid-xl font-extrabold text-text-primary">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Stack & Key Highlights */}
          <div className="grid lg:grid-cols-2 gap-6 pt-4 border-t border-border-subtle">

            {/* Tech Stack Tags */}
            <div className="space-y-3">
              <h4 className="text-fluid-sm font-bold text-text-primary flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-ts" />
                {t('portfolio.archLabel')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {active.stack.map((tech, idx) => (
                  <Badge key={idx} variant={tech.brand as BadgeProps['variant']} className="px-3 py-1 text-xs">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Developing Highlights */}
<div className="space-y-3">
              <h4 className="text-fluid-sm font-bold text-text-primary flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-maple" />
                {t('portfolio.developingLabel')}
              </h4>
              <ul className="space-y-2 text-fluid-xs text-text-secondary">
                {[1, 2, 3].map(n => (
                  <li key={n} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-maple shrink-0 mt-0.5" />
                    <span>{p(`highlight${n}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </Container>

      {/* Case Study Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-modal overflow-y-auto p-6 sm:p-8 bg-bg-elevated border-border-muted">
          <DialogHeader className="mb-4">
          <DialogTitle className="text-fluid-2xl font-extrabold text-text-primary">
            {p('architectureTitle')}
          </DialogTitle>
          <DialogDescription className="text-fluid-sm text-text-secondary">
            {p('architectureDesc')}
          </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 text-fluid-sm text-text-secondary leading-relaxed">
            <div>
              <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <Server className="w-4 h-4 text-brand-php" /> {t('portfolio.overview')}
              </h4>
              <p>{p('description')}</p>
            </div>

            <div>
              <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-brand-pg" /> {p('dbLabel')}
              </h4>
              <p>{p('dbDesc')}</p>
            </div>

            <div>
              <h4 className="font-bold text-text-primary mb-2">{t('portfolio.challenges')}</h4>
              <ul className="space-y-2">
                {[1, 2, 3].map(n => (
                  <li key={n} className="flex items-start gap-2">
                    <span className="text-brand-maple font-bold">▸</span>
                    <span>{p(`challenge${n}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border-subtle flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                {t('portfolio.close')}
              </Button>
              <a href={active.url} target="_blank" rel="noopener noreferrer">
                <Button className={cn('hover:opacity-75', accentClasses.hoverBg, accentClasses.btn)}>
                  {p('visitLabel')}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  )
}

'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { projects } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Section, Container } from '@/components/layout/section'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ExternalLink, Sparkles, Layers, Zap, Database, Server, CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon, Hammer } from 'lucide-react'
import { useLocale } from '@/i18n/LanguageContext'

export function Portfolio() {
  const { t } = useLocale()
  const [activeId, setActiveId] = React.useState(projects[0]?.id)
  const active = projects.find(p => p.id === activeId) || projects[0]
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const p = (key: string) => t(`portfolio.projects.${active.id}.${key}`)

  const selectProject = (id: string) => {
    setActiveId(id)
    setSelectedImageIndex(0)
  }

  const screenshots = active.images && active.images.length > 0 ? active.images : [active.image]
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
          <Badge variant="brand-maple" className="px-3.5 py-1 inline-flex items-center gap-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-maple" />
            {t('portfolio.badge')}
          </Badge>
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
            {projects.map(proj => (
              <button
                key={proj.id}
                onClick={() => selectProject(proj.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-fluid-sm font-semibold border transition-all',
                  activeId === proj.id
                    ? 'bg-brand-maple text-white border-brand-maple shadow-md shadow-brand-maple/20'
                    : 'bg-bg-base/60 text-text-secondary border-border-muted hover:border-text-secondary hover:text-text-primary'
                )}
              >
                {proj.status === 'building' && <Hammer className="w-3.5 h-3.5" />}
                {proj.title}
              </button>
            ))}
          </div>
        )}

        {/* Featured Showcase Card */}
        <div className="rounded-3xl glass border border-border-muted p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden space-y-8">

          {/* Top Bar: Title, Live Link, & Key Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-fluid-2xl font-extrabold text-text-primary">
                  {active.title}
                </h3>
                <Badge variant={isLive ? 'brand-maple' : 'secondary'} className="font-mono text-xs">
                  {isLive ? active.url.replace(/^https?:\/\//, '') : t('portfolio.statusBuilding')}
                </Badge>
              </div>
              <p className="text-fluid-sm text-text-secondary max-w-2xl">
                {p('tagline')}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant={isLive ? undefined : 'secondary'}
                  className={isLive ? 'bg-brand-maple hover:bg-brand-maple/90 text-white font-semibold' : 'font-semibold'}
                >
                  {p('visitLabel')}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
              >
                {t('portfolio.architectureButton')}
              </Button>
            </div>
          </div>

          {/* Interactive Screenshot Viewer */}
          <div className="space-y-4">

            {/* Main Display Image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-bg-base border border-border-muted group shadow-inner">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${active.id}-${selectedImageIndex}`}
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-deep/80 backdrop-blur border border-border-muted flex items-center justify-center text-text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-bg-hover"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % screenshots.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-deep/80 backdrop-blur border border-border-muted flex items-center justify-center text-text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-bg-hover"
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
                      'relative aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all text-left p-1 bg-bg-base',
                      selectedImageIndex === idx
                        ? 'border-brand-maple shadow-lg shadow-brand-maple/20'
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
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

            {/* Key Engineering Highlights */}
            <div className="space-y-3">
              <h4 className="text-fluid-sm font-bold text-text-primary flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-maple" />
                {t('portfolio.engineeringLabel')}
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
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 bg-bg-elevated border-border-muted">
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
                <Button className="bg-brand-maple hover:bg-brand-maple/90 text-white">
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

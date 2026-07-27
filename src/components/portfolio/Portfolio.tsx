'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { projects } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Section, Container } from '@/components/layout/section'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ExternalLink, Sparkles, Layers, Zap, Database, Server, CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import { useLocale } from '@/i18n/LanguageContext'

export function Portfolio() {
  const { t } = useLocale()
  const featured = projects.find(p => p.featured) || projects[0]
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const screenshots = featured.images && featured.images.length > 0 
    ? featured.images 
    : ['/images/maplelinecards-1.png', '/images/maplelinecards-3.png', '/images/maplelinecards-2.png']

  const screenshotTitles = [
    t('portfolio.screenshot1'),
    t('portfolio.screenshot2'),
    t('portfolio.screenshot3'),
  ]

  return (
    <Section id="portfolio" className="bg-bg-deep relative">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
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

        {/* Featured Showcase Card */}
        <div className="rounded-3xl glass border border-border-muted p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden space-y-8">
          
          {/* Top Bar: Title, Live Link, & Key Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-fluid-2xl font-extrabold text-text-primary">
                  MapleLineCards
                </h3>
                <Badge variant="brand-maple" className="font-mono text-xs">
                  https://maplelinecards.ca
                </Badge>
              </div>
              <p className="text-fluid-sm text-text-secondary max-w-2xl">
                {t('portfolio.tagline')}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a 
                href={featured.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-brand-maple hover:bg-brand-maple/90 text-white font-semibold">
                  {t('portfolio.visitButton')}
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
                  key={selectedImageIndex}
                  src={screenshots[selectedImageIndex]}
                  alt={`MapleLineCards screenshot ${selectedImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Navigation Overlay Arrows */}
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

              <div className="absolute bottom-4 left-4 bg-bg-deep/90 backdrop-blur border border-border-muted px-3 py-1.5 rounded-lg text-fluid-xs font-mono text-text-secondary flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-brand-maple" />
                <span>{screenshotTitles[selectedImageIndex] || `Screenshot ${selectedImageIndex + 1}`}</span>
              </div>
            </div>

            {/* Thumbnail Selection Bar */}
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
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-bg-base/80 border border-border-subtle text-center lg:text-left space-y-1">
              <div className="text-fluid-xs font-mono text-text-muted uppercase tracking-wider">{t('portfolio.metricProducts')}</div>
              <div className="text-fluid-xl font-extrabold text-text-primary">{t('portfolio.metricProductsVal')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-bg-base/80 border border-border-subtle text-center lg:text-left space-y-1">
              <div className="text-fluid-xs font-mono text-text-muted uppercase tracking-wider">{t('portfolio.metricTcg')}</div>
              <div className="text-fluid-xl font-extrabold text-text-primary">{t('portfolio.metricTcgVal')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-bg-base/80 border border-border-subtle text-center lg:text-left space-y-1">
              <div className="text-fluid-xs font-mono text-text-muted uppercase tracking-wider">{t('portfolio.metricStores')}</div>
              <div className="text-fluid-xl font-extrabold text-text-primary">{t('portfolio.metricStoresVal')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-bg-base/80 border border-border-subtle text-center lg:text-left space-y-1">
              <div className="text-fluid-xs font-mono text-text-muted uppercase tracking-wider">{t('portfolio.metricLatency')}</div>
              <div className="text-fluid-xl font-extrabold text-text-primary">{t('portfolio.metricLatencyVal')}</div>
            </div>
          </div>

          {/* Stack & Key Highlights */}
          <div className="grid lg:grid-cols-2 gap-6 pt-4 border-t border-border-subtle">
            
            {/* Tech Stack Tags */}
            <div className="space-y-3">
              <h4 className="text-fluid-sm font-bold text-text-primary flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-ts" />
                {t('portfolio.archLabel')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {featured.stack.map((tech, idx) => (
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
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-maple shrink-0 mt-0.5" />
                  <span>{t('portfolio.highlight1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-maple shrink-0 mt-0.5" />
                  <span>{t('portfolio.highlight2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-maple shrink-0 mt-0.5" />
                  <span>{t('portfolio.highlight3')}</span>
                </li>
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
            {t('portfolio.architectureTitle')}
          </DialogTitle>
          <DialogDescription className="text-fluid-sm text-text-secondary">
            {t('portfolio.architectureDesc')}
          </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 text-fluid-sm text-text-secondary leading-relaxed">
            <div>
              <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <Server className="w-4 h-4 text-brand-php" /> {t('portfolio.overview')}
              </h4>
              <p>{t('portfolio.tagline')}</p>
            </div>

            <div>
              <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-brand-pg" /> {t('portfolio.database')}
              </h4>
              <p>{t('portfolio.dbDesc')}</p>
            </div>

            <div>
              <h4 className="font-bold text-text-primary mb-2">{t('portfolio.challenges')}</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-brand-maple font-bold">▸</span>
                  <span>{t('portfolio.challenge1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-maple font-bold">▸</span>
                  <span>{t('portfolio.challenge2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-maple font-bold">▸</span>
                  <span>{t('portfolio.challenge3')}</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border-subtle flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                {t('portfolio.close')}
              </Button>
              <a href={featured.url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-brand-maple hover:bg-brand-maple/90 text-white">
                  {t('portfolio.visitLive')}
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
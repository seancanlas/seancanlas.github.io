'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { milestones } from '@/lib/constants'
import { Section, Container } from '@/components/layout/section'
import { GraduationCap, Code2, Bot, Globe, Terminal } from 'lucide-react'
import { useLocale } from '@/i18n/LanguageContext'

const milestoneIcons: Record<string, React.ReactNode> = {
  myspace: <Globe className="w-5 h-5 text-brand-ts" />,
  robot: <Bot className="w-5 h-5 text-brand-react" />,
  dawson: <GraduationCap className="w-5 h-5 text-brand-php" />,
  concordia: <GraduationCap className="w-5 h-5 text-brand-node" />,
  code: <Terminal className="w-5 h-5 text-brand-maple" />,
}

export function About() {
  const { t } = useLocale()

  return (
    <Section id="about" className="bg-bg-deep relative overflow-hidden">
      <Container size="md">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-fluid-3xl sm:text-fluid-4xl font-extrabold tracking-tight text-text-primary">
            {t('about.heading')}
          </h2>
          <p className="text-fluid-base text-text-secondary leading-relaxed">
            {t('about.intro')}
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative pl-8 before:absolute before:left-2 before:top-0 before:h-full before:w-0.5 before:bg-border-muted/80 space-y-10 my-8">
          {milestones.map((milestone, idx) => {
            const Icon = milestoneIcons[milestone.icon] || <Code2 className="w-5 h-5 text-brand-ts" />

            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Timeline Point Dot */}
                <div className="absolute -left-10 top-1.5 w-8 h-8 rounded-full bg-bg-base border-2 border-border-muted flex items-center justify-center group-hover:border-brand-ts transition-colors shadow-md">
                  {Icon}
                </div>

                {/* Milestone Content Card */}
                <div className="rounded-2xl glass p-6 sm:p-7 border border-border-muted hover:border-brand-ts/40 transition-all duration-300 space-y-2">
                  
                  {/* Top Bar: Year & Subtitle */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-fluid-xs font-mono font-bold px-3 py-1 rounded-full bg-text-muted/10 text-text-muted border border-border-muted">
                        {milestone.year}
                      </span>
                      <span className="text-fluid-xs font-semibold text-text-muted uppercase tracking-wider">
                        {t(`about.ms_${milestone.icon}.era`)}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-fluid-lg font-bold text-text-primary group-hover:text-brand-ts transition-colors">
                      {milestone.icon ? t(`about.ms_${milestone.icon}.title`) : milestone.title}
                    </h3>
                    <p className="text-md font-medium text-text-secondary">
                      {milestone.icon ? t(`about.ms_${milestone.icon}.subtitle`) : milestone.subtitle}
                    </p>
                  </div>

                  {/* Story Text */}
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {t(`about.ms_${milestone.icon}.story`)}
                  </p>

                </div>
              </motion.div>
            )
          })}
        </div>

      </Container>
    </Section>
  )
}
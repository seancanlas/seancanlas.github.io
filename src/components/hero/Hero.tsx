'use client'

import { motion } from 'framer-motion'
import { ScrollLink } from '@/components/ui/scroll-link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Terminal, Sparkles } from 'lucide-react'
import { useLocale } from '@/i18n/LanguageContext'

export function Hero() {
  const { t } = useLocale()

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-20 pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-brand-ts/15 via-brand-react/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-radial from-brand-maple/10 to-transparent blur-[140px] rounded-full" />
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundImage: `radial-gradient(var(--color-text-primary) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Info & Headline */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Status Pill with MapleLineCards Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-bg-elevated/80 border border-border-muted backdrop-blur shadow-sm hover:border-border-focus transition-all"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-brand-maple/40 shrink-0 bg-black">
                <img
                  src="/images/maplelinecards-logo.webp"
                  alt="MapleLineCards Logo"
                  className="w-full h-full object-cover object-center"
                  width="32"
                  height="32"
                />
              </div>
              <div className="flex items-center gap-2 pr-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-online opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-status-online" />
                </span>
                <span className="text-fluid-xs font-medium text-text-secondary">
                  {t('hero.statusBuilding')}{' '}
                  <strong className="text-text-primary">{t('hero.statusMapleLineCards')}</strong>
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <h1 id="hero-title" className="text-fluid-4xl sm:text-fluid-5xl font-extrabold tracking-tight text-text-primary">
                {t('hero.name')}
              </h1>
              <p className="text-fluid-xl sm:text-fluid-2xl font-semibold bg-gradient-to-r from-brand-ts via-brand-react to-brand-maple bg-clip-text text-transparent">
                {t('hero.title')}
              </p>
            </motion.div>

            {/* Bio summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-fluid-base text-text-secondary max-w-xl leading-relaxed"
            >
              {t('hero.bio')}
            </motion.p>

            {/* Core Tech Stack Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              <Badge variant="brand-php" className="px-3 py-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-php mr-1.5" /> PHP 8.3 / Symfony 7
              </Badge>
              <Badge variant="brand-node" className="px-3 py-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-node mr-1.5" /> NodeJS
              </Badge>
              <Badge variant="brand-ts" className="px-3 py-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-ts mr-1.5" /> TypeScript / React 18
              </Badge>
              <Badge variant="brand-pg" className="px-3 py-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-pg mr-1.5" /> PostgreSQL 16
              </Badge>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <ScrollLink href="#portfolio">
                <Button size="lg" className="w-full sm:w-auto group" style={{ color: '#fff' }}>
                  {t('hero.exploreWork')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </ScrollLink>
              <ScrollLink href="#contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  {t('hero.contact')}
                </Button>
              </ScrollLink>
            </motion.div>

          </div>

          {/* Right Column: Developer Profile Card */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl bg-bg-base/90 border border-border-muted shadow-2xl overflow-hidden glass"
            >
              {/* Terminal Window Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated/80 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{t('hero.terminalTitle')}</span>
                </div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Split: Portrait on Top + Terminal Code Below */}
              <div className="flex flex-col">
                {/* Profile Portrait (top) */}
                <div className="flex flex-col items-center justify-center p-5 sm:p-6 bg-bg-elevated/40 border-b border-border-subtle">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[3px] bg-gradient-to-br from-brand-ts via-brand-react to-brand-maple shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-bg-base">
                      <img
                        src="/images/profile.jpg"
                        alt="Sean Canlas"
                        className="w-full h-full object-cover object-top"
                        loading="eager"
                        fetchPriority="high"
                        width="160"
                        height="160"
                      />
                    </div>
                  </div>
                  <span className="mt-3 text-xs font-mono text-text-muted uppercase tracking-wider">
                    {t('hero.terminalIdentity')}
                  </span>
                </div>

                {/* Terminal Code Body (bottom) */}
                <div className="p-5 font-mono text-xs sm:text-fluid-xs leading-relaxed space-y-3 text-text-secondary overflow-x-auto">
                  <div>
                    <span className="text-brand-ts">import</span> &#123; <span className="text-brand-react">Engineer</span> &#125; <span className="text-brand-ts">from</span> <span className="text-emerald-400">'@seancanlas/core'</span>
                  </div>

                  <div className="text-text-muted">{t('hero.terminalComment')}</div>
                  <div>
                    <span className="text-brand-ts">export const</span> <span className="text-text-primary font-semibold">seanCanlas</span>: <span className="text-brand-react">Engineer</span> = &#123;
                  </div>

                  <div className="pl-4 space-y-1">
                    <div>
                      <span className="text-text-muted">role:</span> <span className="text-emerald-400">{t('hero.terminalRole')}</span>,
                    </div>
                    <div>
                      <span className="text-text-muted">location:</span> <span className="text-emerald-400">{t('hero.terminalLocation')}</span>,
                    </div>
                    <div>
                      <span className="text-text-muted">experience:</span> <span className="text-amber-300">{t('hero.terminalExperience')}</span>,
                    </div>
                    <div>
                      <span className="text-text-muted">backend:</span> [<span className="text-emerald-400">'PHP 8.3'</span>, <span className="text-emerald-400">'Symfony 7'</span>, <span className="text-emerald-400">'NodeJS'</span>, <span className="text-emerald-400">'Twig 3'</span>],
                    </div>
                    <div>
                      <span className="text-text-muted">frontend:</span> [<span className="text-emerald-400">'React 18'</span>, <span className="text-emerald-400">'TypeScript'</span>, <span className="text-emerald-400">'Tailwind'</span>],
                    </div>
                    <div>
                      <span className="text-text-muted">database:</span> [<span className="text-emerald-400">'PostgreSQL 16'</span>, <span className="text-emerald-400">'Redis'</span>],
                    </div>
                    <div>
                      <span className="text-text-muted">flagshipProject:</span> &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-text-muted">name:</span> <span className="text-emerald-400">'MapleLineCards'</span>,
                      <br />
                      <span className="text-text-muted">url:</span> <span className="text-brand-react underline">'https://maplelinecards.ca'</span>
                    </div>
                    <div>&#125;</div>
                  </div>

                  <div>&#125;;</div>

                  <div className="pt-2 border-t border-border-subtle/50 text-text-muted flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-react" /> {t('hero.terminalStatus')}
                    </span>
                    <span className="text-emerald-400">{t('hero.terminalReady')}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
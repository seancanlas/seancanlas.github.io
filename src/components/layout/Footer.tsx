'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ScrollLink } from '@/components/ui/scroll-link'
import { socialLinks } from '@/lib/constants'
import { Sun, Moon, Github, Linkedin, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/i18n/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  mail: <Mail className="w-4 h-4" />,
}

export function Footer() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark')

  React.useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('light', initial === 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  const { t } = useLocale()

  const footerNavItems = [
    { href: '#portfolio', labelKey: 'nav.featuredProject' },
    { href: '#stack', labelKey: 'nav.techStack' },
    { href: '#about', labelKey: 'nav.careerJourney' },
    { href: '#contact', labelKey: 'nav.getInTouch' },
  ]

  return (
    <footer className="border-t border-border-subtle bg-bg-base/50" role="contentinfo">
      <div className="mx-auto max-w-7xl px-2.5 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ScrollLink
              href="#hero"
              className="flex items-center gap-2 text-text-primary hover:text-brand-ts transition-colors mb-4"
              aria-label="Sean Canlas - Home"
            >
              <span className="text-fluid-xl font-extrabold gradient-text">SC</span>
              <span className="text-fluid-base font-bold">Sean Canlas</span>
            </ScrollLink>
            <p className="text-text-secondary text-fluid-xs leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-fluid-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              {t('footer.navigation')}
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {footerNavItems.map((item) => (
                  <li key={item.href}>
                    <ScrollLink
                      href={item.href}
                      className="text-fluid-xs text-text-secondary hover:text-brand-ts transition-colors"
                    >
                      {t(item.labelKey)}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-fluid-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              {t('footer.profiles')}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-elevated border border-border-muted text-text-secondary hover:text-brand-ts hover:border-brand-ts/40 transition-all text-xs"
                >
                  {iconMap[social.icon] || <Mail className="w-4 h-4" />}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border-subtle"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-fluid-xs text-text-muted inline-flex items-center gap-1.5 flex-wrap">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>

            <div className="flex items-center gap-4 text-fluid-xs text-text-muted">
              <a
                href="https://github.com/seancanlas/seancanlas.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-ts transition-colors"
              >
                {t('footer.websiteSource')}
              </a>
              <LanguageSwitcher />
              <button
                onClick={toggleTheme}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-lg',
                  'bg-bg-elevated border border-border-muted',
                  'text-text-secondary hover:text-brand-ts',
                  'hover:border-brand-ts/30 hover:bg-bg-hover',
                  'transition-all duration-200 ml-2'
                )}
                aria-label={theme === 'dark' ? t('footer.themeToggle.lightAria') : t('footer.themeToggle.darkAria')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
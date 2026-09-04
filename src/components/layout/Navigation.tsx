'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollLink } from '@/components/ui/scroll-link'
import { useLocale } from '@/i18n/LanguageContext'
import { useTheme, setThemeGlobal } from '@/hooks/useTheme'

export function Navigation() {
  const { t } = useLocale()
  const theme = useTheme()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string>('hero')

  const navItems = [
    { href: '#about', labelKey: 'nav.careerJourney' },
    { href: '#stack', labelKey: 'nav.techStack' },
    { href: '#portfolio', labelKey: 'nav.featuredProjects' },
    { href: '#contact', labelKey: 'nav.getInTouch' },
  ]

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      const sections = ['hero', 'about', 'stack', 'portfolio', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { localizedHref } = useLocale()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // scrollIntoView respects the section's `scroll-margin-top`, which
      // is set on the Section component to clear the fixed navbar.
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.location.hash = localizedHref('#' + sectionId)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-bg-deep/95 backdrop-blur-xl border-b border-border-subtle'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <nav className="mx-auto max-w-7xl px-2.5 sm:px-8 lg:px-12" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
            <ScrollLink
              href="#hero"
              className="flex items-center gap-2 text-text-primary hover:text-brand-ts transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ts focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep rounded-lg"
              aria-label="Sean Canlas - Home"
            >
              <span className="text-fluid-xl font-bold text-brand-ts">SC</span>
              <span className="hidden sm:block text-fluid-sm font-medium">Sean Canlas</span>
            </ScrollLink>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative text-fluid-sm font-medium transition-colors',
                    'hover:text-brand-ts',
                    activeSection === item.href.replace('#', '') ? 'text-brand-ts' : 'text-text-secondary',
                    'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-ts after:transition-all after:duration-300 hover:after:w-full'
                  )}
                  onClick={() => scrollToSection(item.href.replace('#', ''))}
                >
                  {t(item.labelKey)}
                </ScrollLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setThemeGlobal(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ts focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                aria-label={theme === 'dark' ? t('footer.themeToggle.lightAria') : t('footer.themeToggle.darkAria')}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ts"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'md:hidden overflow-hidden bg-bg-deep/95 backdrop-blur-xl border-b border-border-subtle',
              'fixed top-16 left-0 right-0 z-40'
            )}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-fluid-base font-medium transition-colors',
                    'hover:bg-bg-hover hover:text-brand-ts',
                    activeSection === item.href.replace('#', '') ? 'bg-brand-ts/10 text-brand-ts' : 'text-text-secondary'
                  )}
                  onClick={() => scrollToSection(item.href.replace('#', ''))}
                >
                  {t(item.labelKey)}
                </ScrollLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
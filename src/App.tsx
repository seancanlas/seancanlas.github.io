import { Navigation } from '@/components/layout/Navigation'
import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/about/About'
import { Stack } from '@/components/stack/Stack'
import { Portfolio } from '@/components/portfolio/Portfolio'
import { Contact } from '@/components/contact/Contact'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/toaster'
import { LanguageProvider } from '@/i18n/LanguageContext'

export default function App() {
  return (
    <LanguageProvider>
      <Navigation />
      <main id="main-content" className="pt-16 min-h-screen">
        <Hero />
        <About />
        <Stack />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </LanguageProvider>
  )
}
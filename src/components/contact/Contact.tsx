'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Section, Container } from '@/components/layout/section'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/i18n/LanguageContext'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.enum(['general', 'maplelinecards', 'collaboration', 'hello'], {
    required_error: 'Please select a subject',
  }),
  message: z.string().min(20, 'Message must be at least 20 characters').max(2000, 'Message too long'),
  website: z.string().optional(), // honeypot
})

type ContactFormData = z.infer<typeof contactSchema>

const subjectOptions = [
  { value: 'general', labelKey: 'subjectGeneral' as const },
  { value: 'maplelinecards', labelKey: 'subjectMapleLineCards' as const },
  { value: 'collaboration', labelKey: 'subjectCollaboration' as const },
  { value: 'hello', labelKey: 'subjectHello' as const },
]

export function Contact() {
  const { t } = useLocale()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: 'general',
    },
  })

  const honeypotValue = watch('website')

  const onSubmit = async (data: ContactFormData) => {
    if (honeypotValue) {
      // Honeypot triggered
      reset()
      toast({ title: 'Message sent!', description: "I'll get back to you soon." })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/xwvgadkg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        toast({ title: 'Message sent!', description: t('contact.success') })
      } else {
        throw new Error('Form submission failed')
      }
    } catch {
      setSubmitStatus('error')
      toast({ title: t('contact.errorTitle'), description: t('contact.errorText'), variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section id="contact" className="bg-bg-deep relative">
      <Container>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-fluid-3xl sm:text-fluid-4xl font-extrabold tracking-tight text-text-primary">
            {t('contact.heading')}
          </h2>
          <p className="text-fluid-base text-text-secondary leading-relaxed">
            {t('contact.intro')}
          </p>
        </div>

        <div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="glass p-6 sm:p-10 rounded-2xl border border-border-muted space-y-6" noValidate>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Label htmlFor="name">{t('contact.name')}</Label>
                <Input
                  id="name"
                  placeholder={t('contact.namePlaceholder')}
                  {...register('name')}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-fluid-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-6">
                <Label htmlFor="email">{t('contact.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-fluid-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

              <div className="space-y-6">
                <Label htmlFor="subject">{t('contact.subject')}</Label>
              <select
                id="subject"
                {...register('subject')}
                className={cn(
                  'flex h-11 w-full appearance-none rounded-xl border border-border-muted bg-bg-base bg-[url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E"]] bg-no-repeat bg-[right_0.75rem_center] px-4 py-2 pr-10 text-fluid-xs text-text-primary',
                  'focus:outline-none focus:ring-2 focus:ring-brand-ts focus:ring-offset-2 focus:ring-offset-bg-deep',
                  'transition-all'
                )}
              >
                {subjectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-bg-elevated text-text-primary">
                    {t(`contact.${opt.labelKey}`)}
                  </option>
                ))}
              </select>
            </div>

<div className="space-y-6">
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('contact.messagePlaceholder')}
                  rows={5}
                  {...register('message')}
                  aria-invalid={!!errors.message}
                />
              {errors.message && (
                <p className="text-fluid-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            {/* Honeypot field */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              {...register('website')}
            />

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
                style={{ color: '#fff' }}
              >
                {isSubmitting ? t('contact.sending') : t('contact.send')}
                <Send className="w-4 h-4 ml-2" />
              </Button>

          </form>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-fluid-xs text-center font-medium"
            >
              {t('contact.success')}
            </motion.div>
          )}

        </div>

      </Container>
    </Section>
  )
}
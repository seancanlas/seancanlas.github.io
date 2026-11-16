import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Section, Container } from '@/components/layout/section'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { t, type Locale } from '@/i18n'

const subjectOptions = [
  { value: 'general', labelKey: 'contact.subjectGeneral' },
  { value: 'maplelinecards', labelKey: 'contact.subjectMapleLineCards' },
  { value: 'collaboration', labelKey: 'contact.subjectCollaboration' },
  { value: 'hello', labelKey: 'contact.subjectHello' },
] as const

export function Contact({ locale }: { locale: Locale }) {
  const tr = (key: string) => t(locale, key)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  const contactSchema = z.object({
    name: z.string().min(2, tr('contact.validation.name')),
    email: z.string().email(tr('contact.validation.email')),
    subject: z.enum(['general', 'maplelinecards', 'collaboration', 'hello'], {
      required_error: tr('contact.validation.subject'),
    }),
    message: z
      .string()
      .min(20, tr('contact.validation.messageMin'))
      .max(2000, tr('contact.validation.messageMax')),
    website: z.string().optional(), // honeypot
  })

  type ContactFormData = z.infer<typeof contactSchema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: 'general' },
  })

  const honeypotValue = watch('website')

  const onSubmit = async (data: ContactFormData) => {
    if (honeypotValue) {
      reset()
      setSubmitStatus('success')
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

      if (!response.ok) throw new Error('Form submission failed')

      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass = 'flex flex-col gap-2'
  const errorClass = 'text-xs text-red-600 dark:text-red-400'

  return (
    <Section id="contact" className="border-t border-border-subtle bg-bg-base">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl tracking-tight text-text-primary sm:text-4xl">
              {tr('contact.heading')}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              {tr('contact.intro')}
            </p>
          </div>

          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 border border-border-subtle bg-bg-elevated p-6 sm:p-8"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className={fieldClass}>
                  <label htmlFor="name" className="text-sm font-medium text-text-primary">
                    {tr('contact.name')}
                  </label>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder={tr('contact.namePlaceholder')}
                    {...register('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className={errorClass}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className={fieldClass}>
                  <label htmlFor="email" className="text-sm font-medium text-text-primary">
                    {tr('contact.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={tr('contact.emailPlaceholder')}
                    {...register('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className={errorClass}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={fieldClass}>
                <label htmlFor="subject" className="text-sm font-medium text-text-primary">
                  {tr('contact.subject')}
                </label>
                <select
                  id="subject"
                  {...register('subject')}
                  className={cn(
                    'h-11 w-full rounded-sm border border-border-muted bg-bg-base px-3 text-sm text-text-primary',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated',
                    'transition-colors duration-150'
                  )}
                >
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-bg-elevated text-text-primary">
                      {tr(option.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={fieldClass}>
                <label htmlFor="message" className="text-sm font-medium text-text-primary">
                  {tr('contact.message')}
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={tr('contact.messagePlaceholder')}
                  {...register('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className={errorClass}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                {...register('website')}
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? tr('contact.sending') : tr('contact.send')}
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Button>

                {submitStatus === 'success' && (
                  <p role="status" className="text-sm text-emerald-700 dark:text-emerald-400">
                    {tr('contact.success')}
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                    {tr('contact.errorTitle')}. {tr('contact.errorText')}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  )
}

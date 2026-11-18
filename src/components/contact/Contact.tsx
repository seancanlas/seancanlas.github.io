import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { t, type Locale } from "@/i18n";

const subjectOptions = [
  { value: "general", labelKey: "contact.subjectGeneral" },
  { value: "maplelinecards", labelKey: "contact.subjectMapleLineCards" },
  { value: "collaboration", labelKey: "contact.subjectCollaboration" },
  { value: "hello", labelKey: "contact.subjectHello" },
] as const;

export function Contact({ locale }: { locale: Locale }) {
  const tr = (key: string) => t(locale, key);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  const contactSchema = z.object({
    name: z.string().min(2, tr("contact.validation.name")),
    email: z.string().email(tr("contact.validation.email")),
    subject: z.enum(["general", "maplelinecards", "collaboration", "hello"], {
      required_error: tr("contact.validation.subject"),
    }),
    message: z
      .string()
      .min(20, tr("contact.validation.messageMin"))
      .max(2000, tr("contact.validation.messageMax")),
    website: z.string().optional(), // honeypot
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "general" },
  });

  const honeypotValue = watch("website");

  const onSubmit = async (data: ContactFormData) => {
    if (honeypotValue) {
      reset();
      setSubmitStatus("success");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/xwvgadkg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Form submission failed");

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = "form-field";
  const errorClass = "form-error";

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-intro">
            <h2 className="contact-title">{tr("contact.heading")}</h2>
            <p className="section-description">{tr("contact.intro")}</p>
          </div>

          <div className="contact-form-wrap">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="contact-form"
              noValidate
            >
              <div className="form-row">
                <div className={fieldClass}>
                  <label htmlFor="name" className="form-label">
                    {tr("contact.name")}
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    placeholder={tr("contact.namePlaceholder")}
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className={errorClass}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className={fieldClass}>
                  <label htmlFor="email" className="form-label">
                    {tr("contact.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={tr("contact.emailPlaceholder")}
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className={errorClass}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={fieldClass}>
                <label htmlFor="subject" className="form-label">
                  {tr("contact.subject")}
                </label>
                <select
                  id="subject"
                  {...register("subject")}
                  className="form-select"
                >
                  {subjectOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className=""
                    >
                      {tr(option.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={fieldClass}>
                <label htmlFor="message" className="form-label">
                  {tr("contact.message")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={tr("contact.messagePlaceholder")}
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
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
                className="honeypot"
                aria-hidden="true"
                {...register("website")}
              />

              <div className="form-submit">
                <button
                  className="button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? tr("contact.sending") : tr("contact.send")}
                  <Send className="button-icon" aria-hidden="true" />
                </button>

                {submitStatus === "success" && (
                  <p role="status" className="form-success">
                    {tr("contact.success")}
                  </p>
                )}
                {submitStatus === "error" && (
                  <p role="alert" className="form-error">
                    {tr("contact.errorTitle")}. {tr("contact.errorText")}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

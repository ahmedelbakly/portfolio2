import { useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useI18n } from '@/i18n/useI18n'
import { profile } from '@/content/profile'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

type Status = 'idle' | 'sending' | 'sent' | 'error'
type FieldName = 'name' | 'email' | 'message'

const FIELD_CLASSES =
  'w-full rounded-md border border-line bg-canvas px-4 py-3 text-sm text-fg placeholder:text-fg-subtle ' +
  'transition-colors duration-150 outline-none focus:border-line-accent focus:ring-2 focus:ring-accent-soft ' +
  'aria-invalid:border-line-accent'

export function Contact() {
  const { t } = useI18n()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})

  const channels = [
    { label: t.contact.channels.email, value: profile.email, href: `mailto:${profile.email}` },
    { label: t.contact.channels.phone, value: profile.phone, href: `tel:${profile.phoneHref}` },
    ...profile.socials.map((social) => ({
      label: social.label,
      value: social.href.replace(/^https?:\/\//, ''),
      href: social.href,
    })),
  ]

  function validate(data: FormData) {
    const next: Partial<Record<FieldName, string>> = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (name.length < 2) next.name = t.contact.validation.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = t.contact.validation.email
    if (message.length < 10) next.message = t.contact.validation.message

    return next
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!formRef.current) return

    const found = validate(new FormData(formRef.current))
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      setStatus('sent')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} bordered>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col gap-10">
          <Reveal>
            <p className="max-w-prose text-lg leading-relaxed text-fg-muted">
              {t.contact.subtitle}
            </p>
          </Reveal>

          <Reveal index={1}>
            <div className="flex flex-col gap-4">
              <h3 className="eyebrow ar:font-arabic ar:text-sm ar:normal-case ar:tracking-normal">
                <span aria-hidden="true" className="h-px w-7 bg-accent/70" />
                {t.contact.directTitle}
              </h3>
              <ul className="flex flex-col">
                {channels.map((channel) => (
                  <li key={channel.label} className="border-t border-line">
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="text-sm text-fg-subtle">{channel.label}</span>
                      <span
                        dir="ltr"
                        className="mono truncate text-sm text-fg transition-colors duration-150 group-hover:text-accent"
                      >
                        {channel.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal index={2}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-6 sm:p-8"
          >
            <h3 className="eyebrow ar:font-arabic ar:text-sm ar:normal-case ar:tracking-normal">
              <span aria-hidden="true" className="h-px w-7 bg-accent/70" />
              {t.contact.formTitle}
            </h3>

            <Field
              name="name"
              label={t.contact.fields.name}
              placeholder={t.contact.fields.namePlaceholder}
              error={errors.name}
            />
            <Field
              name="email"
              type="email"
              label={t.contact.fields.email}
              placeholder={t.contact.fields.emailPlaceholder}
              error={errors.email}
            />
            <Field
              name="message"
              label={t.contact.fields.message}
              placeholder={t.contact.fields.messagePlaceholder}
              error={errors.message}
              multiline
            />

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={status === 'sending'} withArrow>
                {status === 'sending' ? t.contact.sending : t.contact.send}
              </Button>

              {/* Announced politely so a screen reader hears the result without
                  the focus being yanked out of the form. */}
              <p role="status" aria-live="polite" className="text-sm">
                {status === 'sent' && <span className="text-positive">{t.contact.success}</span>}
                {status === 'error' && <span className="text-fg-muted">{t.contact.error}</span>}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

interface FieldProps {
  name: FieldName
  label: string
  placeholder: string
  error?: string
  type?: string
  multiline?: boolean
}

function Field({ name, label, placeholder, error, type = 'text', multiline }: FieldProps) {
  const errorId = `${name}-error`
  const shared = {
    id: name,
    name,
    placeholder,
    className: FIELD_CLASSES,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-fg">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={`${FIELD_CLASSES} resize-y`} />
      ) : (
        <input {...shared} type={type} />
      )}
      {error && (
        <p id={errorId} className="text-xs text-fg-muted">
          {error}
        </p>
      )}
    </div>
  )
}

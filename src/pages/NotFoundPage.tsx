import { useI18n } from '@/i18n/useI18n'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFoundPage() {
  const { t } = useI18n()

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pt-nav">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-dots [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)]"
      />
      <div className="container-page relative flex flex-col items-start gap-6 py-20">
        <span className="mono text-5xl font-medium tracking-tighter text-accent">
          {t.notFound.code}
        </span>
        <h1 className="text-3xl font-semibold tracking-tighter text-fg ar:tracking-normal">
          {t.notFound.title}
        </h1>
        <p className="max-w-prose text-lg text-fg-muted">{t.notFound.body}</p>
        <ButtonLink to="/" size="lg" withArrow className="mt-2">
          {t.notFound.cta}
        </ButtonLink>
      </div>
    </section>
  )
}

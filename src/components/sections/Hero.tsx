import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '@/i18n/useI18n'
import { profile, metrics } from '@/content/profile'
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'
import { Metric } from '@/components/ui/Metric'

/**
 * Cycles a list of phrases with a typing effect. Falls back to the first
 * phrase, statically, when the visitor prefers reduced motion.
 */
function useRotatingPhrase(phrases: string[], enabled: boolean) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(enabled ? '' : phrases[0])
  const [deleting, setDeleting] = useState(false)

  // Reset when the locale swaps the phrase list under us.
  useEffect(() => {
    setIndex(0)
    setText(enabled ? '' : phrases[0])
    setDeleting(false)
  }, [phrases, enabled])

  useEffect(() => {
    if (!enabled) return
    const current = phrases[index % phrases.length]

    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), 2200)
      return () => clearTimeout(hold)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setIndex((value) => (value + 1) % phrases.length)
      return
    }

    const tick = setTimeout(
      () => {
        setText((value) =>
          deleting ? current.slice(0, value.length - 1) : current.slice(0, value.length + 1),
        )
      },
      deleting ? 26 : 52,
    )
    return () => clearTimeout(tick)
  }, [text, deleting, index, phrases, enabled])

  return text
}

export function Hero() {
  const { t } = useI18n()
  const shouldReduceMotion = useReducedMotion()
  const phrase = useRotatingPhrase(t.hero.rotating, !shouldReduceMotion)

  const entrance = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section className="relative overflow-hidden pt-nav">
      {/* Ambient layers: a dot grid masked to a soft ellipse, and a radial wash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-dots [mask-image:radial-gradient(70%_60%_at_50%_10%,black,transparent)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-glow" />

      <div className="container-page relative">
        <div className="flex min-h-[calc(100dvh-var(--spacing-nav))] flex-col justify-center py-16">
          <motion.p
            {...entrance(0)}
            className="mono mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 ps-2.5 pe-4 text-2xs text-fg-muted ar:font-arabic ar:text-xs"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-positive" />
            </span>
            {t.hero.available}
          </motion.p>

          <motion.h1 {...entrance(0.08)} className="max-w-5xl">
            <span className="mono mb-3 block text-base text-accent ar:font-arabic">
              {t.hero.name}
            </span>
            <span className="block text-5xl font-semibold tracking-tighter text-fg ar:tracking-normal">
              {t.hero.role}
            </span>
          </motion.h1>

          {/* The rotating line. Plain inline flow — a flex row here would
              swallow the spaces around the phrase. `min-h` reserves the row so
              nothing below shifts as the phrase types and deletes. */}
          <motion.p
            {...entrance(0.16)}
            className="mt-6 min-h-[3.5em] max-w-3xl text-xl text-fg-muted sm:min-h-[2.5em]"
          >
            {t.hero.lead}
            <span className="text-fg">{phrase}</span>
            <span
              aria-hidden="true"
              className="mx-0.5 inline-block h-[0.95em] w-px translate-y-[0.1em] animate-pulse bg-accent"
            />
            {t.hero.leadSuffix}
          </motion.p>

          <motion.p {...entrance(0.24)} className="mt-6 max-w-prose text-base text-fg-subtle">
            {t.hero.summary}
          </motion.p>

          <motion.div {...entrance(0.32)} className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonAnchor href="#work" variant="primary" size="lg" withArrow>
              {t.hero.ctaWork}
            </ButtonAnchor>
            <ButtonLink to="/#contact" variant="secondary" size="lg">
              {t.hero.ctaContact}
            </ButtonLink>
            <ButtonAnchor href={profile.resumeUrl} download variant="ghost">
              {t.actions.downloadResume}
            </ButtonAnchor>
          </motion.div>

          <motion.div
            {...entrance(0.42)}
            className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
          >
            {metrics.map((metric) => (
              <Metric
                key={metric.key}
                value={metric.value}
                label={t.metrics[metric.key]}
                large
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

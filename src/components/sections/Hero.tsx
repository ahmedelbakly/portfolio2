'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '@/i18n/useI18n'
import { useTrack } from '@/track/useTrack'
import { ButtonAnchor } from '@/components/ui/Button'
import { Metric } from '@/components/ui/Metric'
import { TrackSwitcher } from '@/components/ui/TrackSwitcher'

/**
 * Cycles a list of phrases with a typing effect. Falls back to the first
 * phrase, statically, when the visitor prefers reduced motion.
 *
 * The initial value must not depend on the motion preference. The server
 * cannot know it, so branching on it here rendered an empty phrase into the
 * static HTML while a reduced-motion client rendered a full one — a text
 * mismatch that made React throw the pre-rendered tree away. Starting on the
 * first phrase is identical everywhere, and it also puts real words in the
 * markup for anything that does not run the animation.
 */
function useRotatingPhrase(phrases: string[], enabled: boolean) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(phrases[0])
  const [deleting, setDeleting] = useState(false)

  // Restart when the locale or the active track swaps the phrase list.
  useEffect(() => {
    setIndex(0)
    setText(phrases[0])
    setDeleting(false)
  }, [phrases])

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
  const { t, pick } = useI18n()
  const { track, trackId } = useTrack()
  const shouldReduceMotion = useReducedMotion()
  const phrase = useRotatingPhrase(pick(track.rotating), !shouldReduceMotion)

  // The hero is above the fold, so its entrance must not be expressed as an
  // `initial` opacity: framer-motion writes that inline, and the statically
  // generated page would ship with an invisible hero for anyone without
  // JavaScript. Animating only after mount keeps the server markup visible.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const entrance = (delay: number) =>
    shouldReduceMotion || !mounted
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  // Content that swaps with the track shares one transition, so the block
  // reads as a single change rather than several independent ones.
  const swap = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
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
            {/* min-h holds the row so switching tracks never jumps the page. */}
            <span className="block min-h-[2.1em] sm:min-h-[1.1em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={trackId}
                  {...swap}
                  className="block text-5xl font-semibold tracking-tighter text-fg ar:tracking-normal"
                >
                  {pick(track.role)}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.div {...entrance(0.14)} className="mt-8 flex flex-wrap items-center gap-3">
            <span className="mono text-2xs tracking-widest text-fg-subtle uppercase ar:font-arabic ar:text-xs ar:tracking-normal ar:normal-case">
              {t.tracks.hiringFor}
            </span>
            <TrackSwitcher />
          </motion.div>

          {/* The rotating line. Plain inline flow — a flex row here would
              swallow the spaces around the phrase. */}
          <motion.p
            {...entrance(0.2)}
            className="mt-8 min-h-[3.5em] max-w-3xl text-xl text-fg-muted sm:min-h-[2.5em]"
          >
            {t.hero.lead}
            <span className="text-fg">{phrase}</span>
            <span
              aria-hidden="true"
              className="mx-0.5 inline-block h-[0.95em] w-px translate-y-[0.1em] animate-pulse bg-accent"
            />
            {t.hero.leadSuffix}
          </motion.p>

          <motion.div {...entrance(0.26)} className="mt-6 min-h-[5.5em] max-w-prose sm:min-h-[4.5em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={trackId} {...swap} className="text-base text-fg-subtle">
                {pick(track.summary)}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div {...entrance(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonAnchor href="#work" variant="primary" size="lg" withArrow>
              {t.hero.ctaWork}
            </ButtonAnchor>
            <ButtonAnchor href="#contact" variant="secondary" size="lg">
              {t.hero.ctaContact}
            </ButtonAnchor>
            {/* Downloads whichever CV matches the selected profile. */}
            <ButtonAnchor
              key={trackId}
              href={track.resumeUrl}
              download
              variant="ghost"
              aria-label={`${t.actions.downloadResume} — ${pick(track.role)}`}
            >
              {t.actions.downloadResume}
            </ButtonAnchor>
          </motion.div>

          <motion.div
            {...entrance(0.42)}
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
          >
            {track.metrics.map((metric) => (
              // Keyed by track so the figures re-run their count-up on switch.
              <Metric
                key={`${trackId}-${metric.value}`}
                value={metric.value}
                label={pick(metric.label)}
                large
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

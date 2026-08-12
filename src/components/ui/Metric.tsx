'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface MetricProps {
  value: string
  label: string
  /** Larger treatment for the hero metrics strip. */
  large?: boolean
}

/**
 * Splits a value like "1,000+" into its numeric part and its suffix so the
 * number can count up while the suffix stays put. Values that are not numeric
 * at all (e.g. "Redis", "EN/AR") render verbatim.
 */
function parseValue(value: string) {
  const match = /^(\d[\d,]*)(.*)$/.exec(value)
  if (!match) return null
  return {
    target: Number(match[1].replace(/,/g, '')),
    suffix: match[2],
  }
}

/**
 * True when the element occupies any part of the viewport right now.
 *
 * `useInView` alone is not enough: it observes a shrunken root, so an element
 * sitting on the viewport edge — which is exactly where the hero metrics land
 * — may never report an intersection. A figure that renders as zero because an
 * observer stayed quiet is worse than one that simply does not animate, so the
 * initial geometry is measured directly.
 */
function isOnScreen(element: HTMLElement | null) {
  if (!element) return false
  const rect = element.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

export function Metric({ value, label, large = false }: MetricProps) {
  const ref = useRef<HTMLDivElement>(null)
  const observed = useInView(ref, { once: true, amount: 0.4 })
  const shouldReduceMotion = useReducedMotion()

  const parsed = parseValue(value)
  const [visible, setVisible] = useState(false)

  // Measure once on mount, then defer to the observer for anything that starts
  // below the fold.
  useEffect(() => {
    if (isOnScreen(ref.current)) setVisible(true)
  }, [])

  const start = visible || observed
  const animate = parsed !== null && !shouldReduceMotion
  const [count, setCount] = useState(parsed?.target ?? 0)

  useEffect(() => {
    if (!parsed) return

    // Not animating, or not revealed yet — show the real figure, never zero.
    if (!animate || !start) {
      setCount(parsed.target)
      return
    }

    const duration = 900
    const target = parsed.target
    let frame = 0
    let began: number | null = null

    const step = (timestamp: number) => {
      if (began === null) began = timestamp
      const progress = Math.min((timestamp - began) / duration, 1)
      // easeOutExpo — fast arrival, gentle settle.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
    // `parsed` is derived from `value`; depending on the primitive keeps the
    // effect from re-running on every render.
  }, [value, animate, start]) // eslint-disable-line react-hooks/exhaustive-deps

  const display = parsed ? `${count.toLocaleString('en-US')}${parsed.suffix}` : value

  return (
    // The rule sits on the leading edge, so it flips with the writing direction.
    <div ref={ref} className="flex flex-col gap-2 border-s border-line py-2 ps-6">
      {/* Numerals stay LTR in both locales — a figure is a figure. */}
      <span
        dir="ltr"
        className={`mono font-medium tracking-tighter text-fg ${large ? 'text-4xl' : 'text-3xl'}`}
      >
        {display}
      </span>
      <span className="max-w-48 text-sm/snug text-fg-subtle">{label}</span>
    </div>
  )
}

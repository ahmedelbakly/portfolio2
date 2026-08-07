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
    formatted: match[1],
  }
}

function useCountUp(target: number, active: boolean, enabled: boolean) {
  const [current, setCurrent] = useState(enabled ? 0 : target)

  useEffect(() => {
    if (!enabled || !active) return
    const duration = 900
    let frame = 0
    let start: number | null = null

    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      // easeOutExpo — fast arrival, gentle settle.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCurrent(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, active, enabled])

  return enabled ? current : target
}

export function Metric({ value, label, large = false }: MetricProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const shouldReduceMotion = useReducedMotion()

  const parsed = parseValue(value)
  const animate = parsed !== null && !shouldReduceMotion
  const count = useCountUp(parsed?.target ?? 0, inView, animate)

  const display = parsed
    ? `${animate ? count.toLocaleString('en-US') : parsed.formatted}${parsed.suffix}`
    : value

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

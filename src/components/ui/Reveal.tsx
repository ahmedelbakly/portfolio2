'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  /** Stagger index — offsets the entrance by 60ms per step, capped at 400ms. */
  index?: number
  /** Distance in pixels the element travels on entry. */
  distance?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'header'
}

/**
 * Scroll-triggered entrance that never hides content it cannot animate.
 *
 * The naive version renders `initial={{ opacity: 0 }}`, which framer-motion
 * writes as an inline style. In a statically generated page that means the
 * markup ships invisible: crawlers see the text, humans without JavaScript see
 * a blank page, and the whole point of pre-rendering is lost.
 *
 * So the server output — and the first client render, which must match it — is
 * plain, visible markup. After mount, only elements still below the fold opt
 * into the animation. Anything already on screen has been seen and stays put
 * rather than flashing out and back in.
 */
export function Reveal({
  children,
  index = 0,
  distance = 18,
  className,
  as = 'div',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (shouldReduceMotion) return
    const element = ref.current
    if (!element) return
    // Below the fold at mount — the reader has not seen it yet.
    if (element.getBoundingClientRect().top > window.innerHeight) setAnimate(true)
  }, [shouldReduceMotion])

  const Tag = as

  if (!animate) {
    return (
      <Tag ref={ref as React.Ref<never>} className={className}>
        {children}
      </Tag>
    )
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}

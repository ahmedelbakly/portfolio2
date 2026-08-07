import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

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
 * Scroll-triggered entrance. Fires once, respects `prefers-reduced-motion`,
 * and keeps every animated element on the same easing curve.
 */
export function Reveal({
  children,
  index = 0,
  distance = 18,
  className,
  as = 'div',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
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

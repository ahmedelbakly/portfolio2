'use client'

import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id?: string
  eyebrow?: string
  title?: string
  subtitle?: string
  children: ReactNode
  /** Adds a hairline rule above the section. */
  bordered?: boolean
  className?: string
}

/**
 * The page's structural unit: an eyebrow, a headline, an optional standfirst,
 * then content. Every home-page section uses it, which is what keeps the
 * vertical rhythm identical throughout.
 */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  bordered = false,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`relative py-section ${className}`}>
      {bordered && (
        <div
          aria-hidden="true"
          className="absolute inset-x-gutter top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
        />
      )}
      <div className="container-page">
        {(eyebrow || title || subtitle) && (
          <header className="mb-12 flex max-w-3xl flex-col gap-4">
            {eyebrow && (
              <Reveal>
                <p className="eyebrow ar:text-sm ar:normal-case ar:tracking-normal ar:font-arabic">
                  <span aria-hidden="true" className="h-px w-7 bg-accent/70" />
                  {eyebrow}
                </p>
              </Reveal>
            )}
            {title && (
              <Reveal index={1}>
                <h2 className="text-3xl font-semibold tracking-tighter text-fg ar:tracking-normal">
                  {title}
                </h2>
              </Reveal>
            )}
            {subtitle && (
              <Reveal index={2}>
                <p className="max-w-prose text-lg text-fg-muted">{subtitle}</p>
              </Reveal>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

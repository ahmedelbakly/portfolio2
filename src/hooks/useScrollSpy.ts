import { useEffect, useState } from 'react'

/**
 * Reports which of the given section ids is currently the reading target.
 *
 * Uses a top-biased root margin rather than the intersection ratio, so a
 * short section sandwiched between two tall ones still becomes active when it
 * reaches the reading line instead of being skipped.
 *
 * The id list is collapsed to a string key so callers can pass a fresh array
 * literal on every render without re-subscribing the observer.
 */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const sectionIds = key ? key.split(',') : []
    if (sectionIds.length === 0) {
      setActive(null)
      return
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActive(visible[0].target.id)
      },
      // The band sits just below the sticky header and covers the upper third
      // of the viewport — roughly where a reader's attention actually is.
      { rootMargin: '-20% 0px -68% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [key])

  return active
}

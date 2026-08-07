import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Restores scroll position on navigation.
 *
 * A plain "scroll to top on every route change" would break in-page anchors,
 * so a hash in the URL is honoured first — including the `/#work` links that
 * arrive from a case study page, where the target does not exist until the
 * home page has mounted.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Defer a frame so the destination route has rendered its sections.
      const raf = requestAnimationFrame(() => {
        const target = document.querySelector(hash)
        target?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
      return () => cancelAnimationFrame(raf)
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '@/i18n/useI18n'
import { useTrack } from '@/track/useTrack'
import { tracks } from '@/content/tracks'

/**
 * Segmented control that reframes the page for the role being hired for.
 * The indicator is a shared layout element, so it slides between segments
 * instead of cutting.
 */
export function TrackSwitcher({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { pick, t } = useI18n()
  const { trackId, setTrack } = useTrack()
  const shouldReduceMotion = useReducedMotion()

  const pad = size === 'sm' ? 'px-3.5 py-1.5 text-xs' : 'px-5 py-2.5 text-sm'

  return (
    <div
      role="radiogroup"
      aria-label={t.tracks.switchLabel}
      className="inline-flex rounded-full border border-line bg-surface/70 p-1 backdrop-blur-sm"
    >
      {tracks.map((track) => {
        const active = track.id === trackId
        return (
          <button
            key={track.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTrack(track.id)}
            className={`relative rounded-full font-medium transition-colors duration-200 ${pad} ${
              active ? 'text-accent-contrast' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {active && (
              <motion.span
                layoutId="track-indicator"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 420, damping: 34 }
                }
              />
            )}
            <span className="relative whitespace-nowrap">{pick(track.label)}</span>
          </button>
        )
      })}
    </div>
  )
}

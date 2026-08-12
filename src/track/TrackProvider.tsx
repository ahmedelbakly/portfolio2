import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_TRACK, getTrack, type TrackId } from '@/content/tracks'
import { TrackContext, TRACK_STORAGE_KEY } from './context'

function readStoredTrack(): TrackId {
  if (typeof window === 'undefined') return DEFAULT_TRACK
  try {
    const stored = window.localStorage.getItem(TRACK_STORAGE_KEY)
    return stored === 'backend' || stored === 'fullstack' ? stored : DEFAULT_TRACK
  } catch {
    return DEFAULT_TRACK
  }
}

/**
 * Holds which professional profile the visitor is reading. Unlike theme and
 * locale this is not applied pre-paint — it changes copy rather than colour,
 * so a first render on the default costs nothing visually.
 */
export function TrackProvider({ children }: { children: ReactNode }) {
  const [trackId, setTrackId] = useState<TrackId>(readStoredTrack)

  const setTrack = useCallback((id: TrackId) => {
    setTrackId(id)
    try {
      window.localStorage.setItem(TRACK_STORAGE_KEY, id)
    } catch {
      // Private mode or blocked storage — the choice just will not persist.
    }
  }, [])

  const value = useMemo(
    () => ({ trackId, track: getTrack(trackId), setTrack }),
    [trackId, setTrack],
  )

  return <TrackContext value={value}>{children}</TrackContext>
}

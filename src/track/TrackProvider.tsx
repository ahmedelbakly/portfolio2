'use client'

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_TRACK, getTrack, type TrackId } from '@/content/tracks'
import { TrackContext, TRACK_STORAGE_KEY } from './context'

/**
 * Which professional profile the visitor is reading.
 *
 * Starts on the default so the first client render matches the statically
 * generated HTML, then adopts the stored choice after mount. A returning
 * visitor who picked Backend sees the Full-Stack headline briefly — that is
 * the accepted trade-off for having real content in the static markup.
 */
export function TrackProvider({ children }: { children: ReactNode }) {
  const [trackId, setTrackId] = useState<TrackId>(DEFAULT_TRACK)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(TRACK_STORAGE_KEY)
      if (stored === 'backend' || stored === 'fullstack') setTrackId(stored)
    } catch {
      // Blocked storage — the default profile is a fine place to land.
    }
  }, [])

  const setTrack = useCallback((id: TrackId) => {
    setTrackId(id)
    try {
      window.localStorage.setItem(TRACK_STORAGE_KEY, id)
    } catch {
      // Private mode — the choice just will not persist.
    }
  }, [])

  const value = useMemo(
    () => ({ trackId, track: getTrack(trackId), setTrack }),
    [trackId, setTrack],
  )

  return <TrackContext value={value}>{children}</TrackContext>
}

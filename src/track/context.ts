import { createContext } from 'react'
import type { Track, TrackId } from '@/content/tracks'

export interface TrackValue {
  trackId: TrackId
  track: Track
  setTrack: (id: TrackId) => void
}

export const TrackContext = createContext<TrackValue | null>(null)

export const TRACK_STORAGE_KEY = 'ae-track'

import { use } from 'react'
import { TrackContext, type TrackValue } from './context'

export function useTrack(): TrackValue {
  const context = use(TrackContext)
  if (!context) {
    throw new Error('useTrack must be used inside <TrackProvider>')
  }
  return context
}

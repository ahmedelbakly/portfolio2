'use client'

import { useI18n } from '@/i18n/useI18n'
import { useTrack } from '@/track/useTrack'
import { tracks } from '@/content/tracks'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Both profiles side by side. Selecting one also reframes the hero, so a
 * visitor who arrives here first still leaves with the page set to the role
 * they care about.
 */
export function Tracks() {
  const { t, pick } = useI18n()
  const { trackId, setTrack } = useTrack()

  return (
    <Section
      id="profiles"
      eyebrow={t.tracks.eyebrow}
      title={t.tracks.title}
      subtitle={t.tracks.subtitle}
      bordered
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {tracks.map((track, index) => {
          const active = track.id === trackId
          return (
            <Reveal key={track.id} index={index} className="h-full">
              <article
                className={`flex h-full flex-col gap-6 rounded-xl border p-6 transition-colors duration-300 sm:p-8 ${
                  active
                    ? 'border-line-accent bg-accent-softer'
                    : 'border-line bg-surface hover:border-line-strong'
                }`}
              >
                <header className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`size-1.5 rounded-full transition-colors duration-300 ${
                        active ? 'bg-accent' : 'bg-fg-subtle/40'
                      }`}
                    />
                    <span className="mono text-2xs tracking-widest text-fg-subtle uppercase ar:font-arabic ar:text-xs ar:tracking-normal ar:normal-case">
                      {active ? t.tracks.viewing : t.tracks.hiringFor}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-fg ar:tracking-normal">
                    {pick(track.role)}
                  </h3>
                  <p className="mono text-xs text-fg-muted" dir="ltr">
                    {track.signature}
                  </p>
                </header>

                <p className="text-base leading-relaxed text-fg-muted">{pick(track.blurb)}</p>

                <div className="flex flex-col gap-3">
                  <h4 className="mono text-2xs tracking-widest text-fg-subtle uppercase ar:font-arabic ar:text-xs ar:tracking-normal ar:normal-case">
                    {t.tracks.competencies}
                  </h4>
                  <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    {pick(track.competencies).map((item) => (
                      <li
                        key={item}
                        className="relative ps-4 text-sm text-fg-muted before:absolute before:top-[0.62em] before:start-0 before:size-1 before:rounded-full before:bg-accent/60"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={track.resumeUrl}
                    download
                    aria-label={`${t.tracks.downloadCv} — ${pick(track.role)}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors duration-150 hover:border-accent hover:bg-accent hover:text-accent-contrast"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0"
                    >
                      <path
                        d="M8 2v8m0 0 3-3m-3 3L5 7M3 12.5h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {t.tracks.downloadCv}
                  </a>

                  {!active && (
                    <button
                      type="button"
                      onClick={() => setTrack(track.id)}
                      className="rounded-full px-4 py-2.5 text-sm font-medium text-accent transition-colors duration-150 hover:bg-accent-soft"
                    >
                      {pick(track.label)} →
                    </button>
                  )}
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

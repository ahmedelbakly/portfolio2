import { useI18n } from '@/i18n/useI18n'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import portrait from '@/assets/images/myPhoto.jpg'

export function About() {
  const { t } = useI18n()

  const facts = [
    { label: t.about.facts.location, value: t.about.facts.locationValue },
    { label: t.about.facts.availability, value: t.about.facts.availabilityValue },
    { label: t.about.facts.languages, value: t.about.facts.languagesValue },
    { label: t.about.facts.focus, value: t.about.facts.focusValue },
  ]

  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title} bordered>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          {t.about.paragraphs.map((paragraph, index) => (
            <Reveal key={index} index={index}>
              <p className="max-w-prose text-lg leading-relaxed text-fg-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <Reveal index={1}>
            {/* Desaturated, scrimmed and offset-framed — an editorial treatment
                that reads as intentional rather than as a low-resolution
                studio snapshot, and stops the white backdrop from punching a
                bright hole in the dark theme. */}
            <figure className="relative w-fit">
              <div className="relative w-48 overflow-hidden rounded-lg border border-line sm:w-56">
                <img
                  src={portrait}
                  alt={t.about.portraitAlt}
                  width={320}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover grayscale transition-[filter,transform] duration-500 ease-out-expo group-hover:scale-[1.02] hover:grayscale-0 dark:brightness-90 dark:contrast-105"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-canvas/70 via-transparent to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-accent-softer mix-blend-overlay"
                />
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 -end-2 -z-10 size-full rounded-lg border border-line-accent"
              />
            </figure>
          </Reveal>

          <Reveal index={2}>
            <dl className="flex flex-col">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-t border-line py-4 first:border-t-0 first:pt-0"
                >
                  <dt className="mono text-2xs tracking-wide text-fg-subtle uppercase ar:font-arabic ar:tracking-normal ar:normal-case ar:text-xs">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

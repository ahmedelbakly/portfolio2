'use client'

import { useI18n } from '@/i18n/useI18n'
import { roles, capabilities, education } from '@/content/experience'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { TagList } from '@/components/ui/Tag'

export function Experience() {
  const { t, pick } = useI18n()

  return (
    <Section
      id="experience"
      eyebrow={t.experience.eyebrow}
      title={t.experience.title}
      subtitle={t.experience.subtitle}
      bordered
    >
      <div className="flex flex-col gap-20">
        {roles.map((role) => (
          <div
            key={pick(role.company)}
            className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16"
          >
            <Reveal>
              {/* Sticks while the long responsibility list scrolls past it. */}
              <div className="flex flex-col gap-3 lg:sticky lg:top-28">
                <p
                  className="mono flex items-center gap-2 text-2xs text-accent"
                  dir="ltr"
                >
                  {role.start}
                  <span className="h-px w-4 bg-line-strong" />
                  {pick(role.end)}
                </p>
                <h3 className="text-xl font-semibold tracking-tight text-fg ar:tracking-normal">
                  {pick(role.title)}
                </h3>
                <p className="text-sm text-fg-muted">{pick(role.company)}</p>
                <p className="max-w-xs text-sm text-fg-subtle">{pick(role.context)}</p>
              </div>
            </Reveal>

            <ul className="flex flex-col">
              {pick(role.responsibilities).map((item, index) => (
                <Reveal
                  as="li"
                  key={index}
                  index={index}
                  className="group border-t border-line py-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mono mt-1 shrink-0 text-2xs text-fg-subtle transition-colors duration-200 group-hover:text-accent"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-base leading-relaxed text-fg-muted">{item}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}

        {/* --- Cloud & delivery -------------------------------------------- */}
        <div className="flex flex-col gap-10">
          <Reveal>
            <div className="flex flex-col gap-3">
              <p className="eyebrow ar:font-arabic ar:text-sm ar:normal-case ar:tracking-normal">
                <span aria-hidden="true" className="h-px w-7 bg-accent/70" />
                {t.capabilities.eyebrow}
              </p>
              <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-fg ar:tracking-normal">
                {t.capabilities.title}
              </h3>
              <p className="max-w-prose text-base text-fg-muted">{t.capabilities.subtitle}</p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map((capability, index) => (
              <Reveal
                key={pick(capability.title)}
                index={index}
                className="flex h-full flex-col gap-4 rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-accent"
              >
                <h4 className="text-base font-semibold tracking-tight text-fg ar:tracking-normal">
                  {pick(capability.title)}
                </h4>
                <p className="flex-1 text-sm leading-relaxed text-fg-muted">
                  {pick(capability.body)}
                </p>
                <TagList items={capability.items} subtle />
              </Reveal>
            ))}
          </div>
        </div>

        {/* --- Education ---------------------------------------------------- */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <p className="eyebrow ar:font-arabic ar:text-sm ar:normal-case ar:tracking-normal">
              <span aria-hidden="true" className="h-px w-7 bg-accent/70" />
              {t.education.eyebrow}
            </p>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {education.map((entry, index) => (
              <Reveal
                as="li"
                key={pick(entry.title)}
                index={index}
                className="flex flex-col gap-2 bg-canvas p-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-base font-medium text-fg">{pick(entry.title)}</h4>
                  {entry.year && (
                    <span className="mono shrink-0 text-2xs text-fg-subtle" dir="ltr">
                      {entry.year}
                    </span>
                  )}
                </div>
                <p className="text-sm text-fg-muted">{pick(entry.institution)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

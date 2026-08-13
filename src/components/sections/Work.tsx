'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/useI18n'
import { projects } from '@/content/projects'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'
import { projectHref } from '@/lib/paths'

export function Work() {
  const { t, pick, locale } = useI18n()

  return (
    <Section id="work" eyebrow={t.work.eyebrow} title={t.work.title} subtitle={t.work.subtitle}>
      <ul className="flex flex-col">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} index={index} className="group">
            <Link
              href={projectHref(locale, project.slug)}
              className="relative grid gap-6 border-t border-line py-10 transition-colors duration-300 hover:border-line-accent md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-12 lg:py-12"
            >
              {/* Hover wash — bleeds past the gutter so the row reads as a
                  full-width target without breaking the text grid. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-4 inset-y-0 -z-10 rounded-xl bg-muted sm:-inset-x-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="mono text-2xs text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px w-6 bg-line-strong" />
                  <span className="mono text-2xs text-fg-subtle" dir="ltr">
                    {project.period}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-fg ar:tracking-normal">
                  {project.name}
                </h3>
                <p className="text-sm text-fg-muted">{pick(project.kind)}</p>

                <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
                  <div className="flex flex-col gap-1">
                    <dt className="mono text-2xs tracking-wide text-fg-subtle uppercase ar:font-arabic ar:tracking-normal ar:normal-case">
                      {t.work.role}
                    </dt>
                    <dd className="text-sm text-fg">{pick(project.role)}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="mono text-2xs tracking-wide text-fg-subtle uppercase ar:font-arabic ar:tracking-normal ar:normal-case">
                      {t.caseStudy.domain}
                    </dt>
                    <dd className="text-sm text-fg">{pick(project.domain)}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <p className="text-lg leading-relaxed text-fg-muted">{pick(project.tagline)}</p>

                <div className="flex flex-col gap-5">
                  <ul className="flex flex-wrap gap-2">
                    {project.featuredStack.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                    {t.work.viewCase}
                    <svg
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-out-expo rtl:-scale-x-100 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
      <div className="border-t border-line" />
    </Section>
  )
}

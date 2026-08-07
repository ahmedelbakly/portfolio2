import { Link, Navigate, useParams } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n'
import { getAdjacentProjects, getProject } from '@/content/projects'
import { Reveal } from '@/components/ui/Reveal'
import { Metric } from '@/components/ui/Metric'
import { TagList } from '@/components/ui/Tag'
import { ArchitectureDiagram } from '@/components/ui/ArchitectureDiagram'

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, pick } = useI18n()
  const project = getProject(slug)

  if (!project) return <Navigate to="/404" replace />

  const { previous, next } = getAdjacentProjects(project.slug)

  return (
    <article className="pt-nav">
      {/* --- Header ---------------------------------------------------------- */}
      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid-dots [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-glow" />

        <div className="container-page relative py-16 lg:py-24">
          <Reveal>
            <Link
              to="/#work"
              className="group mono inline-flex items-center gap-2 text-2xs text-fg-muted transition-colors hover:text-accent"
            >
              <svg
                viewBox="0 0 16 16"
                width="12"
                height="12"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-200 rtl:-scale-x-100 ltr:group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
              >
                <path
                  d="M13 8H3M7 4L3 8l4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.caseStudy.back}
            </Link>
          </Reveal>

          <Reveal index={1}>
            <h1 className="mt-8 text-4xl font-semibold tracking-tighter text-fg ar:tracking-normal">
              {project.name}
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="mt-4 max-w-3xl text-xl leading-relaxed text-fg-muted">
              {pick(project.tagline)}
            </p>
          </Reveal>

          <Reveal index={3}>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 lg:grid-cols-4">
              <Fact label={t.caseStudy.role} value={pick(project.role)} />
              <Fact label={t.caseStudy.domain} value={pick(project.domain)} />
              <Fact label={t.work.year} value={project.period} mono />
              <Fact label={t.caseStudy.scale} value={pick(project.kind)} />
            </dl>
          </Reveal>
        </div>
      </header>

      <div className="container-page flex flex-col gap-20 py-20 lg:gap-28 lg:py-28">
        {/* --- Overview ------------------------------------------------------ */}
        <Block eyebrow={t.caseStudy.overview}>
          <p className="max-w-prose text-lg leading-relaxed text-fg-muted">
            {pick(project.summary)}
          </p>
        </Block>

        {/* --- Metrics ------------------------------------------------------- */}
        <Reveal>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {project.metrics.map((metric) => (
              <Metric key={metric.value} value={metric.value} label={pick(metric.label)} />
            ))}
          </div>
        </Reveal>

        {/* --- Constraint & approach ----------------------------------------- */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Block eyebrow={t.caseStudy.challenge}>
            <p className="text-lg leading-relaxed text-fg-muted">{pick(project.challenge)}</p>
          </Block>
          <Block eyebrow={t.caseStudy.approach}>
            <p className="text-lg leading-relaxed text-fg-muted">{pick(project.approach)}</p>
          </Block>
        </div>

        {/* --- Architecture --------------------------------------------------- */}
        <Block eyebrow={t.caseStudy.architecture}>
          <ArchitectureDiagram architecture={project.architecture} />
        </Block>

        {/* --- What I built --------------------------------------------------- */}
        <Block eyebrow={t.caseStudy.highlights}>
          <ul className="flex flex-col">
            {pick(project.highlights).map((item, index) => (
              <Reveal
                as="li"
                key={index}
                index={index}
                className="group flex gap-5 border-t border-line py-5 first:border-t-0 first:pt-0"
              >
                <span
                  aria-hidden="true"
                  className="mono mt-1 shrink-0 text-2xs text-fg-subtle transition-colors duration-200 group-hover:text-accent"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-base leading-relaxed text-fg-muted">{item}</p>
              </Reveal>
            ))}
          </ul>
        </Block>

        {/* --- Key decisions -------------------------------------------------- */}
        <Block eyebrow={t.caseStudy.decisions}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.decisions.map((decision, index) => (
              <Reveal
                key={pick(decision.title)}
                index={index}
                className="flex h-full flex-col gap-3 rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-accent"
              >
                <h3 className="text-base font-semibold tracking-tight text-fg ar:tracking-normal">
                  {pick(decision.title)}
                </h3>
                <p className="text-sm leading-relaxed text-fg-muted">{pick(decision.body)}</p>
              </Reveal>
            ))}
          </div>
        </Block>

        {/* --- Stack ---------------------------------------------------------- */}
        <Block eyebrow={t.caseStudy.stack}>
          <TagList items={project.stack} />
        </Block>
      </div>

      {/* --- Adjacent case studies -------------------------------------------- */}
      <nav className="border-t border-line" aria-label={t.caseStudy.next}>
        <div className="container-page grid gap-px md:grid-cols-2">
          {previous && (
            <AdjacentLink
              to={`/work/${previous.slug}`}
              label={t.caseStudy.previous}
              name={previous.name}
              kind={pick(previous.kind)}
              direction="previous"
            />
          )}
          {next && (
            <AdjacentLink
              to={`/work/${next.slug}`}
              label={t.caseStudy.next}
              name={next.name}
              kind={pick(next.kind)}
              direction="next"
            />
          )}
        </div>
      </nav>
    </article>
  )
}

function Fact({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="mono text-2xs tracking-wide text-fg-subtle uppercase ar:font-arabic ar:text-xs ar:normal-case ar:tracking-normal">
        {label}
      </dt>
      <dd
        className={`text-sm text-fg ${mono ? 'mono' : ''}`}
        dir={mono ? 'ltr' : undefined}
      >
        {value}
      </dd>
    </div>
  )
}

function Block({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:gap-12">
      <Reveal>
        <h2 className="eyebrow lg:sticky lg:top-28 ar:font-arabic ar:text-sm ar:normal-case ar:tracking-normal">
          <span aria-hidden="true" className="h-px w-7 bg-accent/70" />
          {eyebrow}
        </h2>
      </Reveal>
      <div>{children}</div>
    </section>
  )
}

function AdjacentLink({
  to,
  label,
  name,
  kind,
  direction,
}: {
  to: string
  label: string
  name: string
  kind: string
  direction: 'previous' | 'next'
}) {
  return (
    <Link
      to={to}
      className={`group flex flex-col gap-2 py-10 transition-colors duration-300 hover:bg-muted ${
        direction === 'next' ? 'md:items-end md:text-end' : ''
      }`}
    >
      <span className="mono text-2xs text-fg-subtle">{label}</span>
      <span className="text-2xl font-semibold tracking-tight text-fg transition-colors duration-200 group-hover:text-accent ar:tracking-normal">
        {name}
      </span>
      <span className="text-sm text-fg-muted">{kind}</span>
    </Link>
  )
}

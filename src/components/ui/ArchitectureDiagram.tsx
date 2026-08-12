import { useI18n } from '@/i18n/useI18n'
import type { Project } from '@/content/projects'
import { Reveal } from './Reveal'

/**
 * Renders a project's architecture as a flow of layer cards joined by dashed
 * connectors, with a bar of cross-cutting concerns beneath. Built on logical
 * properties so the flow reverses correctly in Arabic.
 */
export function ArchitectureDiagram({
  architecture,
}: {
  architecture: Project['architecture']
}) {
  const { pick } = useI18n()
  const { layers, crosscutting } = architecture

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-3">
        {layers.map((layer, index) => (
          <Reveal
            key={pick(layer.label)}
            index={index}
            className="relative flex items-stretch"
          >
            <div className="flex flex-1 flex-col gap-3 rounded-lg border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-accent">
              <span className="mono text-2xs tracking-wide text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h4 className="text-base font-semibold tracking-tight text-fg ar:tracking-normal">
                {pick(layer.label)}
              </h4>
              <ul className="flex flex-col gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    dir="ltr"
                    className="mono relative ps-4 text-xs text-fg-muted before:absolute before:top-[0.52em] before:start-0 before:size-1 before:rounded-full before:bg-fg-subtle"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dashed run between cards; hidden once the grid wraps to one column. */}
            {index < layers.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -end-3 hidden h-px w-3 bg-[repeating-linear-gradient(to_right,var(--line-strong)_0_3px,transparent_3px_6px)] md:block"
              />
            )}
          </Reveal>
        ))}
      </div>

      <Reveal index={layers.length}>
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-dashed border-line-strong bg-accent-softer px-6 py-4">
          <span aria-hidden="true" className="h-px w-7 shrink-0 bg-accent" />
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {crosscutting.map((item) => (
              <li key={item} dir="ltr" className="mono text-xs text-fg-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  )
}

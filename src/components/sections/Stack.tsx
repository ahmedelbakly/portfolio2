import { useI18n } from '@/i18n/useI18n'
import { stackGroups } from '@/content/stack'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'

export function Stack() {
  const { t } = useI18n()

  return (
    <Section
      id="stack"
      eyebrow={t.stack.eyebrow}
      title={t.stack.title}
      subtitle={t.stack.subtitle}
      bordered
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stackGroups.map((group, index) => (
          <Reveal
            key={group.key}
            index={index}
            className="flex flex-col gap-4 bg-canvas p-6 transition-colors duration-300 hover:bg-surface"
          >
            <div className="flex items-baseline gap-2.5">
              <span className="mono text-2xs text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-sm font-semibold tracking-tight text-fg ar:tracking-normal">
                {t.stack.groups[group.key]}
              </h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

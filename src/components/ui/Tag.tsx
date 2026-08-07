interface TagProps {
  children: string
  /** Borderless variant for secondary chips such as cross-cutting concerns. */
  subtle?: boolean
}

/**
 * A stack chip. Always renders in the mono face and forces LTR in both
 * locales — a technology name is an identifier, not prose, and should not be
 * re-typeset or reordered when the interface language changes.
 */
export function Tag({ children, subtle = false }: TagProps) {
  return (
    <span
      dir="ltr"
      className={
        'mono inline-flex items-center rounded-full px-3 py-1 text-2xs font-medium tracking-tight ' +
        'transition-colors duration-150 hover:border-line-accent hover:text-fg ' +
        (subtle
          ? 'border border-transparent text-fg-subtle'
          : 'border border-line bg-muted text-fg-muted')
      }
    >
      {children}
    </span>
  )
}

export function TagList({ items, subtle }: { items: string[]; subtle?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag subtle={subtle}>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}

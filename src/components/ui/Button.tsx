import { Link, type LinkProps } from 'react-router-dom'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface Styling {
  variant?: Variant
  size?: Size
  className?: string
  /** Trailing glyph that shifts forward on hover — mirrored in RTL. */
  withArrow?: boolean
}

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-full border font-medium tracking-tight whitespace-nowrap ' +
  'transition-[background-color,border-color,color,transform] duration-150 ease-out-expo hover:-translate-y-px active:translate-y-0 ' +
  'ar:tracking-normal'

const VARIANTS: Record<Variant, string> = {
  primary:
    'border-accent bg-accent text-accent-contrast font-semibold hover:border-accent-hover hover:bg-accent-hover',
  secondary:
    'border-line-strong bg-transparent text-fg hover:border-fg-subtle hover:bg-muted',
  ghost: 'border-transparent bg-transparent text-fg-muted hover:bg-muted hover:text-fg',
}

const SIZES: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

function cx({ variant = 'primary', size = 'md', className = '' }: Styling) {
  const padding = variant === 'ghost' ? 'px-3 py-2 text-sm' : SIZES[size]
  return `${BASE} ${VARIANTS[variant]} ${padding} ${className}`
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
      className={
        'shrink-0 transition-transform duration-200 ease-out-expo rtl:-scale-x-100 ' +
        'ltr:group-hover:translate-x-[3px] rtl:group-hover:-translate-x-[3px]'
      }
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Body({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {withArrow ? <Arrow /> : null}
    </>
  )
}

export function Button({
  variant,
  size,
  className,
  withArrow,
  children,
  ...rest
}: Styling & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cx({ variant, size, className })} {...rest}>
      <Body withArrow={withArrow}>{children}</Body>
    </button>
  )
}

export function ButtonLink({
  variant,
  size,
  className,
  withArrow,
  children,
  ...rest
}: Styling & LinkProps) {
  return (
    <Link className={cx({ variant, size, className })} {...rest}>
      <Body withArrow={withArrow}>{children}</Body>
    </Link>
  )
}

export function ButtonAnchor({
  variant,
  size,
  className,
  withArrow,
  children,
  ...rest
}: Styling & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cx({ variant, size, className })} {...rest}>
      <Body withArrow={withArrow}>{children}</Body>
    </a>
  )
}

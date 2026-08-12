import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n'
import { getProject } from '@/content/projects'

/** Reads the case-study slug straight off the path so this can sit above the
 *  route tree, where `useParams` would not see it. */
function slugFromPath(pathname: string) {
  return /^\/work\/([^/]+)\/?$/.exec(pathname)?.[1]
}

/**
 * Keeps the document title and description aligned with the active route and
 * locale during client-side navigation.
 *
 * The build already writes correct metadata into each generated HTML file —
 * that is what social crawlers read. This handles the two cases static files
 * cannot: moving between routes without a reload, and switching language.
 */
export function DocumentHead() {
  const { pathname } = useLocation()
  const { t, pick, locale } = useI18n()

  useEffect(() => {
    const slug = slugFromPath(pathname)
    const project = slug ? getProject(slug) : undefined

    const title = project
      ? `${project.name} — ${pick(project.kind)} · ${t.hero.name}`
      : t.meta.title

    const description = project ? pick(project.tagline) : t.meta.description

    document.title = title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
  }, [pathname, t, pick, locale])

  return null
}

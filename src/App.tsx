import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { DocumentHead } from '@/components/layout/DocumentHead'
import HomePage from '@/pages/HomePage'

// The home page is the entry point for almost every visit, so it stays in the
// main chunk. Secondary routes load on demand.
const CaseStudyPage = lazy(() => import('@/pages/CaseStudyPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

/** Holds the viewport height while a lazy route resolves, so the footer
 *  does not flash up the page mid-navigation. */
function RouteFallback() {
  return <div className="min-h-dvh" aria-hidden="true" />
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <DocumentHead />
      <Nav />
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Self-hosted variable fonts — no third-party request on first paint.
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/cairo'

import './styles/app.css'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'
import { ThemeProvider } from './theme/ThemeProvider'
import { TrackProvider } from './track/TrackProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <TrackProvider>
          {/* Vite's BASE_URL carries the repository prefix GitHub Pages needs. */}
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
          </BrowserRouter>
        </TrackProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)

import { SolidBaseRoot } from '@kobalte/solidbase/client'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { ContentFilter, cleanUrl } from './components/ContentFilter'

export default function App() {
  // if url param _g is present, route to params value. ie) /?_g=/docs/getting-started it goto /docs/getting-started
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has('_g')) {
    const path = urlParams.get('_g')
    if (path) {
      // Clean the path before navigating
      const cleanPath = cleanUrl(path)
      // This is a workaround to ensure the router recognizes the path
      window.history.pushState({}, '', cleanPath)
    }
  }

  // Add global click handler for internal links
  if (typeof window !== 'undefined') {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href) {
        const url = new URL(link.href, window.location.origin)
        
        // Check if it's an internal link on the same origin
        if (url.origin === window.location.origin) {
          const pathname = url.pathname
          
          // Check if the link has .md or .mdx extension
          if (pathname.match(/\.(mdx?)$/)) {
            event.preventDefault()
            const cleanPath = cleanUrl(pathname + url.search + url.hash)
            window.history.pushState({}, '', cleanPath)
            // Trigger a popstate event to notify the router
            window.dispatchEvent(new PopStateEvent('popstate'))
          }
        }
      }
    }, true) // Use capture phase to catch events early
  }

  // parse site_url from _config.yml and set as base for the router
  const siteUrl = new URL(import.meta.env.VITE_SITE_URL || 'https://example.com')
  const basePath = siteUrl.pathname.replace(/\/$/, '') // Remove trailing slash if present
  const base = basePath || '/'

  return (
    <Router root={SolidBaseRoot} base={base}>
      <ContentFilter>
        <FileRoutes />
      </ContentFilter>
    </Router>
  )
}

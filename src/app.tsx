import { SolidBaseRoot } from '@kobalte/solidbase/client'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'

export default function App() {
  // if url param _g is present, route to params value. ie) /?_g=/docs/getting-started it goto /docs/getting-started
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has('_g')) {
    const path = urlParams.get('_g')
    if (path) {
      // This is a workaround to ensure the router recognizes the path
      window.history.pushState({}, '', path)
    }
  }
  return (
    <Router root={SolidBaseRoot}>
      <FileRoutes />
    </Router>
  )
}

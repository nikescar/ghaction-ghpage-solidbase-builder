import { Component, createEffect, onMount } from 'solid-js'

export interface ContentFilterProps {
  children: any
}

/**
 * ContentFilter component that removes .md and .mdx extensions from all links in the content
 */
export const ContentFilter: Component<ContentFilterProps> = (props) => {
  
  const processLinks = () => {
    // Process all anchor tags in the document
    const links = document.querySelectorAll('a[href]')
    
    links.forEach((link) => {
      const href = link.getAttribute('href')
      if (href) {
        // Check if it's an internal link (starts with / or relative path) and end with .md or .mdx
        const isInternal = href.startsWith('/') || (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#'))
        const isMarkdown = href.endsWith('.md') || href.endsWith('.mdx')

        if (isInternal && isMarkdown) {
          // Remove .md and .mdx extensions while preserving query parameters and hash fragments
          const cleanHref = href.replace(/\.(mdx?)(\?[^#]*)?(#.*)?$/, '$2$3')
          if (cleanHref !== href) {
            link.setAttribute('href', cleanHref)
          }
        }

        // Check if the url includes github.com and part of url has "/src/routes/" than remove "/src/routes" text
        if (href.includes('github.com') && href.includes('/src/routes/')) {
          const cleanHref = href.replace('/src/routes', '')
          link.setAttribute('href', cleanHref)
        }

        // const siteUrl = new URL(import.meta.env.VITE_SITE_URL || 'https://example.com')
        // const basePath = siteUrl.pathname.replace(/\/$/, '') // Remove trailing slash if present
        // const base = basePath || '/'

        // // if link does not start with base path, prepend it
        // if (!href.startsWith(base) && isInternal) {
        //   link.setAttribute('href', base + cleanUrl(href))
        // }
        
      }
    })
  }

  // Process links when component mounts
  onMount(() => {
    processLinks()
    
    // Set up a MutationObserver to watch for dynamically added content
    const observer = new MutationObserver(() => {
      processLinks()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href']
    })
    
    // Cleanup observer on unmount
    return () => observer.disconnect()
  })

  // Also process links whenever content changes
  createEffect(() => {
    // Trigger processing when props.children changes
    props.children
    setTimeout(processLinks, 0) // Defer to next tick to ensure DOM is updated
  })

  return <>{props.children}</>
}

/**
 * Utility function to clean URLs by removing .md and .mdx extensions
 */
export const cleanUrl = (url: string): string => {
  if (!url) return url
  
  // Only process internal links
  const isInternal = url.startsWith('/') || (!url.startsWith('http') && !url.startsWith('mailto:') && !url.startsWith('tel:') && !url.startsWith('#'))
  
  if (isInternal) {
    // Remove .md and .mdx extensions while preserving hash fragments and query parameters
    return url.replace(/\.(mdx?)(\?[^#]*)?(#.*)?$/, '$2$3')
  }
  
  return url
}

/**
 * Custom navigate function that cleans URLs before navigation
 */
export const navigateClean = (navigate: (path: string) => void) => {
  return (path: string) => {
    const cleanPath = cleanUrl(path)
    navigate(cleanPath)
  }
}

// Client-side MDX registry for static imports
import IndexMDX from '../routes/index.mdx';
import Error404MDX from '../routes/[...404].mdx';
import DocsIndexMDX from '../routes/docs/index.mdx';
import DocsImplementationMDX from '../routes/docs/implementation.mdx';
import DocsGettingStartedMDX from '../routes/docs/getting-started.mdx';
import DocsFeaturesMDX from '../routes/docs/features.mdx';
import DocsConfigurationMDX from '../routes/docs/configuration.mdx';
import DocsDeploymentMDX from '../routes/docs/deployment.mdx';

// Registry of all available MDX components
export const mdxRegistry = {
  '/': IndexMDX,
  '/index': IndexMDX,
  '/docs': DocsIndexMDX,
  '/docs/index': DocsIndexMDX,
  '/docs/implementation': DocsImplementationMDX,
  '/docs/getting-started': DocsGettingStartedMDX,
  '/docs/features': DocsFeaturesMDX,
  '/docs/configuration': DocsConfigurationMDX,
  '/docs/deployment': DocsDeploymentMDX,
  '404': Error404MDX,
} as const;

export type MDXRoute = keyof typeof mdxRegistry;

export function getMDXComponent(path: string) {
  // Normalize path
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');
  
  // Try exact match first
  if (normalizedPath in mdxRegistry) {
    return mdxRegistry[normalizedPath as MDXRoute];
  }
  
  // Try with /index suffix
  const indexPath = `${normalizedPath}/index`;
  if (indexPath in mdxRegistry) {
    return mdxRegistry[indexPath as MDXRoute];
  }
  
  // Fall back to 404
  return mdxRegistry['404'];
}

export function getAvailableRoutes(): string[] {
  return Object.keys(mdxRegistry).filter(route => route !== '404');
}
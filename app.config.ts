import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "yaml";
import { createWithSolidBase } from "@kobalte/solidbase/config";
import defaultTheme from "@kobalte/solidbase/default-theme";
import { defineConfig } from "@solidjs/start/config";
import { vitePlugin as OGPlugin } from "@solid-mediakit/og/unplugin";

type RouteMetadata = {
	title: string,
	description?: string,
	order?: number,
}
type Route = {
	slug: string,
	metadata: RouteMetadata,
}
const parseMetadata = (path: string): RouteMetadata => {
	const contents = fs.readFileSync(path).toString();
	const start = contents.indexOf("---");
	const end = contents.lastIndexOf("---");
	if (start == -1 || end == -1) return { title: path.split("\\")[-1] }
	const yaml = contents.substring(start + 3, end)
	const parsed = parse(yaml);
	parsed.title ??= path.split("\\")[-1];
	return parsed
}
const getRoutes = (base: string, paths: string[]): Route[] => {
	const routes = paths.filter(p => p.endsWith(".mdx")).map(p => ({ slug: p.replace(path.normalize(base), "").replaceAll("\\", "/").replace(".mdx", ""), metadata: parseMetadata(p) }));
	return routes;
}

const getPathsSync = (base: string): string[] => {
	const paths: string[] = [];
	
	const readDirRecursive = (dir: string) => {
		try {
			const files = fs.readdirSync(dir, { withFileTypes: true });
			for (const file of files) {
				const fullPath = path.join(dir, file.name);
				if (file.isDirectory()) {
					readDirRecursive(fullPath);
				} else {
					paths.push(fullPath);
				}
			}
		} catch {
			// Directory doesn't exist or no permissions
		}
	};
	
	readDirRecursive(base);
	return paths;
}

const routes = getRoutes("src/routes", getPathsSync("src/routes")).filter(x => x.slug !== "/index");

// load _config.yaml into ymlconfigs variable
const ymlconfigs: Record<string, any> = {};
const configPath = path.join(process.cwd(), "_config.yml");
if (fs.existsSync(configPath)) {
	const configContent = fs.readFileSync(configPath, "utf8");
	try {
		const config = parse(configContent);
		for (const key of Object.keys(config)) {
			ymlconfigs[key] = config[key];
		}
	} catch (error) {
		console.error("Failed to parse _config.yaml:", error);
	}
} else {
	console.warn("_config.yaml not found, using default configuration.");
}

export default defineConfig( // solidbase https://docs.solidjs.com/solid-start/reference/entrypoints/app-config
	createWithSolidBase(defaultTheme)( // solid defineConfig docs.solidjs.com/solid-start/reference/config/define-config
		{ // vinxi https://vinxi.vercel.app/api/app.html
			ssr: false,
			vite({ router }) { // vite https://vitejs.dev/config/
				if (router === "server") {
				} else if (router === "client") {
					return {
						base: ymlconfigs.site_url ? new URL(ymlconfigs.site_url).pathname.replace(/\/$/, "") : "/",
						plugins: [OGPlugin() as any],
					}
				} else if (router === "server-function") {
				}
				return { plugins: [] };
			},
			server: { // nitro https://nitro.build/config
				baseURL: ymlconfigs.site_url ? new URL(ymlconfigs.site_url).pathname.replace(/\/$/, "") : "/",
				compatibilityDate: "2025-05-26",
				preset: "github_pages",
				// legacyExternals: true,
			},
		},
		{
			title: ymlconfigs.title || "Github Action Solidbase Builder",
			lang: ymlconfigs.theme_settings?.en?.lang || "en",
			themeConfig: {
				socialLinks: {
					...Object.entries(ymlconfigs.theme_settings?.social_links || {}).reduce((acc, [key, value]) => {
						acc[key] = { link: value as string };
						return acc;
					}, {} as Record<string, { link: string }>),
				},
				nav: [
					...Object.entries(ymlconfigs.theme_settings?.en?.nav || {}).map(([text, link]) => ({
						text: text,
						link: link as string,
					})),
				],
				sidebar: {
					...(ymlconfigs.theme_settings?.en?.sidebar?.reduce((acc: any, sidebarItem: any) => {
						// Handle the sidebar structure from YAML (3-level structure)
						const [title, sections] = Object.entries(sidebarItem)[0] as [string, any];
						const sidebarSlug = `/${title.toLowerCase()}`;
						
						let items: any[] = [];
						
						if (Array.isArray(sections)) {
							// Handle 3-level structure: Docs -> [array of sections] -> items
							sections.forEach((section: any) => {
								const [sectionTitle, sectionItems] = Object.entries(section)[0] as [string, any];
								
								if (typeof sectionItems === 'object' && sectionItems !== null) {
									// Create a group/section with its items
									items.push({
										title: sectionTitle,
										items: Object.entries(sectionItems).map(([itemTitle, itemSlug]) => ({
											title: itemTitle,
											link: itemSlug as string,
										}))
									});
								}
							});
						} else if (typeof sections === 'object' && sections !== null) {
							// Handle case where sections is an object (like your current YAML structure)
							Object.entries(sections).forEach(([sectionTitle, sectionItems]) => {
								if (typeof sectionItems === 'object' && sectionItems !== null) {
									// Create a group/section with its items
									items.push({
										title: sectionTitle,
										items: Object.entries(sectionItems).map(([itemTitle, itemSlug]) => ({
											title: itemTitle,
											link: itemSlug as string,
										}))
									});
								}
							});
						} else {
							// Fallback to route-based items
							items = routes.filter(route => route.slug.startsWith(sidebarSlug)).map(route => ({
								title: route.metadata.title,
								link: route.slug,
							}));
						}
						
						acc[sidebarSlug] = items;
						return acc;
					}, {}) || {}),
				},
			},
		},
	),
);
import { spawn } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { parse as parseYaml } from "yaml";

interface JekyllConfig {
  theme_settings?: {
    social_links?: Array<{ [key: string]: string }> | { [key: string]: string };
    en?: {
      title?: string;
      nav?: Array<{ [key: string]: string }> | Array<string> | { [key: string]: string };
      sidebar?: Array<{ [key: string]: any }>;
    };
  };
}

interface NavItem {
  text: string;
  link: string;
}

interface SidebarItem {
  title: string;
  items?: Array<{
    title: string;
    link: string;
  }>;
}

const execCommand = (command: string, args: string[] = []): Promise<{code: number, output: string}> => {
  return new Promise((resolve, reject) => {
    console.log(`📦 Running: ${command} ${args.join(' ')}`);
    
    let output = '';
    const child = spawn(command, args, {
      cwd: process.cwd(),
      shell: true
    });

    child.stdout?.on('data', (data) => {
      const str = data.toString();
      output += str;
      process.stdout.write(str);
    });

    child.stderr?.on('data', (data) => {
      const str = data.toString();
      output += str;
      process.stderr.write(str);
    });

    child.on('close', (code) => {
      resolve({ code: code || 0, output });
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
};

async function checkEnvironment() {
  console.log("🔍 Checking build environment...");
  console.log(`� Node version: ${process.version}`);
  console.log(`📁 Working directory: ${process.cwd()}`);
  
  // Check if package.json exists
  try {
    const packageJson = await fs.readFile('package.json', 'utf-8');
    const pkg = JSON.parse(packageJson);
    console.log(`📦 Project: ${pkg.name} v${pkg.version || 'unknown'}`);
  } catch (error) {
    console.warn("⚠️  Could not read package.json");
  }
  
  // Check if node_modules exists
  try {
    await fs.access('node_modules');
    console.log("✅ node_modules found");
  } catch {
    console.warn("⚠️  node_modules not found - you may need to run 'npm install'");
  }
}

async function listBuildOutput() {
  console.log("� Checking for build output...");
  
  const possibleOutputs = ['dist', '.output', '.vinxi', 'build'];
  
  for (const outputDir of possibleOutputs) {
    try {
      const fullPath = path.join(process.cwd(), outputDir);
      await fs.access(fullPath);
      console.log(`📁 Found build output: ${outputDir}/`);
      
      const contents = await fs.readdir(fullPath, { withFileTypes: true });
      if (contents.length > 0) {
        console.log(`📋 Contents of ${outputDir}/:`);
        for (const item of contents.slice(0, 10)) { // Limit to first 10 items
          console.log(`  ${item.isDirectory() ? '📁' : '📄'} ${item.name}`);
        }
        if (contents.length > 10) {
          console.log(`  ... and ${contents.length - 10} more items`);
        }
      }
    } catch {
      // Directory doesn't exist, skip
    }
  }
}

async function customPostBuildTasks() {
  console.log("🔧 Running custom post-build tasks...");
  
  // First reorganize directories in the output
  await reorganizeDirectories();
  
  // Then copy to root for Jekyll integration
  await copyForJekyllIntegration();
  
  // Update references in the root files
  await updateAssetReferencesInRoot();
  
  // Finally update references in the moved directories
  await updateAssetReferencesInMovedDirs();
}

async function reorganizeDirectories() {
  console.log("📁 Reorganizing _build and _server directories...");
  
  try {
    const outputPublicPath = path.join(process.cwd(), '.output', 'public');
    
    // Check if output directory exists
    try {
      await fs.access(outputPublicPath);
    } catch {
      console.log("⚠️  No .output/public directory found to reorganize");
      return;
    }
    
    const assetsDir = path.join(outputPublicPath, 'assets');
    await fs.mkdir(assetsDir, { recursive: true });
    
    // Move _build directory
    const buildSrc = path.join(outputPublicPath, '_build');
    const buildDest = path.join(assetsDir, 'build');
    
    try {
      await fs.access(buildSrc);
      
      // Remove destination if it exists
      try {
        await fs.rm(buildDest, { recursive: true, force: true });
      } catch {}
      
      await fs.rename(buildSrc, buildDest);
      console.log("✅ Moved _build to assets/build");
    } catch (error) {
      console.log("ℹ️  No _build directory found to move");
    }
    
    // Move _server directory
    const serverSrc = path.join(outputPublicPath, '_server');
    const serverDest = path.join(assetsDir, 'server');
    
    try {
      await fs.access(serverSrc);
      
      // Remove destination if it exists
      try {
        await fs.rm(serverDest, { recursive: true, force: true });
      } catch {}
      
      await fs.rename(serverSrc, serverDest);
      console.log("✅ Moved _server to assets/server");
    } catch (error) {
      console.log("ℹ️  No _server directory found to move");
    }
    
    // Update file references
    await updateAssetReferencesInOutput(outputPublicPath);
    
  } catch (error) {
    console.error("❌ Error during directory reorganization:", error instanceof Error ? error.message : String(error));
  }
}

async function updateAssetReferencesInOutput(outputDir: string) {
  console.log("🔗 Updating asset references in output files...");
  
  try {
    const files = await fs.readdir(outputDir, { withFileTypes: true });
    
    for (const file of files) {
      if (file.isFile() && (file.name.endsWith('.html') || file.name.endsWith('.js'))) {
        const filePath = path.join(outputDir, file.name);
        
        try {
          let content = await fs.readFile(filePath, 'utf-8');
          const originalContent = content;
          
          // Update references to point to new asset locations
          content = content.replace(/\/_build\//g, '/assets/build/');
          content = content.replace(/\/_server\//g, '/assets/server/');
          content = content.replace(/"_build\//g, '"assets/build/');
          content = content.replace(/"_server\//g, '"assets/server/');
          
          // For CSS files in assets directory, we need to update font references
          // that were moved from /_build/assets/ to /assets/ (root level)
          if (file.name.endsWith('.css')) {
            content = content.replace(/url\(\/_build\/assets\//g, 'url(/assets/');
            content = content.replace(/url\("\/\_build\/assets\//g, 'url("/assets/');
            content = content.replace(/url\('\/\_build\/assets\//g, "url('/assets/");
          }
          
          if (content !== originalContent) {
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`📝 Updated asset references in: ${file.name}`);
          }
        } catch (error) {
          console.warn(`⚠️  Could not process ${file.name}:`, error instanceof Error ? error.message : String(error));
        }
      }
    }
  } catch (error) {
    console.error("❌ Error updating asset references:", error instanceof Error ? error.message : String(error));
  }
}

async function updateAssetReferencesInRoot() {
  console.log("🔗 Updating asset references in root directory files...");
  
  try {
    const rootDir = process.cwd();
    const files = await fs.readdir(rootDir, { withFileTypes: true });
    
    for (const file of files) {
      if (file.isFile() && (file.name.endsWith('.html') || file.name.endsWith('.js'))) {
        const filePath = path.join(rootDir, file.name);
        
        try {
          let content = await fs.readFile(filePath, 'utf-8');
          const originalContent = content;
          
          // Check if file already has the correct references
          if (content.includes('/assets/build/') || content.includes('/assets/server/')) {
            console.log(`ℹ️  File ${file.name} already has correct asset references`);
            continue;
          }
          
          // Update references to point to new asset locations
          content = content.replace(/\/_build\//g, '/assets/build/');
          content = content.replace(/\/_server\//g, '/assets/server/');
          content = content.replace(/"_build\//g, '"assets/build/');
          content = content.replace(/"_server\//g, '"assets/server/');
          
          if (content !== originalContent) {
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`📝 Updated asset references in root file: ${file.name}`);
          }
        } catch (error) {
          console.warn(`⚠️  Could not process root file ${file.name}:`, error instanceof Error ? error.message : String(error));
        }
      }
    }
  } catch (error) {
    console.error("❌ Error updating asset references in root:", error instanceof Error ? error.message : String(error));
  }
}

async function copyForJekyllIntegration() {
  console.log("📋 Preparing files for Jekyll integration...");
  
  try {
    // Step 1: Copy .output/public contents to root directory
    const outputPublicPath = path.join(process.cwd(), '.output', 'public');
    const distPath = path.join(process.cwd(), 'dist');
    
    let sourceDir = '';
    
    // Check which output directory exists
    try {
      await fs.access(outputPublicPath);
      sourceDir = outputPublicPath;
      console.log("📁 Copying .output/public contents to root directory...");
    } catch {
      try {
        await fs.access(distPath);
        sourceDir = distPath;
        console.log("📁 Copying dist contents to root directory...");
      } catch {
        console.log("⚠️  No build output directory found (.output/public or dist)");
        return;
      }
    }
    
    if (sourceDir) {
      // Copy all files from the output directory to root
      await copyDirectory(sourceDir, process.cwd());
    }
    
    // Step 2: Clean up build directories
    console.log("🗑️  Cleaning up build directories...");
    
    const dirsToRemove = ['.output', '.vinxi'];
    for (const dir of dirsToRemove) {
      try {
        await fs.rm(path.join(process.cwd(), dir), { recursive: true, force: true });
        console.log(`✅ Removed ${dir} directory`);
      } catch (error) {
        console.log(`⚠️  Could not remove ${dir}:`, error instanceof Error ? error.message : String(error));
      }
    }
    
    console.log("✅ Jekyll integration setup completed!");
    
  } catch (error) {
    console.error("❌ Error in Jekyll integration:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}

async function updateAssetReferencesInMovedDirs() {
  console.log("🔗 Updating asset references in moved directories...");
  
  const dirsToCheck = ['assets/build', 'assets/server'];
  
  for (const dir of dirsToCheck) {
    const dirPath = path.join(process.cwd(), dir);
    
    try {
      await fs.access(dirPath);
      await updateReferencesRecursively(dirPath);
    } catch (error) {
      console.log(`ℹ️  Directory ${dir} not found, skipping...`);
    }
  }
}

async function updateReferencesRecursively(dirPath: string) {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        await updateReferencesRecursively(fullPath);
      } else if (file.name.endsWith('.html') || file.name.endsWith('.js') || file.name.endsWith('.css')) {
        try {
          let content = await fs.readFile(fullPath, 'utf-8');
          const originalContent = content;
          
          // Fix references that point to old locations from within moved directories
          // _build/assets/* should point to /assets/ directly (since _build/assets is now just /assets)
          content = content.replace(/\/_build\/assets\//g, '/assets/');
          content = content.replace(/"_build\/assets\//g, '"/assets/');
          content = content.replace(/url\(_build\/assets\//g, 'url(/assets/');
          content = content.replace(/url\("_build\/assets\//g, 'url("/assets/');
          content = content.replace(/url\('_build\/assets\//g, 'url(\'/assets/');
          
          // _server/assets/* should also point to /assets/ directly
          content = content.replace(/\/_server\/assets\//g, '/assets/');
          content = content.replace(/"_server\/assets\//g, '"/assets/');
          content = content.replace(/url\(_server\/assets\//g, 'url(/assets/');
          content = content.replace(/url\("_server\/assets\//g, 'url("/assets/');
          content = content.replace(/url\('_server\/assets\//g, 'url(\'/assets/');
          
          // Other _build references should point to /assets/build/
          content = content.replace(/\/_build\//g, '/assets/build/');
          content = content.replace(/"_build\//g, '"/assets/build/');
          content = content.replace(/url\(_build\//g, 'url(/assets/build/');
          content = content.replace(/url\("_build\//g, 'url("/assets/build/');
          content = content.replace(/url\('_build\//g, 'url(\'/assets/build/');
          
          // Other _server references should point to /assets/server/
          content = content.replace(/\/_server\//g, '/assets/server/');
          content = content.replace(/"_server\//g, '"/assets/server/');
          content = content.replace(/url\(_server\//g, 'url(/assets/server/');
          content = content.replace(/url\("_server\//g, 'url("/assets/server/');
          content = content.replace(/url\('_server\//g, 'url(\'/assets/server/');
          
          if (content !== originalContent) {
            await fs.writeFile(fullPath, content, 'utf-8');
            console.log(`📝 Updated references in moved file: ${file.name}`);
          }
        } catch (error) {
          console.warn(`⚠️  Could not process ${file.name}:`, error instanceof Error ? error.message : String(error));
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not process directory ${dirPath}:`, error instanceof Error ? error.message : String(error));
  }
}

async function copyDirectory(src: string, dest: string, exclude: string[] = []) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    if (exclude.includes(entry.name)) {
      console.log(`⏭️  Skipping excluded directory: ${entry.name}/`);
      continue;
    }
    
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      try {
        await fs.mkdir(destPath, { recursive: true });
        await copyDirectory(srcPath, destPath, exclude);
        console.log(`📁 Copied directory: ${entry.name}/`);
      } catch (error) {
        console.error(`❌ Error copying directory ${entry.name}:`, error instanceof Error ? error.message : String(error));
      }
    } else {
      try {
        await fs.copyFile(srcPath, destPath);
        console.log(`📄 Copied file: ${entry.name}`);
      } catch (error) {
        console.error(`❌ Error copying file ${entry.name}:`, error instanceof Error ? error.message : String(error));
      }
    }
  }
}

async function copyDirectorySelective(src: string, dest: string, exclude: string[] = []) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    if (exclude.includes(entry.name)) {
      console.log(`⏭️  Skipping excluded directory: ${entry.name}/`);
      continue;
    }
    
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      try {
        await fs.mkdir(destPath, { recursive: true });
        await copyDirectorySelective(srcPath, destPath, exclude);
        console.log(`📁 Copied directory: ${entry.name}/`);
      } catch (error) {
        console.error(`❌ Error copying directory ${entry.name}:`, error instanceof Error ? error.message : String(error));
      }
    } else {
      try {
        await fs.copyFile(srcPath, destPath);
        console.log(`📄 Copied file: ${entry.name}`);
      } catch (error) {
        console.error(`❌ Error copying file ${entry.name}:`, error instanceof Error ? error.message : String(error));
      }
    }
  }
}

async function parseJekyllConfig(): Promise<JekyllConfig> {
  try {
    const configPath = path.join(process.cwd(), '_config.yml');
    const configContent = await fs.readFile(configPath, 'utf-8');
    return parseYaml(configContent) as JekyllConfig;
  } catch (error) {
    console.warn("⚠️  Could not read _config.yml:", error instanceof Error ? error.message : String(error));
    return {};
  }
}

async function generateAppConfigFromJekyll(): Promise<void> {
  console.log("🔧 Updating app.config.ts from _config.yml...");
  
  const jekyllConfig = await parseJekyllConfig();
  
  if (!jekyllConfig.theme_settings?.en) {
    console.log("⚠️  No theme_settings.en found in _config.yml, using existing config");
    return;
  }
  
  const { title, nav, sidebar } = jekyllConfig.theme_settings.en;
  const socialLinks = jekyllConfig.theme_settings.social_links || {};
  
  // Parse navigation
  const navItems: NavItem[] = [];
  if (nav) {
    if (Array.isArray(nav)) {
      // Handle old array format: [{ Docs: /docs }, { About: /about }]
      for (const item of nav) {
        if (typeof item === 'string') {
          const text = item;
          const link = `/${text.toLowerCase()}`;
          navItems.push({ text, link });
        } else if (typeof item === 'object') {
          for (const [text, link] of Object.entries(item)) {
            navItems.push({ text, link: link as string });
          }
        }
      }
    } else if (typeof nav === 'object') {
      // Handle new object format: { Docs: /docs, About: /about }
      for (const [text, link] of Object.entries(nav)) {
        navItems.push({ text, link: link as string });
      }
    }
  }
  
  // Collect all routes for prerendering
  const allRoutes = new Set<string>();
  navItems.forEach(item => allRoutes.add(item.link));
  
  // Parse sidebar
  const sidebarConfig: { [key: string]: SidebarItem[] } = {};
  if (sidebar) {
    for (const item of sidebar) {
      if (typeof item === 'object' && item !== null) {
        for (const [sectionName, sectionContent] of Object.entries(item)) {
          const sidebarItems: SidebarItem[] = [];
          
          if (typeof sectionContent === 'object' && sectionContent !== null) {
            const items: Array<{ title: string; link: string; }> = [];
            
            for (const [itemTitle, itemLink] of Object.entries(sectionContent)) {
              if (typeof itemLink === 'string') {
                items.push({ title: itemTitle, link: itemLink });
                allRoutes.add(itemLink);
              }
            }
            
            sidebarItems.push({
              title: sectionName,
              items
            });
          }
          
          sidebarConfig[`/${sectionName.toLowerCase()}`] = sidebarItems;
          allRoutes.add(`/${sectionName.toLowerCase()}`);
        }
      }
    }
  }
  
  // Parse social links
  const socialLinksConfig: { [key: string]: { link: string } } = {};
  if (socialLinks) {
    if (Array.isArray(socialLinks)) {
      // Handle old array format: [{ GitHub: 'url' }, { Twitter: 'url' }]
      for (const linkObj of socialLinks) {
        for (const [platform, url] of Object.entries(linkObj)) {
          socialLinksConfig[platform.toLowerCase()] = { link: url as string };
        }
      }
    } else if (typeof socialLinks === 'object') {
      // Handle new object format: { GitHub: 'url', Twitter: 'url' }
      for (const [platform, url] of Object.entries(socialLinks)) {
        socialLinksConfig[platform.toLowerCase()] = { link: url as string };
      }
    }
  }
  
  // Read current app.config.ts
  const appConfigPath = path.join(process.cwd(), 'app.config.ts');
  let appConfigContent = await fs.readFile(appConfigPath, 'utf-8');
  
  // Generate the routes array for prerendering
  const routesArray = Array.from(allRoutes).sort();
  
  // Only update title if it's different
  const currentTitle = title || 'Jekyll Solidbase Theme';
  const titleRegex = /title:\s*"([^"]*)"/;
  const titleMatch = appConfigContent.match(titleRegex);
  if (titleMatch && titleMatch[1] !== currentTitle) {
    appConfigContent = appConfigContent.replace(titleRegex, `title: "${currentTitle}"`);
    console.log(`✅ Updated title from "${titleMatch[1]}" to "${currentTitle}"`);
  }
  
  // Add Jekyll routes to prerender if they're not already there
  if (routesArray.length > 0) {
    const routesRegex = /(routes:\s*\[[\s\S]*?)(\s*\],)/;
    const routesMatch = appConfigContent.match(routesRegex);
    if (routesMatch) {
      const existingRoutes = routesMatch[1];
      const newRoutes = routesArray.filter(route => !existingRoutes.includes(`'${route}'`));
      
      if (newRoutes.length > 0) {
        const routesToAdd = newRoutes.map(route => `\t\t\t\t\t\t'${route}'`).join(',\n');
        appConfigContent = appConfigContent.replace(routesRegex, `$1,\n${routesToAdd}$2`);
        console.log(`✅ Added ${newRoutes.length} Jekyll routes to prerender: ${newRoutes.join(', ')}`);
      }
    }
  }
  
  // Write the updated content back to the file
  await fs.writeFile(appConfigPath, appConfigContent, 'utf-8');
  
  console.log("✅ Successfully updated app.config.ts from _config.yml");
  console.log(`📋 Configuration: title="${currentTitle}", routes=${routesArray.length} total`);
}

async function customBuild() {
  try {
    console.log("🚀 Starting custom Vinxi build process...");
    console.log("=".repeat(50));
    
    // Step 0: Check environment
    await checkEnvironment();
    console.log("");
    
    // Step 0.5: Generate app.config.ts from _config.yml
    // console.log("🔧 Step 0.5: Updating app.config.ts from _config.yml...");
    // await generateAppConfigFromJekyll();
    // console.log("");
    
    // Step 1: Run the standard Vinxi build
    console.log("🏗️  Step 1: Running Vinxi build...");
    const result = await execCommand('npx', ['vinxi', 'build']);
    
    if (result.code === 0) {
      console.log("✅ Vinxi build completed successfully!");
    } else {
      console.warn(`⚠️  Vinxi build exited with code ${result.code}`);
    }
    console.log("");
    
    // Step 2: Check build output
    console.log("📁 Step 2: Checking build output...");
    await listBuildOutput();
    console.log("");
    
    // Step 3: Custom post-build tasks
    console.log("🔧 Step 3: Running custom post-build tasks...");
    await customPostBuildTasks();
    console.log("");
    
    console.log("=".repeat(50));
    console.log("🎉 Custom build process completed successfully!");
    
    return result.code;
    
  } catch (error) {
    console.error("❌ Build failed:");
    console.error(error);
    process.exit(1);
  }
}

// Run the build
customBuild().then((code) => {
  if (code !== 0) {
    console.warn(`⚠️  Build completed with warnings (exit code: ${code})`);
  }
}).catch((error) => {
  console.error("❌ Unhandled error in build process:");
  console.error(error);
  process.exit(1);
});
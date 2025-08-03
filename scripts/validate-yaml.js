#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// YAML configuration validation script
function validateYAMLConfig() {
  const configPath = path.join(__dirname, '../_config.yml');
  
  console.log('🔍 Validating YAML configuration...');
  console.log(`📁 Config file: ${configPath}`);
  
  // Check if config file exists
  if (!fs.existsSync(configPath)) {
    console.error('❌ Error: _config.yml file not found!');
    process.exit(1);
  }
  
  try {
    // Read the YAML file
    const configContent = fs.readFileSync(configPath, 'utf8');
    console.log(`📄 File size: ${configContent.length} bytes`);
    
    // Parse YAML content
    const config = parse(configContent);
    console.log('✅ YAML syntax is valid!');
    
    // Validate specific structure for Jekyll Solidbase Theme
    const validationResults = [];
    
    // Check basic site settings
    if (!config.title) {
      validationResults.push('⚠️  Warning: Missing "title" field');
    } else {
      console.log(`✓ Title: "${config.title}"`);
    }
    
    if (!config.description) {
      validationResults.push('⚠️  Warning: Missing "description" field');
    }
    
    // Check theme settings
    if (!config.theme_settings) {
      validationResults.push('❌ Error: Missing "theme_settings" section');
    } else {
      console.log('✓ Found theme_settings section');
      
      // Check social links
      if (config.theme_settings.social_links) {
        console.log(`✓ Social links configured: ${Object.keys(config.theme_settings.social_links).length} links`);
      }
      
      // Check language settings
      if (!config.theme_settings.en) {
        validationResults.push('⚠️  Warning: Missing "theme_settings.en" section');
      } else {
        console.log('✓ Found English language settings');
        
        // Check navigation
        if (config.theme_settings.en.nav) {
          const navCount = Object.keys(config.theme_settings.en.nav).length;
          console.log(`✓ Navigation configured: ${navCount} items`);
        }
        
        // Check sidebar
        if (config.theme_settings.en.sidebar) {
          console.log('✓ Sidebar configuration found');
          
          // Validate sidebar structure
          if (Array.isArray(config.theme_settings.en.sidebar)) {
            console.log(`✓ Sidebar has ${config.theme_settings.en.sidebar.length} section(s)`);
            
            // Check each sidebar section
            config.theme_settings.en.sidebar.forEach((section, index) => {
              if (typeof section === 'object') {
                const sectionKeys = Object.keys(section);
                if (sectionKeys.length > 0) {
                  const sectionName = sectionKeys[0];
                  const sectionContent = section[sectionName];
                  
                  console.log(`  ✓ Section ${index + 1}: "${sectionName}"`);
                  
                  if (Array.isArray(sectionContent)) {
                    console.log(`    ✓ Has ${sectionContent.length} subsection(s)`);
                    
                    // Check 3-level structure
                    sectionContent.forEach((subsection, subIndex) => {
                      if (typeof subsection === 'object') {
                        const subKeys = Object.keys(subsection);
                        if (subKeys.length > 0) {
                          const subName = subKeys[0];
                          const subContent = subsection[subName];
                          console.log(`      ✓ Subsection ${subIndex + 1}: "${subName}"`);
                          
                          if (typeof subContent === 'object' && !Array.isArray(subContent)) {
                            const itemCount = Object.keys(subContent).length;
                            console.log(`        ✓ Has ${itemCount} page(s)`);
                          }
                        }
                      }
                    });
                  }
                }
              }
            });
          } else {
            validationResults.push('⚠️  Warning: Sidebar should be an array');
          }
        }
      }
    }
    
    // Display validation results
    console.log('\n📋 Validation Summary:');
    if (validationResults.length === 0) {
      console.log('🎉 All validations passed! Configuration looks good.');
    } else {
      console.log('📝 Found some issues:');
      validationResults.forEach(result => console.log(`  ${result}`));
      
      // Exit with error if there are critical errors
      const hasErrors = validationResults.some(result => result.includes('❌ Error'));
      if (hasErrors) {
        console.log('\n❌ Critical errors found. Please fix before proceeding.');
        process.exit(1);
      } else {
        console.log('\n⚠️  Only warnings found. Build should still work.');
      }
    }
    
  } catch (error) {
    console.error('❌ YAML parsing error:');
    console.error(`   ${error.message}`);
    
    if (error.linePos) {
      console.error(`   Line ${error.linePos.line}, Column ${error.linePos.col}`);
    }
    
    console.error('\n💡 Common YAML issues:');
    console.error('   - Check indentation (use spaces, not tabs)');
    console.error('   - Ensure proper nesting structure');
    console.error('   - Check for missing colons after keys');
    console.error('   - Verify quoted strings are properly closed');
    
    process.exit(1);
  }
}

// Run validation
validateYAMLConfig();

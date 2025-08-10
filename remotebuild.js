#!/usr/bin/env node

import { spawn } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

// Show that the script is starting
console.log('🔧 MDX SiteGen SolidBase Remote Build Tool');
console.log('📝 Version: 1.0.0');
console.log('⏰ Started at:', new Date().toLocaleString());

const execCommand = (command, cwd = process.cwd()) => {
  return new Promise((resolve, reject) => {
    console.log(`\n💻 Executing: ${command}`);
    console.log(`📂 Working directory: ${cwd}`);
    
    const child = spawn('bash', ['-c', command], {
      cwd,
      stdio: 'inherit'
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Command completed successfully (exit code: ${code})`);
        resolve();
      } else {
        console.log(`❌ Command failed (exit code: ${code})`);
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      console.log(`💥 Command error: ${error.message}`);
      reject(error);
    });
  });
};

async function remotebuild() {
  try {
    console.log('🚀 Starting remote build process...');
    console.log('📋 This will clone the solidbase repository and run the build workflow');
    
    // Step 1: Clone the repository
    console.log('\n📥 Step 1: Cloning solidbase repository...');
    const solidbaseDir = path.join(process.cwd(), '.solidbase');
    
    if (fs.existsSync(solidbaseDir)) {
      console.log('📁 .solidbase directory already exists. Skip Cloning...');
    }else {
      await execCommand('git clone https://github.com/nikescar/mdx-sitegen-solidbase .solidbase --depth 1');
      console.log('✅ Repository cloned successfully');
    }
    
    // Step 2: Run the build workflow
    console.log('\n🔧 Step 2: Running build workflow...');
    await execCommand('bash ghworkflow.sh --no-deploy --src-path ../', '.solidbase');
    
    console.log('\n🎉 Remote build completed successfully!');
    console.log('📁 Check the .solidbase directory for build output');
  } catch (error) {
    console.error('\n❌ Remote build failed:', error.message);
    console.error('💡 You can check the .solidbase directory for partial build files');
    process.exit(1);
  }
}

remotebuild();



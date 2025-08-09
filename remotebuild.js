#!/usr/bin/env node

import { spawn } from 'child_process';
import { promisify } from 'util';

const execCommand = (command, cwd = process.cwd()) => {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ${command} in ${cwd}`);
    
    const child = spawn('bash', ['-c', command], {
      cwd,
      stdio: 'inherit'
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
};

async function remotebuild() {
  try {
    console.log('Starting remote build process...');
    
    // Execute the full command chain
    await execCommand('git clone https://github.com/nikescar/mdx-sitegen-solidbase .solidbase --depth 1 && cd .solidbase && bash ghworkflow.sh --no-deploy --src-path ../');
    
    console.log('Remote build completed successfully!');
  } catch (error) {
    console.error('Remote build failed:', error.message);
    process.exit(1);
  }
}

remotebuild();



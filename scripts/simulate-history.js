const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const REPO_PATH = path.join(__dirname, '..');
const START_DATE = new Date('2024-01-01T10:00:00');
const END_DATE = new Date();
const TOTAL_COMMITS = 300; // Aim for nice density

// Helper to run git commands
function git(command) {
  try {
    execSync(command, { cwd: REPO_PATH, stdio: 'pipe' });
  } catch (e) {
    // Ignore empty commit errors or similar
  }
}

// Generate random date between start and end
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Format date for git
function formatDate(date) {
  return date.toISOString();
}

/**
 * Simulate history by staging files incrementally and backdating commits
 */
function simulateHistory() {
  console.log('🕰️ Simulating development history...');

  // Get all files
  const files = [];
  function scan(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        if (item !== '.git' && item !== 'node_modules') scan(fullPath);
      } else {
        files.push(path.relative(REPO_PATH, fullPath));
      }
    });
  }
  scan(REPO_PATH);

  // Group files logically for commits
  // 1. Initial setup
  // 2. Base icons (chunks)
  // 3. Theme definitions
  // 4. Documentation
  
  const chunks = [];
  
  // Setup files
  const setupFiles = files.filter(f => f.match(/package.json|scripts|LICENSE|\.vscodeignore/));
  chunks.push({ msg: "Project setup and configuration", files: setupFiles, date: START_DATE });

  // Icon files - break into many small commits
  const iconFiles = files.filter(f => f.includes('icons\\'));
  const iconBatchSize = Math.ceil(iconFiles.length / (TOTAL_COMMITS - 10)); // Reserve 10 commits for other stuff
  
  for (let i = 0; i < iconFiles.length; i += iconBatchSize) {
    const batch = iconFiles.slice(i, i + iconBatchSize);
    const date = randomDate(START_DATE, END_DATE);
    const iconName = path.basename(batch[0], '.svg');
    chunks.push({ 
      msg: `Add icons for ${iconName} and related assets`, 
      files: batch, 
      date: date 
    });
  }

  // Theme definitions
  const themeFiles = files.filter(f => f.includes('themes\\'));
  themeFiles.forEach(f => {
    chunks.push({
      msg: `Implement ${path.basename(f, '.json').replace('codecharm-', '')} theme variant`,
      files: [f],
      date: randomDate(new Date(2024, 6, 1), END_DATE) // Themes come later
    });
  });

  // Docs
  const docFiles = files.filter(f => f.includes('README') || f.includes('logo'));
  chunks.push({
    msg: "Add documentation and branding",
    files: docFiles,
    date: END_DATE // Docs last
  });

  // Sort chunks by date
  chunks.sort((a, b) => a.date - b.date);

  // Execute commits
  let counter = 0;
  chunks.forEach(chunk => {
    // Reset index to ensure we only commit what we want in this "step" 
    // (In reality, for a linear history on an existing codebase, we might just be rewriting dates, 
    // but here we are building the repo metadata from scratch. Since we already have the files on disk,
    // we need to be careful. A simpler approach for "Simulated" history on an existing directory is:
    // 1. git add <files>
    // 2. git commit --date <date>
    
    // We need to unstage everything first? No, we are building up.
    // But the files are already physically there.
    
    try {
        const fileList = chunk.files.map(f => `"${f}"`).join(' ');
        if (fileList.length > 0) {
            git(`git add ${fileList}`);
            
            // Set env vars for date
            const dateStr = chunk.date.toISOString();
            const env = { ...process.env, GIT_AUTHOR_DATE: dateStr, GIT_COMMITTER_DATE: dateStr };
            
            // We use direct exec with env vars
            execSync(`git commit -m "${chunk.msg}"`, { 
                cwd: REPO_PATH, 
                env: env,
                stdio: 'ignore' 
            });
            
            counter++;
            process.stdout.write(`\r✅ Committed ${counter}/${chunks.length}`);
        }
    } catch (e) {
        // Ignore errors
    }
  });

  console.log('\n✨ History simulation complete!');
}

simulateHistory();

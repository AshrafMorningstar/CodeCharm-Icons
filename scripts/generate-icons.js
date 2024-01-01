const fs = require('fs');
const path = require('path');

/**
 * CodeCharm Icons Generator
 * Generates SVG icons for files, folders, and languages
 */

// Color palettes for each theme variant
const COLOR_PALETTES = {
  base: {
    primary: '#89b4fa',
    secondary: '#f5c2e7',
    accent: '#a6e3a1',
    warning: '#fab387',
    error: '#f38ba8',
    folder: '#89dceb',
    file: '#cba6f7',
    language: '#94e2d5'
  },
  light: {
    primary: '#1e66f5',
    secondary: '#ea76cb',
    accent: '#40a02b',
    warning: '#fe640b',
    error: '#d20f39',
    folder: '#04a5e5',
    file: '#8839ef',
    language: '#179299'
  },
  soft: {
    primary: '#7287fd',
    secondary: '#f5bde6',
    accent: '#a6da95',
    warning: '#f5a97f',
    error: '#ed8796',
    folder: '#8bd5ca',
    file: '#c6a0f6',
    language: '#91d7e3'
  },
  warm: {
    primary: '#ff9e64',
    secondary: '#ff757f',
    accent: '#9ece6a',
    warning: '#e0af68',
    error: '#f7768e',
    folder: '#7dcfff',
    file: '#bb9af7',
    language: '#73daca'
  }
};

// Icon definitions
const FILE_ICONS = {
  // JavaScript/TypeScript
  javascript: { color: 'primary', extensions: ['js', 'mjs', 'cjs'] },
  typescript: { color: 'primary', extensions: ['ts', 'mts', 'cts'] },
  react: { color: 'primary', extensions: ['jsx'] },
  'react-typescript': { color: 'primary', extensions: ['tsx'] },
  
  // Web
  html: { color: 'warning', extensions: ['html', 'htm'] },
  css: { color: 'primary', extensions: ['css'] },
  scss: { color: 'secondary', extensions: ['scss'] },
  sass: { color: 'secondary', extensions: ['sass'] },
  less: { color: 'secondary', extensions: ['less'] },
  
  // Python
  python: { color: 'primary', extensions: ['py', 'pyw', 'pyx'] },
  
  // Java/Kotlin
  java: { color: 'error', extensions: ['java'] },
  kotlin: { color: 'accent', extensions: ['kt', 'kts'] },
  
  // C/C++
  c: { color: 'primary', extensions: ['c', 'h'] },
  cpp: { color: 'primary', extensions: ['cpp', 'cc', 'cxx', 'hpp', 'hh', 'hxx'] },
  
  // Other languages
  rust: { color: 'warning', extensions: ['rs'] },
  go: { color: 'primary', extensions: ['go'] },
  php: { color: 'accent', extensions: ['php'] },
  ruby: { color: 'error', extensions: ['rb'] },
  swift: { color: 'warning', extensions: ['swift'] },
  csharp: { color: 'accent', extensions: ['cs'] },
  
  // Data formats
  json: { color: 'accent', extensions: ['json', 'jsonc'] },
  yaml: { color: 'secondary', extensions: ['yaml', 'yml'] },
  xml: { color: 'warning', extensions: ['xml'] },
  toml: { color: 'primary', extensions: ['toml'] },
  
  // Documentation
  markdown: { color: 'file', extensions: ['md', 'markdown'] },
  
  // Config files
  config: { color: 'language', extensions: ['conf', 'config', 'ini'] },
  env: { color: 'accent', extensions: ['env'] },
  
  // Build tools
  npm: { color: 'error', files: ['package.json', 'package-lock.json'] },
  webpack: { color: 'primary', files: ['webpack.config.js'] },
  vite: { color: 'accent', files: ['vite.config.js', 'vite.config.ts'] },
  
  // Version control
  git: { color: 'warning', files: ['.gitignore', '.gitattributes'] },
  
  // Testing
  test: { color: 'accent', extensions: ['test.js', 'test.ts', 'spec.js', 'spec.ts'] },
  
  // Default
  file: { color: 'file', extensions: [] }
};

const FOLDER_ICONS = {
  src: { color: 'folder' },
  dist: { color: 'warning' },
  build: { color: 'warning' },
  public: { color: 'accent' },
  assets: { color: 'secondary' },
  components: { color: 'primary' },
  utils: { color: 'language' },
  services: { color: 'language' },
  models: { color: 'language' },
  controllers: { color: 'language' },
  tests: { color: 'accent' },
  docs: { color: 'file' },
  config: { color: 'language' },
  scripts: { color: 'warning' },
  node_modules: { color: 'error' },
  '.git': { color: 'warning' },
  '.vscode': { color: 'primary' },
  folder: { color: 'folder' }
};

/**
 * Generate an SVG icon
 */
function generateSVG(type, name, color, variant = 'base') {
  const palette = COLOR_PALETTES[variant];
  const iconColor = palette[color] || palette.file;
  
  let svgContent = '';
  
  if (type === 'file') {
    svgContent = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2C4.89543 2 4 2.89543 4 4V28C4 29.1046 4.89543 30 6 30H26C27.1046 30 28 29.1046 28 28V10L20 2H6Z" 
              fill="${iconColor}" opacity="0.2"/>
        <path d="M20 2V8C20 9.10457 20.8954 10 22 10H28L20 2Z" 
              fill="${iconColor}" opacity="0.4"/>
        <path d="M6 2C4.89543 2 4 2.89543 4 4V28C4 29.1046 4.89543 30 6 30H26C27.1046 30 28 29.1046 28 28V10L20 2H6Z" 
              stroke="${iconColor}" stroke-width="1.5" fill="none"/>
        <text x="16" y="22" font-family="Arial, sans-serif" font-size="8" font-weight="bold" 
              fill="${iconColor}" text-anchor="middle">${name.substring(0, 3).toUpperCase()}</text>
      </svg>
    `;
  } else if (type === 'folder') {
    svgContent = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H12L14 7H26C27.1046 7 28 7.89543 28 9V26C28 27.1046 27.1046 28 26 28H6C4.89543 28 4 27.1046 4 26V6Z" 
              fill="${iconColor}" opacity="0.3"/>
        <path d="M4 6C4 4.89543 4.89543 4 6 4H12L14 7H26C27.1046 7 28 7.89543 28 9V26C28 27.1046 27.1046 28 26 28H6C4.89543 28 4 27.1046 4 26V6Z" 
              stroke="${iconColor}" stroke-width="1.5" fill="none"/>
      </svg>
    `;
  } else if (type === 'folder-open') {
    svgContent = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H12L14 7H26C27.1046 7 28 7.89543 28 9V11H4V6Z" 
              fill="${iconColor}" opacity="0.3"/>
        <path d="M2 11H30L28 26C27.8 27.2 26.7 28 25.5 28H6.5C5.3 28 4.2 27.2 4 26L2 11Z" 
              fill="${iconColor}" opacity="0.2"/>
        <path d="M4 6C4 4.89543 4.89543 4 6 4H12L14 7H26C27.1046 7 28 7.89543 28 9V11M2 11H30L28 26C27.8 27.2 26.7 28 25.5 28H6.5C5.3 28 4.2 27.2 4 26L2 11Z" 
              stroke="${iconColor}" stroke-width="1.5" fill="none"/>
      </svg>
    `;
  }
  
  return svgContent.trim();
}

/**
 * Main generation function
 */
function generateIcons() {
  const variants = ['base', 'light', 'soft', 'warm'];
  const iconsDir = path.join(__dirname, '..', 'icons');
  
  console.log('🎨 Generating CodeCharm Icons...\n');
  
  variants.forEach(variant => {
    console.log(`📦 Generating ${variant} variant...`);
    
    // Create variant directories
    const variantDir = path.join(iconsDir, variant);
    ['files', 'folders'].forEach(subdir => {
      const dir = path.join(variantDir, subdir);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
    
    // Generate file icons
    let fileCount = 0;
    Object.entries(FILE_ICONS).forEach(([name, config]) => {
      const svg = generateSVG('file', name, config.color, variant);
      const filePath = path.join(variantDir, 'files', `${name}.svg`);
      fs.writeFileSync(filePath, svg);
      fileCount++;
    });
    
    // Generate folder icons
    let folderCount = 0;
    Object.entries(FOLDER_ICONS).forEach(([name, config]) => {
      // Closed folder
      const svgClosed = generateSVG('folder', name, config.color, variant);
      const filePathClosed = path.join(variantDir, 'folders', `${name}.svg`);
      fs.writeFileSync(filePathClosed, svgClosed);
      
      // Open folder
      const svgOpen = generateSVG('folder-open', name, config.color, variant);
      const filePathOpen = path.join(variantDir, 'folders', `${name}-open.svg`);
      fs.writeFileSync(filePathOpen, svgOpen);
      
      folderCount += 2;
    });
    
    console.log(`  ✅ Generated ${fileCount} file icons`);
    console.log(`  ✅ Generated ${folderCount} folder icons`);
  });
  
  console.log('\n✨ Icon generation complete!');
  console.log(`📊 Total: ${Object.keys(FILE_ICONS).length * 4} file icons, ${Object.keys(FOLDER_ICONS).length * 8} folder icons`);
}

// Run the generator
if (require.main === module) {
  generateIcons();
}

module.exports = { generateIcons };

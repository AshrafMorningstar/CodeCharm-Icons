const fs = require('fs');
const path = require('path');

/**
 * CodeCharm Icons Generator
 * Generates SVG icons for files, folders, and languages
 */

// Color palettes for each theme variant
const { FILE_ICONS, FOLDER_ICONS, COLOR_PALETTES } = require('./icon-definitions');

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

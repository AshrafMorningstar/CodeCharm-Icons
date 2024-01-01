const fs = require('fs');
const path = require('path');

/**
 * CodeCharm Icons Verification Script
 * Verifies all icons and theme files are correctly generated
 */

function verifyIcons() {
  console.log('🔍 Verifying CodeCharm Icons...\n');
  
  const variants = ['base', 'light', 'soft', 'warm'];
  const iconsDir = path.join(__dirname, '..', 'icons');
  const themesDir = path.join(__dirname, '..', 'themes');
  
  let totalErrors = 0;
  let totalWarnings = 0;
  
  // Verify icon directories
  console.log('📁 Checking icon directories...');
  variants.forEach(variant => {
    const variantDir = path.join(iconsDir, variant);
    const filesDir = path.join(variantDir, 'files');
    const foldersDir = path.join(variantDir, 'folders');
    
    if (!fs.existsSync(filesDir)) {
      console.error(`  ❌ Missing: ${filesDir}`);
      totalErrors++;
    } else {
      const fileCount = fs.readdirSync(filesDir).length;
      console.log(`  ✅ ${variant}/files: ${fileCount} icons`);
    }
    
    if (!fs.existsSync(foldersDir)) {
      console.error(`  ❌ Missing: ${foldersDir}`);
      totalErrors++;
    } else {
      const folderCount = fs.readdirSync(foldersDir).length;
      console.log(`  ✅ ${variant}/folders: ${folderCount} icons`);
    }
  });
  
  // Verify theme files
  console.log('\n📄 Checking theme definition files...');
  variants.forEach(variant => {
    const themeFile = path.join(themesDir, `codecharm-${variant}.json`);
    
    if (!fs.existsSync(themeFile)) {
      console.error(`  ❌ Missing: codecharm-${variant}.json`);
      totalErrors++;
    } else {
      try {
        const themeData = JSON.parse(fs.readFileSync(themeFile, 'utf8'));
        
        // Verify required fields
        const requiredFields = ['iconDefinitions', 'file', 'folder', 'folderExpanded'];
        const missingFields = requiredFields.filter(field => !themeData[field]);
        
        if (missingFields.length > 0) {
          console.error(`  ❌ codecharm-${variant}.json missing fields: ${missingFields.join(', ')}`);
          totalErrors++;
        } else {
          const iconCount = Object.keys(themeData.iconDefinitions).length;
          console.log(`  ✅ codecharm-${variant}.json: ${iconCount} icon definitions`);
        }
        
        // Verify icon paths point to correct variant
        const firstIcon = Object.values(themeData.iconDefinitions)[0];
        if (firstIcon && firstIcon.iconPath && !firstIcon.iconPath.includes(`/${variant}/`)) {
          console.warn(`  ⚠️  codecharm-${variant}.json may have incorrect icon paths`);
          totalWarnings++;
        }
      } catch (e) {
        console.error(`  ❌ Invalid JSON in codecharm-${variant}.json: ${e.message}`);
        totalErrors++;
      }
    }
  });
  
  // Verify package.json
  console.log('\n📦 Checking package.json...');
  const packageFile = path.join(__dirname, '..', 'package.json');
  
  if (!fs.existsSync(packageFile)) {
    console.error('  ❌ Missing package.json');
    totalErrors++;
  } else {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
      
      if (!pkg.contributes || !pkg.contributes.iconThemes) {
        console.error('  ❌ package.json missing iconThemes contribution');
        totalErrors++;
      } else {
        const themeCount = pkg.contributes.iconThemes.length;
        console.log(`  ✅ package.json: ${themeCount} icon themes registered`);
        
        // Verify each theme is registered
        variants.forEach(variant => {
          const registered = pkg.contributes.iconThemes.some(
            theme => theme.id === `codecharm-${variant}`
          );
          if (!registered) {
            console.error(`  ❌ Theme codecharm-${variant} not registered in package.json`);
            totalErrors++;
          }
        });
      }
    } catch (e) {
      console.error(`  ❌ Invalid package.json: ${e.message}`);
      totalErrors++;
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('✨ All checks passed! CodeCharm Icons is ready to use.');
  } else {
    if (totalErrors > 0) {
      console.log(`❌ Found ${totalErrors} error(s)`);
    }
    if (totalWarnings > 0) {
      console.log(`⚠️  Found ${totalWarnings} warning(s)`);
    }
  }
  console.log('='.repeat(50));
  
  return totalErrors === 0;
}

// Run verification
if (require.main === module) {
  const success = verifyIcons();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyIcons };

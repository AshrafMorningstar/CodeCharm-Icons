const fs = require('fs');
const path = require('path');
const { FILE_ICONS, FOLDER_ICONS } = require('./icon-definitions');

/**
 * CodeCharm Theme Generator
 * Generates the JSON theme definitions for VS Code
 */

function generateTheme(variant) {
  console.log(`🎨 Generating theme definition for: ${variant}`);
  
  const theme = {
    hidesExplorerArrows: false,
    iconDefinitions: {},
    file: "_file",
    folder: "_folder",
    folderExpanded: "_folder_open",
    folderNames: {},
    folderNamesExpanded: {},
    fileExtensions: {},
    fileNames: {},
    languageIds: {}
  };

  // Base paths
  const iconPrefix = `../icons/${variant}`;

  // 1. Add base definitions
  theme.iconDefinitions._file = { iconPath: `${iconPrefix}/files/file.svg` };
  theme.iconDefinitions._folder = { iconPath: `${iconPrefix}/folders/folder.svg` };
  theme.iconDefinitions._folder_open = { iconPath: `${iconPrefix}/folders/folder-open.svg` };

  // 2. Process File Icons
  Object.entries(FILE_ICONS).forEach(([name, config]) => {
    if (name === 'file') return; // Skip default

    const iconId = name;
    theme.iconDefinitions[iconId] = { iconPath: `${iconPrefix}/files/${name}.svg` };

    // Extensions
    if (config.extensions) {
      config.extensions.forEach(ext => {
        theme.fileExtensions[ext] = iconId;
      });
    }

    // File Names
    if (config.files) {
      config.files.forEach(fileName => {
        theme.fileNames[fileName] = iconId;
      });
    }
  });

  // 3. Process Folder Icons
  Object.entries(FOLDER_ICONS).forEach(([name, config]) => {
    if (name === 'folder') return; // Skip default

    const iconId = `folder-${name}`;
    const iconIdOpen = `folder-${name}-open`;

    theme.iconDefinitions[iconId] = { iconPath: `${iconPrefix}/folders/${name}.svg` };
    theme.iconDefinitions[iconIdOpen] = { iconPath: `${iconPrefix}/folders/${name}-open.svg` };

    // Map folder names
    // Use the primary key as the folder name if no specific aliases provided
    theme.folderNames[name] = iconId;
    theme.folderNamesExpanded[name] = iconIdOpen;

    // Map aliases
    if (config.folderNames) {
      config.folderNames.forEach(alias => {
        theme.folderNames[alias] = iconId;
        theme.folderNamesExpanded[alias] = iconIdOpen;
      });
    }
  });

  // 4. Language Associations (Heuristic mapping based on exact matches)
  Object.keys(FILE_ICONS).forEach(name => {
    // Map 'javascript' -> 'javascript', 'python' -> 'python', etc.
    theme.languageIds[name] = name;
  });
  
  // Manual overrides/additions for languages where ID differs from icon name
  theme.languageIds['javascriptreact'] = 'react';
  theme.languageIds['typescriptreact'] = 'react-typescript';
  theme.languageIds['shellscript'] = 'shell';
  theme.languageIds['dockerfile'] = 'docker';
  theme.languageIds['ignore'] = 'git';

  return theme;
}

function main() {
  const variants = ['base', 'light', 'soft', 'warm'];
  const themesDir = path.join(__dirname, '..', 'themes');

  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  variants.forEach(variant => {
    const themeData = generateTheme(variant);
    const filePath = path.join(themesDir, `codecharm-${variant}.json`);
    fs.writeFileSync(filePath, JSON.stringify(themeData, null, 2));
    console.log(`  ✅ Wrote ${filePath}`);
  });
}

if (require.main === module) {
  main();
}

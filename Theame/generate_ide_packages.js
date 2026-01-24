const fs = require('fs');
const path = require('path');

// Configuration
const ICONS_DIR = path.join(__dirname, 'icons');
const OUTPUT_DIR = path.join(__dirname, 'ide-packages');
const VARIANTS = ['base', 'light', 'soft', 'warm'];

// Extension mappings (common ones)
const EXTENSION_MAP = {
  'javascript': ['js', 'jsx', 'mjs', 'cjs'],
  'typescript': ['ts', 'tsx', 'mts', 'cts'],
  'python': ['py', 'pyw', 'pyi'],
  'java': ['java'],
  'c': ['c', 'h'],
  'cpp': ['cpp', 'cc', 'cxx', 'hpp', 'hxx'],
  'csharp': ['cs'],
  'go': ['go'],
  'rust': ['rs'],
  'php': ['php'],
  'ruby': ['rb'],
  'swift': ['swift'],
  'kotlin': ['kt', 'kts'],
  'dart': ['dart'],
  'lua': ['lua'],
  'luau': ['luau'],
  'sql': ['sql'],
  'html': ['html', 'htm'],
  'css': ['css'],
  'scss': ['scss', 'sass'],
  'json': ['json'],
  'yaml': ['yaml', 'yml'],
  'xml': ['xml'],
  'markdown': ['md'],
  'shell': ['sh', 'bash', 'zsh'],
  'powershell': ['ps1'],
  'docker': ['dockerfile'],
  'git': ['gitignore', 'gitattributes']
};

// ===== JETBRAINS PLUGIN =====
async function generateJetBrainsPlugin() {
    console.log('Generating JetBrains plugin...');
    
    const pluginDir = path.join(OUTPUT_DIR, 'jetbrains', 'codecharm-icons-jetbrains');
    const metaInfDir = path.join(pluginDir, 'META-INF');
    const iconsDir = path.join(pluginDir, 'icons');
    
    // Create directories
    [metaInfDir, iconsDir].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
    
    // Copy icons
    for (const variant of VARIANTS) {
        const srcDir = path.join(ICONS_DIR, variant);
        const destDir = path.join(iconsDir, variant);
        if (fs.existsSync(srcDir)) {
            fs.cpSync(srcDir, destDir, { recursive: true });
        }
    }
    
    // Generate plugin.xml
    const pluginXml = `<idea-plugin>
  <id>com.codecharm.icons</id>
  <name>CodeCharm Icons</name>
  <version>1.0.0</version>
  <vendor email="support@codecharm.com" url="https://github.com/admin/codecharm-icons">CodeCharm</vendor>

  <description><![CDATA[
    💝 Charming, vibrant icon theme for JetBrains IDEs with 1,600+ language support.
    
    Features:
    - 6,584 unique icons across 4 color variants (Base, Light, Soft, Warm)
    - Comprehensive language coverage (1,600+ programming languages)
    - Beautiful, consistent design
    - Optimized for all JetBrains IDEs
  ]]></description>

  <change-notes><![CDATA[
    <h2>1.0.0</h2>
    <ul>
      <li>Initial release</li>
      <li>1,600+ language icons</li>
      <li>4 color variants</li>
    </ul>
  ]]></change-notes>

  <idea-version since-build="213.0"/>

  <depends>com.intellij.modules.platform</depends>

  <extensions defaultExtensionNs="com.intellij">
    <iconMapper mappingFile="CodeCharmIconMappings.json"/>
  </extensions>
</idea-plugin>`;
    
    fs.writeFileSync(path.join(metaInfDir, 'plugin.xml'), pluginXml);
    
    // Generate icon mappings JSON
    const mappings = {};
    const iconFiles = fs.readdirSync(path.join(ICONS_DIR, 'base'));
    
    iconFiles.forEach(file => {
        if (file.endsWith('.svg')) {
            const iconName = file.replace('.svg', '');
            const langName = iconName.replace('lang_', '').replace(/-/g, '');
            
            // Try to find extensions
            if (EXTENSION_MAP[langName]) {
                EXTENSION_MAP[langName].forEach(ext => {
                    mappings[ext] = `/icons/base/${file}`;
                });
            }
        }
    });
    
    fs.writeFileSync(
        path.join(pluginDir, 'CodeCharmIconMappings.json'),
        JSON.stringify(mappings, null, 2)
    );
    
    console.log(`✓ JetBrains plugin generated at: ${pluginDir}`);
}

// ===== SUBLIME TEXT PACKAGE =====
async function generateSublimePackage() {
    console.log('Generating Sublime Text package...');
    
    const packageDir = path.join(OUTPUT_DIR, 'sublime', 'CodeCharm Icons');
    const iconsDir = path.join(packageDir, 'icons');
    
    // Create directories
    if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
    
    // Copy icons
    for (const variant of VARIANTS) {
        const srcDir = path.join(ICONS_DIR, variant);
        const destDir = path.join(iconsDir, variant);
        if (fs.existsSync(srcDir)) {
            fs.cpSync(srcDir, destDir, { recursive: true });
        }
    }
    
    // Generate theme file
    const themeRules = [];
    const iconFiles = fs.readdirSync(path.join(ICONS_DIR, 'base'));
    
    iconFiles.forEach(file => {
        if (file.endsWith('.svg')) {
            const iconName = file.replace('.svg', '').replace('lang_', '');
            const langName = iconName.replace(/-/g, '');
            
            if (EXTENSION_MAP[langName]) {
                EXTENSION_MAP[langName].forEach(ext => {
                    themeRules.push({
                        class: 'icon_file_type',
                        parents: [{ class: 'tree_row', attributes: [`*.${ext}`] }],
                        layer0: { texture: `Packages/CodeCharm Icons/icons/base/${file}` }
                    });
                });
            }
        }
    });
    
    const theme = {
        name: 'CodeCharm Icons',
        author: 'Admin',
        variables: {},
        rules: themeRules
    };
    
    fs.writeFileSync(
        path.join(packageDir, 'CodeCharm Icons.sublime-theme'),
        JSON.stringify(theme, null, 2)
    );
    
    // Package metadata
    const metadata = {
        name: 'CodeCharm Icons',
        description: '💝 Charming icon theme with 1,600+ language support',
        author: 'Admin',
        homepage: 'https://github.com/admin/codecharm-icons',
        version: '1.0.0',
        sublime_text: '>=3000'
    };
    
    fs.writeFileSync(
        path.join(packageDir, 'package-metadata.json'),
        JSON.stringify(metadata, null, 2)
    );
    
    console.log(`✓ Sublime Text package generated at: ${packageDir}`);
}

// ===== NEOVIM PLUGIN =====
async function generateNeovimPlugin() {
    console.log('Generating Neovim plugin...');
    
    const pluginDir = path.join(OUTPUT_DIR, 'neovim', 'codecharm-icons.nvim');
    const luaDir = path.join(pluginDir, 'lua', 'codecharm-icons');
    const iconsDir = path.join(pluginDir, 'icons');
    
    // Create directories
    [luaDir, iconsDir].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
    
    // Copy icons
    for (const variant of VARIANTS) {
        const srcDir = path.join(ICONS_DIR, variant);
        const destDir = path.join(iconsDir, variant);
        if (fs.existsSync(srcDir)) {
            fs.cpSync(srcDir, destDir, { recursive: true });
        }
    }
    
    // Generate Lua icon table
    const iconTable = {};
    const iconFiles = fs.readdirSync(path.join(ICONS_DIR, 'base'));
    
    iconFiles.forEach(file => {
        if (file.endsWith('.svg')) {
            const iconName = file.replace('.svg', '').replace('lang_', '');
            iconTable[iconName] = '';  // Nerd font icon placeholder
        }
    });
    
    const luaCode = `-- CodeCharm Icons for Neovim
local M = {}

M.icons = ${JSON.stringify(iconTable, null, 2).replace(/"/g, "'")}

function M.setup(opts)
  opts = opts or {}
  local variant = opts.variant or 'base'
  
  -- Integration with nvim-web-devicons
  local has_devicons, devicons = pcall(require, 'nvim-web-devicons')
  if has_devicons then
    devicons.setup({
      override = M.icons,
      default = true
    })
  end
end

return M
`;
    
    fs.writeFileSync(path.join(luaDir, 'init.lua'), luaCode);
    
    // README
    const readme = `# CodeCharm Icons for Neovim

💝 Charming icon theme with 1,600+ language support

## Installation

### Using [lazy.nvim](https://github.com/folke/lazy.nvim)

\`\`\`lua
{
  'admin/codecharm-icons.nvim',
  config = function()
    require('codecharm-icons').setup({
      variant = 'base' -- 'base', 'light', 'soft', or 'warm'
    })
  end
}
\`\`\`

### Using [packer.nvim](https://github.com/wbthomason/packer.nvim)

\`\`\`lua
use {
  'admin/codecharm-icons.nvim',
  config = function()
    require('codecharm-icons').setup()
  end
}
\`\`\`

## License

MIT
`;
    
    fs.writeFileSync(path.join(pluginDir, 'README.md'), readme);
    
    console.log(`✓ Neovim plugin generated at: ${pluginDir}`);
}

// Main execution
async function main() {
    console.log('🚀 Generating IDE packages...\n');
    
    try {
        await generateJetBrainsPlugin();
        await generateSublimePackage();
        await generateNeovimPlugin();
        
        console.log('\n✅ All IDE packages generated successfully!');
        console.log(`\nOutput directory: ${OUTPUT_DIR}`);
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

main();

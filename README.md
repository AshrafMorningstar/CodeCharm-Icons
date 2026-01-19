# 💝 CodeCharm Icons

<div align="center">

![CodeCharm Icons Logo](./logo.png)

**A vibrant and charming icon theme for Visual Studio Code**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.70%2B-blue)](https://code.visualstudio.com/)

_Bring magical charm to your coding workspace with 100+ beautiful icons across 4 stunning color variants_

</div>

---

## 📷 Previews

### 🫐 Base (Dark & Vibrant)

Perfect for dark themes with rich, saturated colors

### 🥥 Light (Bright & Clean)

Optimized for light themes with crisp, clear icons

### 🍇 Soft (Pastel & Soothing)

Muted, dreamy colors for a calm coding experience

### 🍓 Warm (Cozy & Golden)

Warm tones with orange, red, and yellow accents

---

## ✨ Features

- 🎨 **4 Color Variants** - Choose the perfect palette for your mood
- 📁 **100+ File Icons** - Extensive language and framework support
- 📂 **50+ Folder Icons** - Organized by common project structures
- ⚙️ **Highly Customizable** - Hide arrows, outlined folders, custom associations
- 🚀 **Lightweight** - Fast and performant
- 💎 **Hand-Crafted** - Each icon designed with care

---

## 🔧 Installation

### Via VS Code Marketplace

1. Open **Extensions** in VS Code (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for **"CodeCharm Icons"**
3. Click **Install**
4. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
5. Run `Preferences: File Icon Theme`
6. Select your preferred CodeCharm variant

### Manual Installation

1. Download the `.vsix` file from [Releases](https://github.com/codecharm/codecharm-icons/releases)
2. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Run `Extensions: Install from VSIX...`
4. Select the downloaded file

---

## 🎨 Customization

### Settings

Add these to your VS Code `settings.json`:

```json
{
  // Hide folding arrows next to folder icons
  "codecharm-icons.hidesExplorerArrows": false,

  // Configure outlined folder icons
  // Options: "when-expanded" | "always" | "never"
  "codecharm-icons.outlinedFolders": "when-expanded"
}
```

### Custom Icon Associations

Map your own file extensions, names, folders, or languages to specific icons:

```json
{
  // Language associations
  "codecharm-icons.associations.languages": {
    "typescriptreact": "react-typescript"
  },

  // File extension associations
  "codecharm-icons.associations.extensions": {
    "spec.ts": "test",
    "config.js": "config"
  },

  // Specific file name associations
  "codecharm-icons.associations.files": {
    "vite.config.ts": "vite",
    "webpack.config.js": "webpack"
  },

  // Folder name associations
  "codecharm-icons.associations.folders": {
    "typings": "folder-config",
    "lib": "folder-utils"
  }
}
```

---

## 📦 Supported Languages & Frameworks

### Languages

JavaScript • TypeScript • Python • Java • Kotlin • C • C++ • Rust • Go • PHP • Ruby • Swift • C# • and more...

### Web Technologies

HTML • CSS • SCSS • Sass • Less • React • Vue • Angular • Svelte

### Data Formats

JSON • YAML • XML • TOML • CSV • SQL

### Tools & Frameworks

Node.js • npm • Vite • Webpack • Git • Docker • and more...

---

## 🙌 Icon Requests

Missing an icon for your favorite language or framework?

- 🐛 [Open an issue](https://github.com/codecharm/codecharm-icons/issues)
- 💬 Ping me on Discord: `@codecharm`

---

## ❤️ Acknowledgments

CodeCharm Icons draws inspiration from:

- [Catppuccin Icons](https://github.com/catppuccin/vscode-icons) - Soothing pastel icons for VSCode
- [Monospace Theme](https://idx.dev/) - Google's IDX Monospace Theme
- [Material Icon Theme](https://github.com/PKief/vscode-material-icon-theme) - The iconic Material icons

---

## 📄 License

Released under the [MIT License](./LICENSE)

---

<div align="center">

**Made with 💝 by the CodeCharm team**

If you enjoy CodeCharm Icons, please ⭐ star the repo!

</div>

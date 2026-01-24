# CodeCharm Icons

![CodeCharm Icons](icon.png)

💝 **Charming, vibrant icon theme for VS Code with multiple color variants**

CodeCharm Icons is a comprehensive icon theme featuring 261 carefully crafted icons across 4 beautiful color variants. Perfect for developers who want their IDE to look as good as their code!

## 📷 Previews

### 🫐 Base (Dark)

The default variant with vibrant colors optimized for dark themes.

### 🥥 Light

Soft, pastel colors perfect for light themes.

### 🍇 Soft

Muted, gentle colors for a calm coding experience.

### 🍓 Warm

Cozy, warm tones for a comfortable workspace.

## 🔧 Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "CodeCharm Icons"
4. Click Install
5. Press Ctrl+Shift+P / Cmd+Shift+P
6. Type "File Icon Theme" and select your preferred variant

### Manual Installation

1. Download the `.vsix` file from the [Releases page](https://github.com/yourusername/codecharm-icons/releases)
2. Open VS Code
3. Press Ctrl+Shift+P / Cmd+Shift+P
4. Run `Extensions: Install from VSIX...`
5. Select the downloaded `.vsix` file

## 🎨 Customization

### Settings

You can customize the icon theme with the following settings in your `settings.json`:

```json
{
  // Hide folding arrows next to folder icons
  "codecharm-icons.hidesExplorerArrows": false,

  // Configure when to use outlined folder icons
  // Options: "when-expanded", "always", "never"
  "codecharm-icons.outlinedFolders": "when-expanded"
}
```

### Custom Icon Associations

CodeCharm Icons supports custom icon associations for languages, file extensions, specific files, and folders:

```json
{
  // Assign icons based on language ID
  "codecharm-icons.associations.languages": {
    "typescriptreact": "react-typescript"
  },

  // Assign icons based on file extension
  "codecharm-icons.associations.extensions": {
    "spec.ts": "test-blue"
  },

  // Assign icons to specific file names
  "codecharm-icons.associations.files": {
    "vite.config.ts": "vite"
  },

  // Assign icons to specific folder names
  "codecharm-icons.associations.folders": {
    "typings": "folder_types"
  }
}
```

## 🌟 Features

- **261 File & Folder Icons**: Comprehensive coverage for popular languages and frameworks
- **4 Color Variants**: Base, Light, Soft, and Warm themes
- **Language Support**: JavaScript, TypeScript, Python, Java, C++, Go, Rust, PHP, Ruby, and many more
- **Framework Icons**: React, Vue, Angular, Svelte, Next.js, Nuxt, and more
- **Build Tools**: Webpack, Vite, Rollup, Gulp, esbuild
- **Testing**: Jest, Mocha, Cypress, Playwright
- **Config Files**: ESLint, Prettier, TypeScript, Docker, and more
- **Special Folders**: Customized icons for common folder names (src, test, docs, etc.)
- **Roblox Support**: Dedicated icons for Roblox development (Luau, rbxl, rbxm, etc.)

## 📦 Icon Coverage

### Languages

Assembly, Astro, C, C++, C#, CSS, Dart, Go, Gleam, HTML, Java, JavaScript, TypeScript, Julia, Kotlin, Lua, Luau, Nim, Odin, Perl, PHP, Python, Ruby, Rust, Scala, Shell, Swift, Zig, and more

### Frameworks & Libraries

React, Vue, Angular, Svelte, Next.js, Nuxt, NestJS, Tailwind CSS, PostCSS

### Tools & Config

Docker, Git, ESLint, Prettier, Vite, Webpack, npm, Yarn, pnpm, Bun

### Special Files

README, LICENSE, CHANGELOG, .gitignore, package.json, tsconfig.json, and many more

## 🙌 Requests

Have an icon request or found a bug? Please [open an issue](https://github.com/yourusername/codecharm-icons/issues) on GitHub!

## ❤️ Inspiration

CodeCharm Icons draws inspiration from:

- [Charmed Icons](https://marketplace.visualstudio.com/items?itemName=littensy.charmed-icons): Soothing pastel icons for VSCode
- [Catppuccin Icons](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc-icons): Beautiful pastel theme
- [Monospace Theme](https://idx.dev/): Google's IDX theme

## 📄 License

CodeCharm Icons is released under the [MIT License](LICENSE).

---

**Enjoy coding with style!** ✨

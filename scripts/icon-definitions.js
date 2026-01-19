// Comprehensive list of supported icons
// Categories: Languages, Frameworks, Data, Config, Build, DevOps, etc.

const FILE_ICONS = {
  // === Languages ===
  javascript: { color: 'primary', extensions: ['js', 'mjs', 'cjs', 'es'] },
  typescript: { color: 'primary', extensions: ['ts', 'mts', 'cts'] },
  python: { color: 'primary', extensions: ['py', 'pyw', 'pyx', 'ipynb'] },
  java: { color: 'error', extensions: ['java', 'class', 'jar'] },
  kotlin: { color: 'accent', extensions: ['kt', 'kts'] },
  cpp: { color: 'primary', extensions: ['cpp', 'cc', 'cxx', 'c++', 'hpp', 'hh', 'hxx', 'h++'] },
  c: { color: 'primary', extensions: ['c', 'h'] },
  csharp: { color: 'accent', extensions: ['cs', 'csx'] },
  rust: { color: 'warning', extensions: ['rs', 'rlib'] },
  go: { color: 'primary', extensions: ['go', 'mod', 'sum'] },
  php: { color: 'accent', extensions: ['php', 'phtml', 'php3', 'php4', 'php5', 'phps'] },
  ruby: { color: 'error', extensions: ['rb', 'erb', 'gem'] },
  swift: { color: 'warning', extensions: ['swift'] },
  lua: { color: 'primary', extensions: ['lua'] },
  luau: { color: 'primary', extensions: ['luau'] },
  dart: { color: 'accent', extensions: ['dart'] },
  elixir: { color: 'secondary', extensions: ['ex', 'exs'] },
  erlang: { color: 'error', extensions: ['erl', 'hrl'] },
  haskell: { color: 'secondary', extensions: ['hs', 'lhs'] },
  scala: { color: 'error', extensions: ['scala', 'sc'] },
  clojure: { color: 'accent', extensions: ['clj', 'cljs', 'cljc', 'edn'] },
  julia: { color: 'secondary', extensions: ['jl'] },
  r: { color: 'primary', extensions: ['r', 'rmd'] },
  perl: { color: 'primary', extensions: ['pl', 'pm'] },
  powershell: { color: 'primary', extensions: ['ps1', 'psm1', 'psd1'] },
  shell: { color: 'accent', extensions: ['sh', 'bash', 'zsh', 'fish'] },
  sql: { color: 'database', extensions: ['sql', 'ddl', 'dml'] },
  graphql: { color: 'secondary', extensions: ['graphql', 'gql'] },
  
  // === Web Frameworks & Libraries ===
  react: { color: 'primary', extensions: ['jsx'] },
  'react-typescript': { color: 'primary', extensions: ['tsx'] },
  vue: { color: 'accent', extensions: ['vue'] },
  svelte: { color: 'warning', extensions: ['svelte'] },
  angular: { color: 'error', files: ['angular.json'], extensions: [] },
  next: { color: 'foreground', files: ['next.config.js', 'next.config.ts', 'next.config.mjs'] },
  nuxt: { color: 'accent', files: ['nuxt.config.js', 'nuxt.config.ts'] },
  gatsby: { color: 'secondary', files: ['gatsby-config.js', 'gatsby-node.js'] },
  astro: { color: 'warning', extensions: ['astro'] },
  tailwind: { color: 'secondary', files: ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs'] },
  
  // === Web Tech ===
  html: { color: 'warning', extensions: ['html', 'htm', 'xhtml'] },
  css: { color: 'primary', extensions: ['css'] },
  scss: { color: 'secondary', extensions: ['scss'] },
  sass: { color: 'secondary', extensions: ['sass'] },
  less: { color: 'secondary', extensions: ['less'] },
  postcss: { color: 'error', files: ['postcss.config.js'] },
  
  // === Data & Config ===
  json: { color: 'accent', extensions: ['json', 'jsonc'] },
  yaml: { color: 'secondary', extensions: ['yaml', 'yml'] },
  xml: { color: 'warning', extensions: ['xml', 'xsd', 'xsl'] },
  toml: { color: 'primary', extensions: ['toml'] },
  env: { color: 'accent', extensions: ['env'], files: ['.env.local', '.env.development', '.env.production'] },
  editorconfig: { color: 'foreground', files: ['.editorconfig'] },
  prettier: { color: 'secondary', files: ['.prettierrc', '.prettierrc.js', '.prettierrc.json', 'prettier.config.js'] },
  eslint: { color: 'secondary', files: ['.eslintrc', '.eslintrc.js', '.eslintrc.json', 'eslint.config.js'] },
  babel: { color: 'warning', files: ['.babelrc', 'babel.config.js', 'babel.config.json'] },
  
  // === DevOps & Tools ===
  docker: { color: 'primary', files: ['Dockerfile', 'docker-compose.yml', 'docker-compose.yaml'] },
  kubernetes: { color: 'primary', extensions: ['k8s.yml', 'k8s.yaml'] },
  terraform: { color: 'secondary', extensions: ['tf', 'tfvars'] },
  jenkins: { color: 'error', files: ['Jenkinsfile'] },
  github: { color: 'foreground', files: ['.github'] }, // folder check needed usually, but mapping works for some tools
  gitlab: { color: 'warning', files: ['.gitlab-ci.yml'] },
  vercel: { color: 'foreground', files: ['vercel.json'] },
  netlify: { color: 'secondary', files: ['netlify.toml'] },
  
  // === Runtimes & Package Managers ===
  npm: { color: 'error', files: ['package.json', 'package-lock.json'] },
  yarn: { color: 'primary', files: ['yarn.lock', '.yarnrc'] },
  pnpm: { color: 'warning', files: ['pnpm-lock.yaml', 'pnpm-workspace.yaml'] },
  bun: { color: 'paper', files: ['bun.lockb'] },
  deno: { color: 'foreground', files: ['deno.json', 'deno.jsonc'] },
  gradle: { color: 'secondary', files: ['build.gradle', 'gradle.properties'] },
  maven: { color: 'error', files: ['pom.xml'] },
  
  // === Documentation ===
  markdown: { color: 'file', extensions: ['md', 'markdown', 'mdx'] },
  license: { color: 'warning', files: ['LICENSE', 'LICENSE.md', 'LICENSE.txt'] },
  readme: { color: 'primary', files: ['README', 'README.md', 'README.txt'] },
  
  // === Databases ===
  prisma: { color: 'primary', files: ['schema.prisma'] },
  graphql: { color: 'secondary', extensions: ['graphql', 'gql'] },
  
  // === Testing ===
  test: { color: 'accent', extensions: ['test.js', 'test.ts', 'spec.js', 'spec.ts'] },
  jest: { color: 'error', files: ['jest.config.js', 'jest.config.ts'] },
  vitest: { color: 'accent', files: ['vitest.config.js', 'vitest.config.ts'] },
  cypress: { color: 'primary', files: ['cypress.json', 'cypress.config.js'] },
  playwright: { color: 'accent', files: ['playwright.config.js', 'playwright.config.ts'] },
  
  // === Default ===
  file: { color: 'file', extensions: [] }
};

const FOLDER_ICONS = {
  src: { color: 'folder' },
  dist: { color: 'warning' },
  build: { color: 'warning' },
  public: { color: 'accent' },
  assets: { color: 'secondary' },
  components: { color: 'primary' },
  interfaces: { color: 'primary', folderNames: ['interfaces', 'types', 'typings'] },
  utils: { color: 'language' },
  services: { color: 'language' },
  models: { color: 'language' },
  controllers: { color: 'language' },
  routes: { color: 'primary', folderNames: ['routes', 'router', 'routers'] },
  views: { color: 'accent', folderNames: ['views', 'pages', 'templates'] },
  hooks: { color: 'secondary', folderNames: ['hooks', 'composables'] },
  tests: { color: 'accent', folderNames: ['tests', 'test', '__tests__', '__test__'] },
  docs: { color: 'file', folderNames: ['docs', 'documentation'] },
  config: { color: 'language', folderNames: ['config', 'configs', 'configuration'] },
  scripts: { color: 'warning' },
  node_modules: { color: 'error' },
  '.git': { color: 'warning' },
  '.github': { color: 'foreground' },
  '.vscode': { color: 'primary' },
  'ci': { color: 'accent', folderNames: ['.circleci', '.travis', 'ci', '.github'] },
  folder: { color: 'folder' }
};

// Color palettes for each theme variant
const COLOR_PALETTES = {
  base: {
    primary: '#89b4fa',    // Blue
    secondary: '#f5c2e7',  // Pink
    accent: '#a6e3a1',     // Green
    warning: '#fab387',    // Orange
    error: '#f38ba8',      // Red
    folder: '#89dceb',     // Cyan
    file: '#cba6f7',       // Lavender
    language: '#94e2d5',   // Teal
    database: '#f9e2af',   // Yellow
    foreground: '#cdd6f4', // White-ish
    paper: '#f5e0dc'       // Rosewater
  },
  light: {
    primary: '#1e66f5',
    secondary: '#ea76cb',
    accent: '#40a02b',
    warning: '#fe640b',
    error: '#d20f39',
    folder: '#04a5e5',
    file: '#8839ef',
    language: '#179299',
    database: '#df8e1d',
    foreground: '#4c4f69',
    paper: '#dc8a78'
  },
  soft: {
    primary: '#7287fd',
    secondary: '#f5bde6',
    accent: '#a6da95',
    warning: '#f5a97f',
    error: '#ed8796',
    folder: '#8bd5ca',
    file: '#c6a0f6',
    language: '#91d7e3',
    database: '#eed49f',
    foreground: '#cad3f5',
    paper: '#f4dbd6'
  },
  warm: {
    primary: '#ff9e64',    // Orange
    secondary: '#ff757f',  // Coral
    accent: '#9ece6a',     // Lime
    warning: '#e0af68',    // Gold
    error: '#f7768e',      // Red
    folder: '#7dcfff',     // Sky
    file: '#bb9af7',       // Purple
    language: '#73daca',   // Teal
    database: '#ff9e64',   // Orange match
    foreground: '#c0caf5', // Blue white
    paper: '#ff9e64'       // Orange match
  }
};

module.exports = { FILE_ICONS, FOLDER_ICONS, COLOR_PALETTES };

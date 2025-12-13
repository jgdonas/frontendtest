import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginDevex from '@jose.donas/eslint-plugin-devex'
import unusedImports from 'eslint-plugin-unused-imports'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths' // NEW

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting,

  // Register our Custom DevEx Plugin
  {
    plugins: {
      devex: pluginDevex,
      'unused-imports': unusedImports,
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      'no-unused-vars': 'off', // Turn off standard rule
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // 2. Force Aliases (Forbid relative imports with ../..)
      // 2. Force Aliases with Auto-Fix
      // We removed 'no-restricted-imports' because it doesn't autofix.
      // This rule will automatically rewrite relative paths to use '@/'
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: false, // Do not allow "./GameSidebar.vue"
          rootDir: 'src', // Base directory for resolving paths
          prefix: '@', // The alias to use
        },
      ],
      'devex/no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
)

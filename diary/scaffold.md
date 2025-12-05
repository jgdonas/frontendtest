# Side Mission: The Chess.com Frontend Challenge - Part 3

Date: December 6, 2025

Tags: Vue 3, TypeScript, Tooling, Vitest

## The Missing Piece: The Application Code

We have a Docker container and a CI pipeline... but they are currently checking nothing because we haven't actually created the Vue application yet!

Today, I initialized the project. Instead of a manual setup, I used the official scaffolding tool `create-vue`. This is important for DevEx because it provides a standardized, "blessed" configuration that follows the community's best practices.

## The Stack Choices

I ran `npm create vue@latest` inside my project folder. Here are the specific choices I made and why:

1. **TypeScript**: Yes. 

    * *Why*: Strict typing prevents an entire class of bugs (like passing a string to a function expecting a number) before the code even runs. For a move logic engine, this is non-negotiable.

2. **Vue Router**: No.

    * *Why*: This is a single-view application (Board + Sidebar). Adding a router adds unnecessary complexity. We can keep it simple.

3. **Pinia**: Yes.

    * *Why*: While we could use simple props for state, we need to track the "game state" (moves, clicked squares, current turn). Pinia provides a clean, reactive store that is easier to test than a complex component tree.

4. **Vitest**: Yes.

    * *Why*: It's the native test runner for Vite. It's blazing fast and shares the same configuration as the build tool, eliminating the "it works in app but fails in tests" configuration hell.

5. **ESLint & Prettier**: Yes.

    * *Why*: Consistency. We don't want to waste time in code reviews arguing about semicolons.

## Dogfooding: Using Our Own Tools

A key part of Developer Experience is "dogfooding" —using the tools you build for others.

I took this opportunity to install the custom plugins I built earlier in my training:

* **vite-plugin-version-manifest**: I added my custom plugin to `vite.config.ts`. Now, every build automatically stamps the version and commit hash at the top of the JS bundle. This is crucial for debugging production issues (knowing exactly which version is running). [Link to Github repository](https://github.com/jgdonas/vite-plugin-version-manifest).

* **eslint-plugin-devex**: I configured my custom rule that strictly forbids `console.log` . [Link to Github repository](https://github.com/jgdonas/eslint-plugin-devex).

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import versionManifest  from '@jose.donas/vite-plugin-version-manifest' // My custom plugin

export default defineConfig({
  plugins: [
    vue(),
    versionManifest({ verbose: true })
  ],
  // ...
})
```

Standardizing the Code Style

Out of the box, `create-vue` gives us a solid config. But to ensure accessibility (a future goal for this project) and code quality, I added a specific rule to `eslint.config.ts` to ensure we don't accidentally leave `console.log` in production code (a classic mistake).

```typescript
// eslint.config.js
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'
import pluginDevex from '@jose.donas/eslint-plugin-devex' // Import our custom plugin

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],

  // ... other configs (Oxlint, Vitest, etc.)

  // Register our Custom DevEx Plugin
  {
    plugins: {
      devex: pluginDevex,
    },
    rules: {
      'devex/no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
)
```

## Running the Setup

Now that the code is generated, I verified it against our "Zero-Config" promise from Part 1:

I ran `docker compose up --build`.

The Vite server started instantly.

I verified that the `npm run lint` command (which runs in our CI) passes on the fresh code.

Status: The "skeleton" is alive.

*Next Steps: Building the responsive UI layout with Tailwind CSS.*
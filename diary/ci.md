# Side Mission: The Chess.com Frontend Challenge - Part 2

Date: December 5, 2025

Tags: CI/CD, GitHub Actions, DevEx

## The Problem: "Did I break something?"

In Part 1, we solved [the environment problem](docker.md) with Docker. Now, anyone can run the app. But how do we ensure they don't break it?

In a typical manual workflow, a developer might push code, open a Pull Request, and then a reviewer has to pull the branch, run `npm install`, run the linter, run the build, and run the tests manually.

This is:

1. *Slow*: It wastes the reviewer's time.
2. *Unreliable*: Humans forget steps.
3. *Frustrating*: There is nothing worse than reviewing code only to find a missing semicolon or a build error.

## The DevEx Solution: Continuous Integration (CI)

To solve this, I'm implementing a CI pipeline using GitHub Actions. My goal is to create a "Quality Gate". If code doesn't pass the gate (Linting, Building, Testing), it doesn't get merged. Period.

### The Workflow Configuration

I created a workflow file at `.github/workflows/ci.yml`. I am explicitly using the new **ubuntu-slim** runner. This is a 1 vCPU / 5GB RAM containerized runner optimized for lightweight automation. Using the standard ubuntu-latest VM for simple linting tasks is resource-inefficient. This change reduces queue times and saves billing credits.

Here is the configuration:

```
name: CI Quality Gate

# Trigger on push to main or any Pull Request
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    name: Lint, Test & Build
    # We use the new lightweight runner for efficiency
    runs-on: ubuntu-slim
 
    steps:
      # 1. Get the code
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. Setup Node.js environment
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm' # Automatically caches dependencies!

      # 3. Install dependencies (Clean install)
      - name: Install Dependencies
        run: npm ci

      # 4. Check for code quality issues
      - name: Run Linter
        run: npm run lint

      # 5. Ensure the project builds for production
      - name: Build Project
        run: npm run build

      # 6. Run Unit Tests (if available)
      - name: Run Unit Tests
        run: npm run test:unit
```

## Why This Matters

This simple file transforms the development experience:

* *Confidence*: I can refactor code knowing that if I break the build, the *robot* will tell me within 60 seconds.
* *Focus*: Code reviews can focus on logic and architecture, not "you forgot to run Prettier".
* *Speed*: npm ci and the cache: 'npm' setting ensure the pipeline runs fast, giving quick feedback.
* *Efficiency*: By using ubuntu-slim and npm ci, we ensure the pipeline is both fast and cost-effective.

### Architectural Note

You might wonder: 

> "Why not run the CI steps inside the node:18-alpine container to match development exactly?"

While GitHub Actions supports container: `node:18-alpine`, I deliberately chose the setup-node action on the host VM. For standard Node.js applications without complex OS-level dependencies (like ImageMagick or Python), setup-node is significantly faster due to pre-cached binaries. Using the container method adds initialization time to pull the image. Since our priority here is feedback loop speed, the lightweight runner approach wins.

With the environment dockerized and the safety net (CI) in place, I am now ready to actually write the application code with peace of mind.

*Next Steps: Building the Vue 3 + Tailwind CSS implementation of the Chessboard.*
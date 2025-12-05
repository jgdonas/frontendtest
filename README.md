# The DevEx Approach: Chess.com Frontend Challenge

This documentation logs the journey of solving the [Chess.com Frontend Technical Test](https://github.com/ChessCom/frontendtest).

Instead of treating this as a standard coding test, I approached it as a Developer Experience (DevEx) Engineer. My primary goal was to create an environment where the "next developer" could be productive immediately, with safety nets and tooling pre-configured.

## Development Log

Below is the chronological log of the decisions made, the infrastructure built, and the tools selected.

[Part 1: The Zero-Config Environment](./diary/docker.md)

*Focus: Docker, Environment Parity*

How I solved the "it works on my machine" problem by containerizing the development environment. This allows any developer to start the app with a single docker compose up command, regardless of their local Node.js version.

[Part 2: Automating Confidence (CI/CD)](./diary/ci.md)

*Focus: GitHub Actions, Quality Gates*

Implementing a Continuous Integration pipeline to act as a quality gate. I discuss the trade-offs between speed (ubuntu-slim) and consistency, and how to automate linting, building, and testing on every Pull Request.

[Part 3: The Foundation (Scaffolding & Tooling)](./diary/scaffold.md)

*Focus: Vue 3, TypeScript, Dogfooding*

The architectural choices behind the application code. Why I chose Pinia and Vitest, and how I "dogfooded" my own custom ESLint and Vite plugins to enforce code quality and standard versioning automatically.

## Prerequisites

To keep the "Zero-Config" promise, the requirements are minimal:

#### To Run the App (Product Managers / QA):

* Docker Desktop (or Docker Engine)
* Git

#### To develop (Engineers):

* Node.js (LTS recommended for local tooling support)
* VS Code

## Quick Start (For Reviewers)

If you just want to run the code, the DevEx work in Part 1 makes it simple:

### 1. Clone the repo

```
git clone git@github.com:jgdonas/frontendtest.git
```

### 2. Start the environment (Zero Config)

```
docker compose up
```


The application will be available at http://localhost:5173.
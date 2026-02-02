# Notify Project Standards & Coding Rules

This document defines the strict engineering standards for the Notify monorepo. All agents and developers MUST follow these rules.

## 🤖 General Agent Principles

- **Style Inheritance**: Always inherit and follow the existing code writing style, patterns, and architectural decisions found in the project. Do not introduce personal coding preferences, limitations, or external patterns that contradict established project conventions.
- **Context First**: Before making changes, analyze existing implementations of similar logic in the codebase and mirror their structure.
- **No Refactoring without Consent**: Do not refactor stable existing code unless explicitly asked to do so or if it's necessary for the current task.

## 🚀 TypeScript & Type Safety

- **No `any`**: The `any` type is strictly forbidden. Use `unknown` or specific interfaces.
  - ESLint `no-explicit-any` and TS `noImplicitAny` are enforced.
- **Handy-TS-Tools**: Use the `handy-ts-tools` library for utility functions instead of writing custom helpers (e.g., `generateUUID`).
- **Interfaces for DI**: Always define interfaces for services and use them as tokens for Inversify DI.

## 📦 State Management (MobX)

- **Class Decorators**: Use `@observable`, `@action`, and `@computed` decorators.
- **Encapsulation**: Observables MUST be private and prefixed with an underscore (e.g., `private _messages`). Provide public read-only access via `@computed` getters.
- **Strict Actions**: All mutations MUST happen inside `@action`. Use `runInAction` for mutations in async callbacks or anonymous functions.
- **Primitive Observables**: Prefer simple types in observables. Avoid storing complex class instances if a simple object or primitive suffices.

## 🏗️ Architecture & DI (Inversify)

- **Constructor Injection**: Use `@inject(Token)` in constructors. Avoid manual `container.get`.
- **Module Separation**: Logic and data stores MUST live in `packages/core`. `apps` should only contain UI and view-specific logic.
- **Disposable Pattern**: Services managing resources (timers, sockets, listeners) MUST implement the `Disposable` interface and clean up in `dispose()`.

## 🎨 UI & Styling

- **BEM Standard**: Use BEM (Block Element Modifier) for SCSS. Format: `.block-name__element--modifier` (kebab-case).
- **CamelCase CSS Modules**: In TSX files, access classes via camelCase property access: `styles.blockNameElement`.
- **Responsive Design**: Use global SCSS mixins and variables from `core` for colors and breakpoints. No hardcoded magic numbers for colors.
- **React Components**: Use `PureComponent` or Functional Components with `memo` and `observer` to prevent unnecessary re-renders.

## 🖥️ Desktop (Electron)

- **Linux Portability**: Always set `app.setDesktopName("Notify")` on Linux.
- **IPC Abstraction**: Do not call `ipcRenderer` directly in React components. Use the `electronWindowControls` utility from `core`.
- **Icon Loading**: Use `app.getAppPath()` and the `public` folder for persistent asset paths.

## 🛠️ Performance & Quality

- **No `console.log`**: Avoid leaving `console.log` in the codebase. Use `console.warn` or `console.error` for legitimate issues.
- **Tests**: Core logic (stores, utils) MUST have unit tests in Vitest.
- **Commit Messages**: Follow standard commit rules: `feat:`, `fix:`, `chore:`, `refactor:`.

## 📦 Dependency Management

- **pnpm Catalogs**: DO NOT add version numbers directly to `package.json`. Use `catalog:default`, `catalog:react19`, etc.
- **Strict pnpm**: Follow the catalogs defined in `pnpm-workspace.yaml`.

## 📁 Monorepo Layout

- `packages/core`: The single source of truth for business logic, stores, and types.
- `apps/web`: React implementation.
- `apps/desktop`: Electron entry point (sources web).
- `apps/mobile`: Expo implementation.
- `apps/server`: NestJS backend.

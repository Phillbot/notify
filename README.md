# Notify Monorepo

## 📋 TODO List

### Tech Debt & Refactoring

- [x] **Migrate to `handy-ts-tools`**: Replace custom helper functions in `packages/core/shared/utils` with the `handy-ts-tools` library.
- [ ] **Upgrade ESLint**: Migrate to ESLint v9+ and Flat Config architecture.
- [ ] **Package Management**: Audit `node_modules` to ensure clean separation of client/server dependencies (continue optimizing `pnpm-workspace.yaml`).

### Quality Assurance (Testing)

- [x] **Setup Unit Testing Infrastructure**: Install Vitest for `packages/core` and configure `nx test` targets.
- [x] **Core Logic Tests**: Write smoke tests for basic MobX stores and Inversify DI setup.

### CI/CD & DevOps

- [ ] **CI Pipeline**: Create GitHub Actions workflow for lint, build, and test on PRs.
- [ ] **Mobile Build**: Configure EAS Build for Cloud builds.
- [ ] **Desktop Release**: Setup Electron-Builder publishing to GitHub Releases.

### Mobile

- [x] Configure Babel for Decorators & Inversify support.
- [ ] Proper asset management (splash screens, icons).
- [ ] Debug builds setup (Android/iOS profiles).
- [ ] Production build pipeline (EAS).

### Core & Architecture

- [x] Implement `Disposable` pattern for resource management.
- [x] Global SCSS mixins for device detection.
- [x] Standardize commit rules (husky + commitlint).
- [ ] **UI Library Expansion**: Formalize `packages/ui-lib` to share **Design Tokens** (colors, typography, spacing) instead of full components.
- [ ] **API Client**: Create a unified API client in `core`.

### Project Roadmap

#### 📱 Mobile & Web UI

- [x] **Mobile Sidebar**: Toggleable sidebar with backdrop and sliding animation.
- [x] **Real-time Notifications**: Unread message badges (counters) for channels and DMs.
- [x] **BEM Standard**: Full styles refactor to BEM kebab-case with TypeScript support.
- [ ] **UI Library Expansion**: Formalize `packages/ui-lib` to share Design Tokens.

#### 🖥️ Desktop (Electron)

- [x] **Native Constraints**: Enforced minimum window sizes (minWidth/minHeight).
- [x] **Branding**: Dynamic window title with versioning (Notify vX.X.X).
- [ ] **Custom Title Bar**: Native-looking custom header with custom window controls.
- [ ] **Tray Integration**: App icon in system tray and background mode.

#### 👤 Profile & Social

- [ ] **Authentication**: Identity management (SignUp/SignIn) and persistent sessions.
- [ ] **Room Management**: Dynamic creation of channels and user invitation system.
- [ ] **Profile Customization**: Live name changes and avatar uploads.
- [ ] **Global Settings**: Centralized configuration for themes and notification preferences.

#### 🔐 Security & Architecture

- [x] **Persistence**: PostgreSQL integration for message history and user stability.
- [ ] **ID Validation**: Guaranteed uniqueness and validation for user/room identifiers.
- [ ] **E2EE**: End-to-end encryption research for Direct Messages.

---

## 🤖 AI Agent Instructions (Antigravity Guide)

This section provides context and rules for AI agents (like Antigravity) working on this codebase.

### Project Structure

- **Monorepo Tool**: `Emulated Nx` (via scripts) + `pnpm workspaces`.
- **Dependency Management**: strict usage of **pnpm catalogs** in `pnpm-workspace.yaml`.
  - ⚠️ **DO NOT** add versions directly to `package.json`. Always check catalogs first.
  - `catalog:default`: Shared tools (ESLint, Prettier, Typescript, Vite plugins, NestJS).
  - `catalog:mobile`: React Native, Expo.
  - `catalog:react19`: Web apps.
  - `catalog:react18`: Mobile apps (due to RN compatibility).

### Key Technologies

- **DI**: `InversifyJS` + `inversify-react`.
  - **Shared Core**: Modules define bindings (`bind<T>(Token).to(Impl)`).
  - **Web/Mobile**: Consumers create containers and load modules.
  - **Mobile Spec**: Requires `babel.config.cjs` with `legacy: true` for decorators.
- **State Management**: `MobX` (Classes + Decorators).
- **Backend**: `NestJS` + `Socket.io`.

### Build & Dev Workflow

- **Web**: `pnpm nx dev web` (Vite).
- **Mobile**: `pnpm nx dev mobile` (Expo).
  - Note: Mobile uses `babel.config.cjs` to support TS decorators.
- **Server**: `pnpm nx dev server` (NestJS).
  - Entry point: `apps/server/src/main.ts`.
  - Dist output: `dist/apps/server/src/main.js`.
- **Clean**: Use `pnpm clean:all` to wipe `node_modules`, `dist`, and caches.

### Common Pitfalls

1. **Typescript & CSS Modules**: We use `vite-plugin-sass-dts`. If you see errors about missing styles, run `pnpm nx build web` to regenerate `.d.scss.ts` files.
2. **Mobile Decorators**: If `@resolve` or `@observer` fail in Mobile, check `babel.config.cjs`.
3. **Server Dist**: NestJS builds to `dist/apps/server/...`. Always use `--entryFile` for `nest start`.

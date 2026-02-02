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

---

## 🛠️ Technical Standards

This project follows strict engineering guidelines regarding Type Safety (No `any`), Architecture (MobX + Inversify), and Monorepo structure.

For a detailed breakdown of coding standards and agent principles, see [.agent/rules/standard.md](.agent/rules/standard.md).

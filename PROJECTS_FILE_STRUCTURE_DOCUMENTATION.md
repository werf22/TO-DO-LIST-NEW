## Detailed Directory & File Explanations

---

### `/app` - Next.js App Router Core
*   Contains all routing, page UI, layouts, and API endpoint logic as defined by the Next.js App Router convention.

### `/components` - UI Components
*   All reusable UI components (forms, lists, field displays, etc.).

### `/config` - Configuration & Setup Files
*   Stores all configuration files for the app, including:
    *   `TASK_FIELD_CONFIG.ts` — Core field definitions
    *   `.env.local` — Environment variables
    *   `next.config.mjs` — Next.js config
    *   `package.json` — Dependencies & scripts
    *   `postcss.config.js` — PostCSS config
    *   `tailwind.config.ts` — Tailwind config
    *   `tsconfig.json` — TypeScript config
    *   `.windsurfrules` — Project rules

### `/lib` - Library Code
*   Utility code, database clients, and shared logic.

### `/prisma` - Database Schema & Migrations
*   Prisma ORM configuration and database schema management.

### `/public` - Static Assets
*   Static files served directly by the web server (images, fonts, etc.).

### Root Files
*   Documentation and planning files (`README.md`, `PRD.txt`, `PLANNING.md`, `TASK.md`, `DONE.md`, this file, etc.).

---

### File Management Log
*   [2025-04-22 01:09] Moved all config and environment files to `/config` for clarity and maintainability.
*   The following files are now in `/config`: `.env.local`, `next.config.mjs`, `package.json`, `postcss.config.js`, `tailwind.config.ts`, `tsconfig.json`, `.windsurfrules`.

_Last updated: 2025-04-22 01:09_

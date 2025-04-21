# AI To Do List App - Development Tasks

## Overall Goal

Create a custom AI-powered Task Management web application based on the specifications in `PRD.txt` and the data model defined in `config/TASK_FIELD_CONFIG.ts` and `prisma/schema.prisma`.

## Current Status

*   **Phase 0: Foundation** is complete.
*   **File structure migration completed and documented (2025-04-22)**
*   **Next Focus:** **Phase 1: AI Auto-Enrichment & Basic Display**

---

## Task Breakdown by Phase

**Phase 0: Foundation (Core MVP)**

*   [x] Finalize `PRD.txt` requirements document.
*   [x] Define core data structure in `config/TASK_FIELD_CONFIG.ts`.
*   [x] Define database schema in `prisma/schema.prisma`.
*   [x] Set up Next.js project with TypeScript, Tailwind CSS.
*   [x] Install Prisma and configure database connection (`DATABASE_URL` in `.env`).
*   [x] Create database utility `lib/prisma.ts`.
*   [x] Run initial Prisma migration (`npx prisma migrate dev`).
*   [x] Create basic API route `app/api/tasks/route.ts` with:
    *   [x] `GET` handler to fetch all tasks.
    *   [x] `POST` handler to create a new task (accepting minimal fields: name, goal, context, optional: portfolio, priority, due_date).
*   [x] Create main frontend page `app/page.tsx`.
*   [x] Create frontend component `components/TaskForm.tsx` for adding tasks.
*   [x] Create frontend component `components/TaskList.tsx` for displaying tasks.
*   [x] Move all files to correct structure as per documentation (2025-04-22).

**Phase 1: AI Auto-Enrichment & Basic Display**

*   [ ] Backend: Implement AI enrichment service and integrate with task creation.
*   [ ] API: Add AI trigger to POST /api/tasks.
*   [ ] Frontend: Display all fields in a read-only detail view.
*   [ ] Frontend: Link TaskList items to detail page.
*   [ ] Frontend: Show AI workflow status visually.

---

## Migration Log

* 2025-04-22: All files moved to their correct locations according to `PROJECTS_FILE_STRUCTURE_DOCUMENTATION.md` and project conventions. Documentation updated accordingly.

---

## Backlog / Future Ideas

*   User Authentication / Authorization.
*   More sophisticated AI interactions (e.g., AI proposing field updates for user approval).
*   Dashboard view with summaries/stats.
*   Customizable views/layouts.
*   Notifications system (e.g., for tasks requiring user action).
*   Integration with Calendar APIs.
*   AI fine-tuning based on user feedback (`AI Output Rating`, `Feedback for AI`).
*   More robust background job system for AI tasks (e.g., BullMQ, Redis).
*   Full text search across tasks.

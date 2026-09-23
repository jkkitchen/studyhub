# StudyHub Development Instructions

## Project

StudyHub is a college student organization application built with Next.js and TypeScript. It helps students organize courses, assignments, deadlines, and study resources.

## Technology Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- MongoDB
- Auth.js
- Google authentication
- GitHub
- Vercel

## TypeScript

- Use strict TypeScript.
- Do not use `any`, including implicit `any`.
- Define clear types for application data.
- Use the shared domain types as the authoritative definitions.
- Validate data received from forms, APIs, databases, and other trust boundaries.
- Prefer simple, readable TypeScript over complex abstractions.

## Next.js

- Use the App Router and file-based routing.
- Server Components are the default.
- Use Client Components only when client-side state, event handlers, browser APIs, or client-only libraries are required.
- Keep authentication and authorization checks on the server.
- Keep sensitive database operations on the server.
- Use appropriate loading, error, and empty states.

## Components

- Create reusable components when UI patterns are repeated.
- Keep components focused on one clear responsibility.
- Use PascalCase for React component names.
- Use camelCase for functions and variables.
- Use PascalCase for types and interfaces.

## Database

StudyHub uses MongoDB.

Core entities:

- User
- Course
- Assignment
- Resource

Courses belong to users.

Assignments and resources belong to both a user and a course.

Database queries involving user-owned data must verify the authenticated user's `userId`.

Never update or delete user-owned records using only a record ID.

## Authentication

StudyHub uses Auth.js with Google authentication.

Protected data must require an authenticated session.

Authentication and authorization must be verified on the server.

Secrets and database credentials must be stored in environment variables and must never be committed to GitHub.

## Styling

- Use Tailwind CSS.
- Follow the project's established design tokens and reusable UI patterns.
- Build responsive interfaces for mobile, tablet, and desktop.
- Use semantic HTML and accessible controls.
- Do not add custom CSS when an appropriate Tailwind solution exists.

## API

Client-side components should communicate with server functionality through the application's API Route Handlers when an API operation is required.

API handlers must:

1. Validate the request.
2. Verify authentication.
3. Verify ownership where required.
4. Perform the database operation.
5. Return an appropriate response.

## Code Quality

Before opening a pull request, run:

- TypeScript checks
- ESLint
- Prettier

Keep pull requests focused on the assigned feature or issue.

Do not introduce unrelated refactoring.

Do not commit secrets, environment files, generated build files, or unnecessary dependencies.

## Git Workflow

Do not push directly to `main`.

Use:

`main → feature branch → commit → push → pull request → teammate review → merge`

Every pull request should have a clear description of what changed and any known limitations.

## User Experience

Every important user journey should account for:

- Loading states
- Empty states
- Error states
- Responsive layouts
- Keyboard accessibility
- Clear feedback after important actions

Keep the interface simple and focused on helping students organize their academic work.

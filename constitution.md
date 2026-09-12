# StudyHub Constitution

This constitution governs StudyHub, a web application that helps college students
organize courses, assignments, deadlines, and study resources in one place.

## Core Principles

### I. Student-Centered Organization
Features MUST reduce the cognitive load of managing academic work. Course, assignment,
study-resource, and deadline concepts MUST remain clear and consistent across views.
User flows SHOULD support quick capture, reliable retrieval, and visible next actions.
Accessibility, fully responsive behavior, and useful empty and loading states are
product requirements, not polish to defer.

### II. Type-Safe TypeScript
The project MUST use TypeScript in strict mode. The type `any` is forbidden, including
implicit `any`; use precise types, generics, `unknown` with narrowing, or discriminated
unions instead. Data crossing a trust boundary MUST be validated before use. Shared
domain types SHOULD have one authoritative definition and MUST avoid duplicating the
same shape across features.

### III. Next.js App Router by Default
The application MUST use Next.js App Router and file-based routing. Routes, layouts,
loading states, error states, and metadata SHOULD follow the App Router conventions.
Components MUST be server components by default. A component MAY use the `use client`
directive only when it needs browser APIs, local interaction state, event handlers, or
client-only libraries. Server components MUST own data fetching and sensitive logic
where practical; client components MUST receive only the data and behavior they need.
Authentication and authorization checks MUST occur on the server before protected data
is read or mutated.

### IV. Utility-First Interface
Tailwind CSS is the required styling system. Styling MUST be utility-first and follow
the existing design tokens and responsive conventions. Custom CSS SHOULD be avoided and
is permitted only when Tailwind utilities, configuration, or component composition
cannot express the requirement cleanly. Repeated UI patterns SHOULD become focused,
accessible components rather than copied class strings.

### V. Tested User Journeys
Every feature MUST include tests appropriate to its risk. Unit tests MUST cover domain
logic and meaningful transformations. Component tests MUST cover important interaction
and accessibility behavior. Integration or end-to-end tests MUST cover critical student
journeys such as creating an assignment, viewing upcoming deadlines, and finding a
study resource. Tests SHOULD assert observable behavior rather than implementation
details. A change is not complete while its relevant tests, type checks, or lint checks
fail.

### VI. Accessible and Resilient UX
Interactive controls MUST be keyboard accessible, have appropriate semantic elements
and accessible names, and preserve usable focus states. Pages MUST handle loading,
empty, error, and offline or failed-request states deliberately. Destructive actions
MUST be clear and recoverable where practical. Responsive layouts MUST remain fully
usable across supported mobile, tablet, desktop, and large desktop viewports. Content
MUST reflow without horizontal scrolling, clipped controls, or overlapping text, and
touch targets MUST remain usable on touch devices.

### VII. Small, Reviewable Changes
Implementations SHOULD use the simplest design that meets the requirement. Avoid
premature abstractions, speculative features, and unrelated refactors. Each change
SHOULD have one clear purpose, explain notable tradeoffs in its pull request, and be
small enough for a teammate to review confidently.

## Technical Standards

- **Required stack**: Next.js with App Router, TypeScript, Tailwind CSS, MongoDB, and
	Auth.js with Google authentication.
- **TypeScript**: `strict` MUST be enabled in `tsconfig.json`; `any` MUST NOT be used.
- **Routing**: Route segments, layouts, and route handlers MUST use the `app/` file-based
	structure. Route-specific UI SHOULD stay near its route; shared UI belongs in a
	clearly named shared component area.
- **Rendering**: Prefer server components and server-side data access. Add client
	boundaries narrowly and document the reason in the component structure or review.
- **Styling**: Prefer Tailwind utilities and shared configuration. Custom CSS is an
	exception requiring a concrete limitation or browser behavior that justifies it.
- **Authentication**: Auth.js with Google authentication MUST be the authentication
	mechanism unless an approved amendment changes this requirement. Protected routes and
	server actions MUST verify the authenticated session before accessing user data.
- **MongoDB ownership**: Every user-owned MongoDB read, update, and delete query MUST
	constrain the filter by the authenticated user's stable identity, such as `userId`.
	Updates and deletes MUST never rely on a document identifier alone. Ownership checks
	MUST be enforced server-side and covered by tests that prove one user cannot access or
	mutate another user's records.
- **Data safety**: Do not expose secrets or privileged data to client components. Validate
	user input at the boundary and authorize access on the server. MongoDB connections
	MUST be reused through the repository's established connection pattern and MUST NOT
	be created per request without a documented reason.
- **Secrets**: Database URIs, Auth.js secrets, Google client credentials, and other
	sensitive values MUST be supplied through environment variables or the deployment
	secret manager. Secrets MUST NOT be committed, hard-coded, logged, or exposed through
	client-public environment variables. Required environment variables MUST be documented
	without including their values.
- **Responsive delivery**: Every page and reusable component MUST be checked at mobile,
	tablet, desktop, and large desktop breakpoints. Layouts MUST use responsive Tailwind
	utilities and maintain readable content, usable controls, and accessible focus states
	at each supported viewport.
- **Performance**: Avoid unnecessary client JavaScript, duplicate requests, and unbounded
	list rendering. Use framework loading and caching behavior intentionally.

## Naming and Code Organization

- React components and component files use `PascalCase` (for example, `CourseCard.tsx`).
- Functions, variables, hooks, and utilities use `camelCase`; hooks begin with `use`.
- Types, interfaces, and enums use `PascalCase`; constants use `UPPER_SNAKE_CASE` only
	for true module-level constants.
- Folders and route segments use lowercase kebab-case when a multiword name is needed.
- Tests use the name of the behavior or module they cover and live beside the feature or
	in the established test directory, following the repository's existing convention.
- Names MUST describe domain intent. Avoid vague names such as `data`, `utils`, or
	`helper` when a more specific name is available.

## Development Workflow and Quality Gates

- Before opening a pull request, contributors MUST run the repository's formatter,
	linter, type checker, and relevant test suites.
- Pull requests MUST describe user impact, implementation notes, test evidence, and any
	follow-up work. Screenshots or recordings SHOULD accompany meaningful UI changes.
- At least one teammate MUST review changes affecting shared components, data access,
	authentication, routing, or the design system.
- Reviewers MUST check constitution compliance, accessibility, responsive behavior, error
	states, and whether server/client boundaries are justified.
- Commits SHOULD be focused and use clear imperative messages. Contributors MUST avoid
	committing secrets, generated build output, or unrelated formatting churn.
- When a requirement conflicts with this constitution, the pull request MUST identify
	the conflict, explain the smallest justified exception, and record the decision.

## Governance

This constitution is the governing standard for product and engineering decisions in
this repository. Feature plans and pull requests MUST include a constitution check.
Amendments require a documented rationale, review by the project maintainers, and an
assessment of affected features, tests, and documentation. When this constitution is
updated, the version and amendment date MUST change. Existing work may be grandfathered
only when the amendment explicitly says so; new work follows the latest version.

**Version**: 1.1.0 | **Ratified**: 2026-09-11 | **Last Amended**: 2026-09-11

import type { Metadata } from 'next';
import Link from 'next/link';



export const metadata: Metadata = {
  title: 'Courses',
  description: 'All the courses you are enrolled in.',
};


export default function CoursesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-dark-text sm:text-3xl">
            My Courses
          </h1>
          <p className="mt-1 text-sm text-muted sm:text-base">
            All your enrolled classes in one place.
          </p>
        </div>

        {/* Placeholder only — not wired up yet */}
        <Link
          href="/courses/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Course
        </Link>
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-primary bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-sm font-bold text-primary">
              C1
            </span>
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              CS 101
            </span>
          </div>
          <p className="mt-3 text-base font-semibold text-dark-text">Course Name 1</p>
          <p className="mt-1.5 text-sm text-muted">
            A short description of what this course covers goes here.
          </p>
          <div className="mt-4 flex items-center justify-between border-t-2 border-stone-100 pt-3">
            <Link
              href="/courses/1"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary-light hover:text-primary-hover"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
              </svg>
              Edit
            </Link>
            {/* Placeholder only — delete isn't wired up yet */}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-danger transition-colors hover:bg-danger-light"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-accent bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-sm font-bold text-accent">
              C2
            </span>
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              ENG 316
            </span>
          </div>
          <p className="mt-3 text-base font-semibold text-dark-text">Course Name 2</p>
          <p className="mt-1.5 text-sm text-muted">
            A short description of what this course covers goes here.
          </p>
          <div className="mt-4 flex items-center justify-between border-t-2 border-stone-100 pt-3">
            <Link
              href="/courses/2"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary-light hover:text-primary-hover"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
              </svg>
              Edit
            </Link>
            {/* Placeholder only — delete isn't wired up yet */}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-danger transition-colors hover:bg-danger-light"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-primary bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-sm font-bold text-primary">
              C3
            </span>
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              MATH 225
            </span>
          </div>
          <p className="mt-3 text-base font-semibold text-dark-text">Course Name 3</p>
          <p className="mt-1.5 text-sm text-muted">
            A short description of what this course covers goes here.
          </p>
          <div className="mt-4 flex items-center justify-between border-t-2 border-stone-100 pt-3">
            <Link
              href="/courses/3"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary-light hover:text-primary-hover"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
              </svg>
              Edit
            </Link>
            {/* Placeholder only — delete isn't wired up yet */}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-danger transition-colors hover:bg-danger-light"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-accent bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-sm font-bold text-accent">
              C4
            </span>
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              IT 301
            </span>
          </div>
          <p className="mt-3 text-base font-semibold text-dark-text">Course Name 4</p>
          <p className="mt-1.5 text-sm text-muted">
            A short description of what this course covers goes here.
          </p>
          <div className="mt-4 flex items-center justify-between border-t-2 border-stone-100 pt-3">
            <Link
              href="/courses/4"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary-light hover:text-primary-hover"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
              </svg>
              Edit
            </Link>
            {/* Placeholder only — delete isn't wired up yet */}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-danger transition-colors hover:bg-danger-light"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-primary bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-sm font-bold text-primary">
              C5
            </span>
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              HIST 120
            </span>
          </div>
          <p className="mt-3 text-base font-semibold text-dark-text">Course Name 5</p>
          <p className="mt-1.5 text-sm text-muted">
            A short description of what this course covers goes here.
          </p>
          <div className="mt-4 flex items-center justify-between border-t-2 border-stone-100 pt-3">
            <Link
              href="/courses/5"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary-light hover:text-primary-hover"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
              </svg>
              Edit
            </Link>
            {/* Placeholder only — delete isn't wired up yet */}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-danger transition-colors hover:bg-danger-light"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-accent bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-sm font-bold text-accent">
              C6
            </span>
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              ART 150
            </span>
          </div>
          <p className="mt-3 text-base font-semibold text-dark-text">Course Name 6</p>
          <p className="mt-1.5 text-sm text-muted">
            A short description of what this course covers goes here.
          </p>
          <div className="mt-4 flex items-center justify-between border-t-2 border-stone-100 pt-3">
            <Link
              href="/courses/6"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary-light hover:text-primary-hover"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
              </svg>
              Edit
            </Link>
            {/* Placeholder only — delete isn't wired up yet */}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-danger transition-colors hover:bg-danger-light"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
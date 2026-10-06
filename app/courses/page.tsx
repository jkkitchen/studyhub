import type { Metadata } from 'next';



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
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Course
        </button>
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
          <p className="mt-0.5 text-sm text-muted">Instructor Name</p>
          <div className="mt-4 flex items-center gap-4 border-t-2 border-stone-100 pt-3 text-xs font-medium text-muted">
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              3 assignments
            </span>
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
              </svg>
              5 resources
            </span>
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
          <p className="mt-0.5 text-sm text-muted">Instructor Name</p>
          <div className="mt-4 flex items-center gap-4 border-t-2 border-stone-100 pt-3 text-xs font-medium text-muted">
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              1 assignment
            </span>
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
              </svg>
              2 resources
            </span>
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
          <p className="mt-0.5 text-sm text-muted">Instructor Name</p>
          <div className="mt-4 flex items-center gap-4 border-t-2 border-stone-100 pt-3 text-xs font-medium text-muted">
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              4 assignments
            </span>
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
              </svg>
              3 resources
            </span>
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
          <p className="mt-0.5 text-sm text-muted">Instructor Name</p>
          <div className="mt-4 flex items-center gap-4 border-t-2 border-stone-100 pt-3 text-xs font-medium text-muted">
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              2 assignments
            </span>
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
              </svg>
              6 resources
            </span>
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
          <p className="mt-0.5 text-sm text-muted">Instructor Name</p>
          <div className="mt-4 flex items-center gap-4 border-t-2 border-stone-100 pt-3 text-xs font-medium text-muted">
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              0 assignments
            </span>
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
              </svg>
              4 resources
            </span>
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
          <p className="mt-0.5 text-sm text-muted">Instructor Name</p>
          <div className="mt-4 flex items-center gap-4 border-t-2 border-stone-100 pt-3 text-xs font-medium text-muted">
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              2 assignments
            </span>
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
              </svg>
              1 resource
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
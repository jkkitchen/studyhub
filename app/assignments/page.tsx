import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Assignments',
  description: 'All your assignments across every course, ranked by due date.',
};


export default function AssignmentsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-dark-text sm:text-3xl">
            Assignments
          </h1>
          <p className="mt-1 text-sm text-muted sm:text-base">
            Everything due, soonest first.
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
          Add Assignment
        </button>
      </div>

      {/* Assignments list */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger-light text-danger">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h2V3a1 1 0 0 1 1-1Z" />
              <path d="M9 11h6M9 15h4" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-dark-text">Assignment Name 1</p>
              <span className="shrink-0 rounded-full bg-danger-light px-3 py-1.5 text-xs font-semibold text-danger">
                Due soonest
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted">Course Name</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="rounded-full bg-background px-2.5 py-1 text-muted">Essay</span>
              <span className="text-subtle">20 points</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h2V3a1 1 0 0 1 1-1Z" />
              <path d="M9 11h6M9 15h4" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-dark-text">Assignment Name 2</p>
              <span className="shrink-0 rounded-full bg-accent-light px-3 py-1.5 text-xs font-semibold text-primary-hover">
                Due date
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted">Course Name</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="rounded-full bg-background px-2.5 py-1 text-muted">Quiz</span>
              <span className="text-subtle">10 points</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h2V3a1 1 0 0 1 1-1Z" />
              <path d="M9 11h6M9 15h4" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-dark-text">Assignment Name 3</p>
              <span className="shrink-0 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary-hover">
                Due date
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted">Course Name</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="rounded-full bg-background px-2.5 py-1 text-muted">Project</span>
              <span className="text-subtle">50 points</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h2V3a1 1 0 0 1 1-1Z" />
              <path d="M9 11h6M9 15h4" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-dark-text">Assignment Name 4</p>
              <span className="shrink-0 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary-hover">
                Due date
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted">Course Name</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="rounded-full bg-background px-2.5 py-1 text-muted">Reading</span>
              <span className="text-subtle">5 points</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h2V3a1 1 0 0 1 1-1Z" />
              <path d="M9 11h6M9 15h4" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-dark-text">Assignment Name 5</p>
              <span className="shrink-0 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary-hover">
                Due date
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted">Course Name</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="rounded-full bg-background px-2.5 py-1 text-muted">Lab</span>
              <span className="text-subtle">30 points</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h2V3a1 1 0 0 1 1-1Z" />
              <path d="M9 11h6M9 15h4" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-dark-text">Assignment Name 6</p>
              <span className="shrink-0 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary-hover">
                Due date
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted">Course Name</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="rounded-full bg-background px-2.5 py-1 text-muted">Discussion</span>
              <span className="text-subtle">15 points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Resources',
  description: 'All your study resources, ordered by when you last opened them.',
};


export default function ResourcesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-dark-text sm:text-3xl">
            Resources
          </h1>
          <p className="mt-1 text-sm text-muted sm:text-base">
            Notes, links, and recordings, most recently opened first.
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
          Add Resource
        </button>
      </div>

      {/* Resources list */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
              <path d="M14 3v5h5" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-dark-text">Resource Name 1</p>
            <p className="text-sm text-muted">Course Name</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              Document
            </span>
            <span className="text-xs text-subtle">Accessed recently</span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.07 0l2-2a5 5 0 0 0-7.07-7.07l-1 1" />
              <path d="M14 11a5 5 0 0 0-7.07 0l-2 2a5 5 0 0 0 7.07 7.07l1-1" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-dark-text">Resource Name 2</p>
            <p className="text-sm text-muted">Course Name</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              Link
            </span>
            <span className="text-xs text-subtle">Accessed earlier</span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M10 9.5v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-dark-text">Resource Name 3</p>
            <p className="text-sm text-muted">Course Name</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              Video
            </span>
            <span className="text-xs text-subtle">Accessed earlier</span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.07 0l2-2a5 5 0 0 0-7.07-7.07l-1 1" />
              <path d="M14 11a5 5 0 0 0-7.07 0l-2 2a5 5 0 0 0 7.07 7.07l1-1" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-dark-text">Resource Name 4</p>
            <p className="text-sm text-muted">Course Name</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              Link
            </span>
            <span className="text-xs text-subtle">Accessed earlier</span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
              <path d="M14 3v5h5" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-dark-text">Resource Name 5</p>
            <p className="text-sm text-muted">Course Name</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              Document
            </span>
            <span className="text-xs text-subtle">Accessed earlier</span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M10 9.5v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-dark-text">Resource Name 6</p>
            <p className="text-sm text-muted">Course Name</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
              Video
            </span>
            <span className="text-xs text-subtle">Accessed earlier</span>
          </div>
        </div>
      </div>
    </div>
  );
}
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your courses, assignments, and study resources at a glance.',
};



export default function DashboardPage() {
  return (
    <main className='flex-1 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Section 1: Welcome + search */}
      <section className='rounded-2xl border-2 border-stone-200 bg-surface p-6 shadow-sm sm:p-8'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-4'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
                Welcome back, <span className='text-primary'>[User Name]</span>!
              </h1>
              <p className='mt-1 text-sm text-muted sm:text-base'>
                Here&apos;s what&apos;s on your plate.
              </p>
            </div>
          </div>

          {/* Placeholder only — search isn't wired up yet */}
          <div className='relative w-full md:w-80'>
            <svg
              aria-hidden='true'
              viewBox='0 0 24 24'
              className='pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='7' />
              <path d='M21 21l-4.3-4.3' />
            </svg>
            <input
              type='text'
              placeholder='Search courses, assignments, resources...'
              className='w-full rounded-lg border-2 border-stone-200 bg-background py-2.5 pl-10 pr-4 text-sm text-dark-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none'
            />
          </div>
        </div>
      </section>



      {/* Section 2: Courses */}
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-dark-text sm:text-2xl'>
            Courses
          </h2>
          <a
            href='/courses'
            className='text-sm font-semibold text-primary hover:text-primary-hover'
          >
            View all
          </a>
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-primary bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-sm font-bold text-primary'>
              C1
            </span>
            <p className='mt-3 font-semibold text-dark-text'>Course Name 1</p>
            <p className='text-sm text-muted'>Description Name</p>
          </div>
          <div className='rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-accent bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light text-sm font-bold text-accent'>
              C2
            </span>
            <p className='mt-3 font-semibold text-dark-text'>Course Name 2</p>
            <p className='text-sm text-muted'>Description Name</p>
          </div>
          <div className='rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-primary bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-sm font-bold text-primary'>
              C3
            </span>
            <p className='mt-3 font-semibold text-dark-text'>Course Name 3</p>
            <p className='text-sm text-muted'>Description Name</p>
          </div>
          <div className='rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-accent bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light text-sm font-bold text-accent'>
              C4
            </span>
            <p className='mt-3 font-semibold text-dark-text'>Course Name 4</p>
            <p className='text-sm text-muted'>Description Name</p>
          </div>
        </div>
      </section>



      {/* Section 3: Assignments */}
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-dark-text sm:text-2xl'>
            Assignments
          </h2>
          <a
            href='/assignments'
            className='text-sm font-semibold text-primary hover:text-primary-hover'
          >
            View all
          </a>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <div className='flex items-center gap-4'>
              <span
                aria-hidden='true'
                className='h-2.5 w-2.5 shrink-0 rounded-full bg-danger'
              />
              <div>
                <p className='font-semibold text-dark-text'>
                  Assignment Name 1
                </p>
                <p className='text-sm text-muted'>Course Name</p>
              </div>
            </div>
            <span className='shrink-0 rounded-full bg-danger-light px-3 py-1.5 text-xs font-semibold text-danger'>
              Due soonest
            </span>
          </div>
          <div className='flex items-center justify-between gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <div className='flex items-center gap-4'>
              <span
                aria-hidden='true'
                className='h-2.5 w-2.5 shrink-0 rounded-full bg-accent'
              />
              <div>
                <p className='font-semibold text-dark-text'>
                  Assignment Name 2
                </p>
                <p className='text-sm text-muted'>Course Name</p>
              </div>
            </div>
            <span className='shrink-0 rounded-full bg-accent-light px-3 py-1.5 text-xs font-semibold text-primary-hover'>
              Due date
            </span>
          </div>
          <div className='flex items-center justify-between gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <div className='flex items-center gap-4'>
              <span
                aria-hidden='true'
                className='h-2.5 w-2.5 shrink-0 rounded-full bg-primary'
              />
              <div>
                <p className='font-semibold text-dark-text'>
                  Assignment Name 3
                </p>
                <p className='text-sm text-muted'>Course Name</p>
              </div>
            </div>
            <span className='shrink-0 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary-hover'>
              Due date
            </span>
          </div>
          <div className='flex items-center justify-between gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <div className='flex items-center gap-4'>
              <span
                aria-hidden='true'
                className='h-2.5 w-2.5 shrink-0 rounded-full bg-primary'
              />
              <div>
                <p className='font-semibold text-dark-text'>
                  Assignment Name 4
                </p>
                <p className='text-sm text-muted'>Course Name</p>
              </div>
            </div>
            <span className='shrink-0 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary-hover'>
              Due date
            </span>
          </div>
        </div>
      </section>



      {/* Section 4: Resources */}
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-dark-text sm:text-2xl'>
            Resources
          </h2>
          <a
            href='/resources'
            className='text-sm font-semibold text-primary hover:text-primary-hover'
          >
            View all
          </a>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <div className='min-w-0 flex-1'>
              <p className='truncate font-semibold text-dark-text'>
                Resource Name 1
              </p>
              <p className='text-sm text-muted'>Course Name</p>
            </div>
            <span className='shrink-0 text-xs font-medium text-subtle'>
              Accessed recently
            </span>
          </div>
          <div className='flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <div className='min-w-0 flex-1'>
              <p className='truncate font-semibold text-dark-text'>
                Resource Name 2
              </p>
              <p className='text-sm text-muted'>Course Name</p>
            </div>
            <span className='shrink-0 text-xs font-medium text-subtle'>
              Accessed earlier
            </span>
          </div>
          <div className='flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
            <div className='min-w-0 flex-1'>
              <p className='truncate font-semibold text-dark-text'>
                Resource Name 3
              </p>
              <p className='text-sm text-muted'>Course Name</p>
            </div>
            <span className='shrink-0 text-xs font-medium text-subtle'>
              Accessed earlier
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
import Link from 'next/link';



export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className='border-t-2 border-stone-200 bg-[var(--background)]'>
      <div className='mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
        <div>
          <Link
            href='/'
            className='rounded-md text-lg font-bold tracking-tight text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]'
          >
            StudyHub
          </Link>
          <p className='mt-1 text-sm text-[var(--text-muted)]'>
            Organize your courses, assignments, and study resources.
          </p>
        </div>

        <p className='text-sm text-[var(--text-muted)]'>
          &copy; {currentYear} StudyHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
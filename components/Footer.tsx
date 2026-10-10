import Link from 'next/link';



export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className='border-t-2 border-stone-200 bg-background'>
      <div className='mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
        <div>
          <Link
            href='/'
            className='rounded-md text-lg font-bold tracking-tight text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
          >
            StudyHub
          </Link>
          <p className='mt-1 text-sm text-muted'>
            Organize your courses, assignments, and study resources.
          </p>
        </div>

        <p className='text-sm text-muted'>
          &copy; {currentYear} StudyHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCourses } from '@/lib/db';
import ResourceList from '@/components/ResourceList';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'All your study resources, ordered by when you last opened them.',
};

export default async function ResourcesPage() {
  //Data Fetching
  const courses = await getCourses(); //Need this to display Course Code on Resource Card

  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Page header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
            Resources
          </h1>
          <p className='mt-1 text-sm text-muted sm:text-base'>
            Notes, links, and recordings, most recently opened first.
          </p>
        </div>

        {/* Add Resource Link*/}
        <Link
          href='/resources/new'
          className='inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover'
        >
          <svg
            aria-hidden='true'
            viewBox='0 0 24 24'
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M12 5v14M5 12h14' />
          </svg>
          Add Resource
        </Link>
      </div>

      {/* Resource sections will be rendered by the client component */}
      <ResourceList
        courses={courses.map((course) => ({
          id: course._id.toString(),
          code: course.code,
        }))}
      />
    </div>
  );
}
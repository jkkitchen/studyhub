import type { Metadata } from 'next';
import Link from 'next/link';
import { getResources, getCourses } from '@/lib/db';
import ResourceCard from '@/components/ResourceCard';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'All your study resources, ordered by when you last opened them.',
};

export default async function ResourcesPage() {
  //Data Fetching
  const resources = await getResources();
  const courses = await getCourses(); //Need this to display Course Code on Resource Card

  //Separate resources by type: Note, Link, File
  const linkResources = resources.filter(
    (resource) => resource.type === 'link'
  );

  const noteResources = resources.filter(
    (resource) => resource.type === 'note'
  );

  const fileResources = resources.filter(
    (resource) => resource.type === 'file'
  );

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

      {/* Links section */}
      {/* Links section */}
      <section>
        <h2 className='mb-4 text-xl font-bold text-dark-text'>Links</h2>

        {linkResources.length === 0 ? (
          <p className='text-sm text-muted'>No links added yet.</p>
        ) : (
          <div className='flex flex-col gap-3'>
            {linkResources.map((resource) => {
              const course = courses.find(
                (course) =>
                  course._id.toString() === resource.courseId.toString()
              );

              return (
                <ResourceCard
                  key={resource._id.toString()}
                  resource={resource}
                  courseCode={course?.code ?? 'Unknown Course'}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Notes section */}
      <section>
        <h2 className='mb-4 text-xl font-bold text-dark-text'>Notes</h2>

        {noteResources.length === 0 ? (
          <p className='text-sm text-muted'>No notes added yet.</p>
        ) : (
          <div className='flex flex-col gap-3'>
            {noteResources.map((resource) => {
              const course = courses.find(
                (course) =>
                  course._id.toString() === resource.courseId.toString()
              );

              return (
                <ResourceCard
                  key={resource._id.toString()}
                  resource={resource}
                  courseCode={course?.code ?? 'Unknown Course'}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Files section */}
      <section>
        <h2 className='mb-4 text-xl font-bold text-dark-text'>Files</h2>

        {fileResources.length === 0 ? (
          <p className='text-sm text-muted'>No files added yet.</p>
        ) : (
          <div className='flex flex-col gap-3'>
            {fileResources.map((resource) => {
              const course = courses.find(
                (course) =>
                  course._id.toString() === resource.courseId.toString()
              );

              return (
                <ResourceCard
                  key={resource._id.toString()}
                  resource={resource}
                  courseCode={course?.code ?? 'Unknown Course'}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
import { getResourceById, getCourseById } from '@/lib/db';

import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

//Get Resource id from the URL params
interface ResourceByIdPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResourceByIdPage({
  params,
}: ResourceByIdPageProps) {
  const { id } = await params;

  //Get the resource from the database
  const resource = await getResourceById(id);

  // Get the course associated with this resource
  const course = await getCourseById(resource.courseId.toString());

  //Page Content
  return (
    <main className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Resource heading and course */}
      <div>
        {/* Back link */}
        <Link
          href='/resources'
          className='inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover'
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
            <path d='M15 18l-6-6 6-6' />
          </svg>
          Back to Resources
        </Link>

        <h1 className='mt-3 text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
          {resource.title}
        </h1>
        <h2>
          {course.code} - {course.name}
        </h2>

        {/* Resource details */}
        <div className='py-6'>
          <p className='text-sm text-muted sm:text-base'>
            Resource Type: {resource.type}
          </p>

          <p className='mt-2 text-sm text-muted sm:text-base'>
            {resource.content}
          </p>
        </div>

        {/* Edit and Delete buttons */}
        <div className='mt-4 flex flex-wrap items-center justify-around gap-3'>
          <Link
            href={`/resources/${id}/edit`}
            className='inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            Edit Resource
          </Link>

          <DeleteButton id={id} type='resource' />
        </div>
      </div>
    </main>
  );
}
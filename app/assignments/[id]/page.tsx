import { getAssignmentById, getCourseById } from '@/lib/db';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

//Get Assignment id from the URL params
interface AssignmentByIdPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AssignmentByIdPage({
  params,
}: AssignmentByIdPageProps) {
  const { id } = await params;

  //Get the assignment from the database
  const assignment = await getAssignmentById(id);

  // Get the course associated with this assignment
  const course = await getCourseById(assignment.courseId.toString());

  //Page Content
  return (
    <main className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Assignment heading and course */}
      <div>
        {/* Back link */}
        <Link
          href='/assignments'
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
          Back to Assignments
        </Link>

        <h1 className='mt-3 text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
          {assignment.title}
        </h1>
        <h2>
          {course.code} - {course.name}
        </h2>

        {/* Assignment details */}
        <div className='py-6'>
          <p className='text-sm text-muted sm:text-base'>
            {assignment.description}
          </p>

          <p className='mt-2 text-sm text-muted sm:text-base'>
            Due Date:{' '}
            {assignment.dueDate
              ? assignment.dueDate.toLocaleDateString()
              : 'No due date'}
          </p>

          <p className='mt-2 text-sm text-muted sm:text-base'>
            Status: {assignment.completed ? 'Completed' : 'Not Completed'}
          </p>
        </div>

        {/* Edit and Delete buttons */}
        <div className='mt-4 flex flex-wrap items-center justify-around gap-3'>
          <Link
            href={`/assignments/${id}/edit`}
            className='inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            Edit Assignment
          </Link>

          <DeleteButton id={id} type='assignment' />
        </div>
      </div>
    </main>
  );
}
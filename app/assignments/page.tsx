import type { Metadata } from 'next';
import Link from 'next/link';
import { getAssignments, getCourses } from '@/lib/db';
import AssignmentCard from '@/components/AssignmentCard';

export const metadata: Metadata = {
  title: 'Assignments',
  description: 'All your assignments across every course, ranked by due date.',
};

export default async function AssignmentsPage() {
  //Data Fetching
  const assignments = await getAssignments();
  const courses = await getCourses(); //Need this to display Course Code on Assignment Card

  //Separate assignments into two sections: Complete and Incomplete
  const incompleteAssignments = assignments.filter(
    (assignment) => !assignment.completed
  );

  const completedAssignments = assignments.filter(
    (assignment) => assignment.completed
  );

  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Page header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
            Assignments
          </h1>
          <p className='mt-1 text-sm text-muted sm:text-base'>
            Everything due, soonest first.
          </p>
        </div>

        {/* Add Assignment Link */}
        <Link
          href='/assignments/new'
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
          Add Assignment
        </Link>
      </div>

      {/* Incomplete assignments */}
      <section>
        <h2 className='mb-4 text-xl font-bold text-dark-text'>Incomplete</h2>

        <div className='flex flex-col gap-3'>
          {incompleteAssignments.map((assignment) => {
            const course = courses.find(
              (course) =>
                course._id.toString() === assignment.courseId.toString()
            );

            return (
              <AssignmentCard
                key={assignment._id.toString()}
                assignment={assignment}
                courseCode={course?.code ?? 'Unknown Course'}
                showStatus
              />
            );
          })}
        </div>
      </section>

      {/* Complete assignments */}
      <section>
        <h2 className='mb-4 text-xl font-bold text-dark-text'>Complete</h2>

        <div className='flex flex-col gap-3'>
          {completedAssignments.map((assignment) => {
            const course = courses.find(
              (course) =>
                course._id.toString() === assignment.courseId.toString()
            );

            return (
              <AssignmentCard
                key={assignment._id.toString()}
                assignment={assignment}
                courseCode={course?.code ?? 'Unknown Course'}
                showStatus
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
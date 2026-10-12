import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getFilteredAssignments,
  getAssignmentsTotalPages,
  getCourses,
} from '@/lib/db';

import AssignmentCard from '@/components/AssignmentCard';
import { Search } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Assignments',
  description: 'All your assignments across every course, ranked by due date.',
};

export default async function AssignmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  // Get the search term and page number from the URL
  const params = await searchParams;
  const query = params.query || '';
  const currentPage = Math.max(1, Math.floor(Number(params.page) || 1));

  // Get matching assignments, total pages, and courses
  const [assignments, totalPages, courses] = await Promise.all([
    getFilteredAssignments(query, currentPage),
    getAssignmentsTotalPages(query),
    getCourses(), //Need this to display course code on assignment cards
  ]);

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

      {/* Search assignments */}
      <div className='mb-6 w-full'>
        <Suspense fallback={null}>
          <Search />
        </Suspense>
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

      {/* Pagination */}
      <div className='mt-8 flex justify-center'>
        <Suspense fallback={null}>
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
      
    </div>
  );
}
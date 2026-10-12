import type { Metadata } from 'next';
import Link from 'next/link';
import CourseCard from '@/components/CourseCard';
import { getFilteredCourses, getCoursesTotalPages } from '@/lib/db';
import { Search } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { Suspense } from 'react'; //A React component that allows you to display temporary content while another component is waiting to finish rendering.

export const metadata: Metadata = {
  title: 'Courses',
  description: 'All the courses you are enrolled in.',
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;

  const query = params.query || '';
  const currentPage = Math.max(1, Math.floor(Number(params.page) || 1));

  //getFilteredCourses works the same as getCourses when nothing is entered in the search bar
  const [courses, totalPages] = await Promise.all([
    getFilteredCourses(query, currentPage),
    getCoursesTotalPages(query),
  ]);

  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Page header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
            My Courses
          </h1>
          <p className='mt-1 text-sm text-muted sm:text-base'>
            All your enrolled classes in one place.
          </p>
        </div>

        {/* Link to Add Course Form */}
        <Link
          href='/courses/new'
          className='inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
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
          Add Course
        </Link>
      </div>

      {/* Search courses */}
      <Suspense fallback={<div>Loading search...</div>}>
        <Search />
      </Suspense>

      {/* Courses grid */}
      {courses.length === 0 ? (
        <p className='text-sm text-muted'>
          You haven&apos;t added any courses yet. Click Add Course to get
          started!
        </p>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {courses.map((course) => (
            <CourseCard key={course._id.toString()} course={course} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </div>
  );
}

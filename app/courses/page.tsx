import type { Metadata } from 'next';
import Link from 'next/link';
import CourseCard from '@/components/CourseCard';
import { getCourses } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'All the courses you are enrolled in.',
};

export default async function CoursesPage() {
  //Get courses
  const courses = await getCourses();

  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
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
    </div>
  );
}
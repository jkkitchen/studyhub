import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getCourses, getAssignments, getResources } from '@/lib/db';
import AssignmentCard from '@/components/AssignmentCard';
import ResourceCard from '@/components/ResourceCard';
import CourseCard from '@/components/CourseCard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your courses, assignments, and study resources at a glance.',
};


export default async function DashboardPage() {
  // USER AUTHENTICATION
  // Only authenticated users can access the dashboard.
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  // DATA FETCHING
  // Keep all courses available for looking up course codes on assignment and resource cards.
  const [allCourses, allAssignments, allResources] = await Promise.all([
    getCourses(),
    getAssignments(),
    getResources(),
  ]);
  const courses = allCourses.slice(0, 4); // Display only the first four courses.
  const assignments = allAssignments
    .filter((assignment) => !assignment.completed) // Show only incomplete assignments.
    .slice(0, 4); // Display only the first four assignments.
  const resources = allResources.slice(0, 4); // Display only the first four resources.

  const emailUsername = session?.user?.email
    ?.split('@')[0]
    ?.replace(/[._-]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
  const userName = session?.user?.name?.trim() || emailUsername || 'there';

  // PAGE CONTENT
  return (
    <main className='flex-1 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Section 1: Welcome + search */}
      <section className='rounded-2xl border-2 border-stone-200 bg-surface p-6 shadow-sm sm:p-8'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-4'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
                Welcome back, <span className='text-primary'>{userName}</span>!
              </h1>
              <p className='mt-1 text-sm text-muted sm:text-base'>
                Here&apos;s what&apos;s on your plate.
              </p>
            </div>
          </div>

          {/* Placeholder only — search isn't wired up yet */}
          <div className='relative w-full md:w-80'>
            <svg
              aria-hidden='true'
              viewBox='0 0 24 24'
              className='pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='7' />
              <path d='M21 21l-4.3-4.3' />
            </svg>
            <input
              type='text'
              placeholder='Search courses, assignments, resources...'
              className='w-full rounded-lg border-2 border-stone-200 bg-background py-2.5 pl-10 pr-4 text-sm text-dark-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none'
            />
          </div>
        </div>
      </section>

      {/* Section 2: Courses */}
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-dark-text sm:text-2xl'>
            Courses
          </h2>
          <a
            href='/courses'
            className='text-sm font-semibold text-primary hover:text-primary-hover'
          >
            View all
          </a>
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {courses.map((course) => (
            <CourseCard key={course._id.toString()} course={course} />
          ))}
        </div>
      </section>

      {/* Section 3: Assignments */}
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-dark-text sm:text-2xl'>
            Assignments
          </h2>
          <a
            href='/assignments'
            className='text-sm font-semibold text-primary hover:text-primary-hover'
          >
            View all
          </a>
        </div>
        <div className='flex flex-col gap-3'>
          {assignments.map((assignment) => {
            const course = allCourses.find(
              (course) =>
                course._id.toString() === assignment.courseId.toString()
            );

            return (
              <AssignmentCard
                key={assignment._id.toString()}
                assignment={assignment}
                courseCode={course?.code ?? 'Unknown Course'}
              />
            );
          })}
        </div>
      </section>

      {/* Section 4: Resources */}
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-dark-text sm:text-2xl'>
            Resources
          </h2>
          <a
            href='/resources'
            className='text-sm font-semibold text-primary hover:text-primary-hover'
          >
            View all
          </a>
        </div>
        <div className='flex flex-col gap-3'>
          {resources.map((resource) => {
            const course = allCourses.find(
              (course) => course._id.toString() === resource.courseId.toString()
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
      </section>
    </main>
  );
}
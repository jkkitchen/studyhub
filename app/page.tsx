import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getCourses, getAssignments, getResources } from '@/lib/db';
import AssignmentCard from '@/components/AssignmentCard';
import ResourceCard from '@/components/ResourceCard';
import CourseCard from '@/components/CourseCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your courses, assignments, and study resources at a glance.',
};

export default async function DashboardPage() {
  //USER AUTHENTICATION
  //Get the user session data from auth
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  // DATA FETCHING
  const allCourses = await getCourses();

  // Display up to 4 items in each dashboard section
  const courses = allCourses.slice(0, 4);

  const assignments = (await getAssignments())
    .filter((assignment) => !assignment.completed)
    .slice(0, 4);

  const resources = (await getResources()).slice(0, 4);

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
      {/* Section 1: Welcome */}
      <section className='rounded-2xl border-2 border-stone-200 bg-surface p-6 shadow-sm sm:p-8'>
        <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
          Welcome back, <span className='text-primary'>{userName}</span>!
        </h1>
        <p className='mt-1 text-sm text-muted sm:text-base'>
          Here&apos;s what&apos;s on your plate.
        </p>
      </section>

      {/* Section 2: Courses */}
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-dark-text sm:text-2xl'>
            Courses
          </h2>
          <Link
            href='/courses'
            className='text-sm font-semibold text-primary hover:text-primary-hover'
          >
            View all
          </Link>
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
          <Link
            href='/assignments'
            className='text-sm font-semibold text-primary hover:text-primary-hover'
          >
            View all
          </Link>
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
          <Link
            href='/resources'
            className='text-sm font-semibold text-primary hover:text-primary-hover'
          >
            View all
          </Link>
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

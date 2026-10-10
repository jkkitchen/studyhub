import type { Metadata } from 'next';
import Link from 'next/link';
import CourseForm from '@/components/CourseForm';



export const metadata: Metadata = {
  title: 'New Course',
  description: 'Create a new course.',
};


export default function NewCoursePage() {
  // Page Content
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      {/* Page header */}
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Courses
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-dark-text sm:text-3xl">
          Create Course
        </h1>
        <p className="mt-1 text-sm text-muted sm:text-base">
          Add a new course to keep its assignments and resources organized.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border-2 border-stone-200 bg-surface p-6 shadow-sm sm:p-8">
        <CourseForm />
      </div>
    </div>
  );
}
import Link from 'next/link';
import ResourceForm from '@/components/ResourceForm';
import { getCourses } from '@/lib/db';

export default async function NewResourcePage() {
  //Database query to retrieve the list of courses for the dropdown
  const courseDocs = await getCourses();

  //Convert Mongoose Course document to plain object for the ResourceForm component
  const courses = courseDocs.map((course) => ({
    _id: course._id.toString(),
    userId: course.userId,
    name: course.name,
    code: course.code,
    description: course.description,
    createdAt: course.createdAt.toISOString(),
    updatedAt: course.updatedAt.toISOString(),
  }));

  //Page Content
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      {/* Page header */}
      <div>
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Resources
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-dark-text sm:text-3xl">
          Create Resource
        </h1>
        <p className="mt-1 text-sm text-muted sm:text-base">
          Save a link, note, or file to a course so you can find it again.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border-2 border-stone-200 bg-surface p-6 shadow-sm sm:p-8">
        <ResourceForm courses={courses} />
      </div>
    </div>
  );
}
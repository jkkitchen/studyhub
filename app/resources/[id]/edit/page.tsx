import type { Metadata } from 'next';
import Link from 'next/link';
import ResourceForm from '@/components/ResourceForm';
import { getResourceById, getCourses } from '@/lib/db';

//Get Resource id from the URL params
interface EditResourcePageProps {
  params: Promise<{
    id: string;
  }>;
}


export const metadata: Metadata = {
  title: 'Edit Resource',
  description: 'Update the details of a specific existing resource.',
};


export default async function EditResourcePage({
  params,
}: EditResourcePageProps) {
  const { id } = await params;

  //Retrieve the Resource document (Mongoose document) from the database using the id from the URL params, and retrieve the list of courses for the dropdown
  const resourceDoc = await getResourceById(id);
  const coursesDoc = await getCourses();

  //Create plain Resource object from the Mongoose document to pass to the ResourceForm component
  const resource = {
    _id: resourceDoc._id.toString(),
    userId: resourceDoc.userId,
    courseId: resourceDoc.courseId.toString(),
    title: resourceDoc.title,
    type: resourceDoc.type,
    content: resourceDoc.content,
    createdAt: resourceDoc.createdAt.toISOString(),
    updatedAt: resourceDoc.updatedAt.toISOString(),
  };

  //Create plain course objects from the Mongoose documents to pass to the ResourceForm component
  const courses = coursesDoc.map((course) => ({
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
          Edit Resource
        </h1>
        <p className="mt-1 text-sm text-muted sm:text-base">
          Update the details for {resource.title}.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border-2 border-stone-200 bg-surface p-6 shadow-sm sm:p-8">
        <ResourceForm resource={resource} courses={courses} />
      </div>
    </div>
  );
}
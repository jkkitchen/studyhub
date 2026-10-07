import Link from 'next/link';
import AssignmentForm from '@/components/AssignmentForm';
import { getAssignmentById, getCourses } from '@/lib/db';

//Get assignment id from the URL params
interface EditAssignmentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAssignmentPage({
  params,
}: EditAssignmentPageProps) { //Pull params out of the page props
  const { id } = await params; //Pull id out of the params

  //Retrieve the assignment document (Mongoose document) from the database using the id from the URL params, and retrieve the list of courses for the dropdown
  const assignmentDoc = await getAssignmentById(id);
  const coursesDoc = await getCourses();

  //Create plain assignment object from the Mongoose document to pass to the AssignmentForm component
  const assignment = {
    _id: assignmentDoc._id.toString(),
    userId: assignmentDoc.userId,
    courseId: assignmentDoc.courseId.toString(),
    title: assignmentDoc.title,
    description: assignmentDoc.description,
    dueDate: assignmentDoc.dueDate?.toISOString(),
    completed: assignmentDoc.completed,
    createdAt: assignmentDoc.createdAt.toISOString(),
    updatedAt: assignmentDoc.updatedAt.toISOString(),
  };

  //Create plain course object from the Mongoose document to pass to the AssignmentForm component
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
          href="/assignments"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Assignments
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-dark-text sm:text-3xl">
          Edit Assignment
        </h1>
        <p className="mt-1 text-sm text-muted sm:text-base">
          Update the details for {assignment.title}.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border-2 border-stone-200 bg-surface p-6 shadow-sm sm:p-8">
        <AssignmentForm assignment={assignment} courses={courses} />
      </div>
    </div>
  );
}
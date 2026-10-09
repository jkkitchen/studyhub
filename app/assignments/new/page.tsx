import AssignmentForm from '@/components/AssignmentForm';
import { getCourses } from '@/lib/db';

export default async function NewAssignmentPage() {
  //Database query to retrieve the list of courses for the dropdown
  const courseDocs = await getCourses();

  //Convert Mongoose documents to plain objects for the AssignmentForm component
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
    <main className='mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Page heading */}
      <div>
        <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
          Create Assignment
        </h1>
        <p className='mt-2 text-sm text-muted sm:text-base'>
          Add a new assignment to keep track of your coursework and deadlines.
        </p>
      </div>

      {/* Assignment form */}
      <div className='mx-auto w-full max-w-2xl rounded-2xl border border-stone-200 bg-surface p-6 shadow-sm sm:p-8'>
        <AssignmentForm courses={courses} />
      </div>
    </main>
  );
}

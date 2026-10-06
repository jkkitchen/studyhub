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
    <main>
      <h1>Create Assignment</h1>
      <AssignmentForm courses={courses} />
    </main>
  );
}

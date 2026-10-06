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
    <main>
      <h1>Create Resource</h1>
      <ResourceForm courses={courses} />
    </main>
  );
}

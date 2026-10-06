import ResourceForm from '@/components/ResourceForm';
import { getResourceById, getCourses } from '@/lib/db';

//Get Resource id from the URL params
interface EditResourcePageProps {
  params: Promise<{
    id: string;
  }>;
}

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
    <main>
      <h1>Edit Resource</h1>
      <ResourceForm resource={resource} courses={courses} />
    </main>
  );
}

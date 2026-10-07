import CourseForm from '@/components/CourseForm';
import { getCourseById } from '@/lib/db';

//Get Course id from the URL params
interface EditCoursePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params;

  //Get the Mongoose Course document from the database using the id from the URL
  const courseDoc = await getCourseById(id);

  //Create a plain Course object from the Mongoose document to pass to the CourseForm component
  const course = {
    _id: courseDoc._id.toString(),
    userId: courseDoc.userId,
    name: courseDoc.name,
    code: courseDoc.code,
    description: courseDoc.description,
    createdAt: courseDoc.createdAt.toISOString(),
    updatedAt: courseDoc.updatedAt.toISOString(),
  };

  //Page Content
  return (
    <main>
      <h1>Edit Course</h1>
      <CourseForm course={course} />
    </main>
  );
}

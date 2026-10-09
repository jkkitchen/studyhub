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
    <main className='mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
          Edit Course
        </h1>
        <p className='mt-2 text-sm text-muted sm:text-base'>
          Update your course information below.
        </p>
      </div>

      <div className='mx-auto w-full max-w-2xl rounded-2xl border border-stone-200 bg-surface p-6 shadow-sm sm:p-8'>
        <CourseForm course={course} />
      </div>
    </main>
  );
}

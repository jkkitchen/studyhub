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
  //Page Content
  return (
    <main className='mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Page heading */}
      <div>
        <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
          Edit Resource
        </h1>
        <p className='mt-2 text-sm text-muted sm:text-base'>
          Update your resource information below.
        </p>
      </div>

      {/* Resource form */}
      <div className='mx-auto w-full max-w-2xl rounded-2xl border border-stone-200 bg-surface p-6 shadow-sm sm:p-8'>
        <ResourceForm resource={resource} courses={courses} />
      </div>
    </main>
  );
}

import { getCourseById, getAssignments, getResources } from '@/lib/db';
import DeleteCourseButton from '@/components/DeleteCourseButton';
import AssignmentCard from '@/components/AssignmentCard';
import ResourceCard from '@/components/ResourceCard';
import Link from 'next/link';

//Get Course id from the URL params
interface CourseByIdPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseByIdPage({ params }: CourseByIdPageProps) {
  const { id } = await params;

  //Get the course from the database
  const course = await getCourseById(id);

  //Fetch assignments for this course
  const assignments = (await getAssignments()).filter(
    (assignment) => assignment.courseId.toString() === id
  ); //only shows assignments with the correct course Id

  //Fetch resources for this course
  const resources = (await getResources()).filter(
    (resource) => resource.courseId.toString() === id
  ); //only display resources with the correct course id

  //Page Content
  return (
    <main className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
      {/* Course heading and description */}
      <div>
        <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
          {course.code} {course.name}
        </h1>

        <p className='mt-2 text-sm text-muted sm:text-base'>
          {course.description}
        </p>

        {/* Edit and Delete buttons */}
        <div className='mt-4 flex flex-wrap items-center justify-around gap-3'>
          <Link
            href={`/courses/${id}/edit`}
            className='inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            Edit Course
          </Link>

          <DeleteCourseButton courseId={id} />
        </div>
      </div>

      {/* Assignments section */}
      <section>
        <h2 className='mb-4 text-xl font-bold text-dark-text'>Assignments</h2>

        {assignments.length === 0 ? (
          <p className='text-sm text-muted'>
            No assignments for this course yet.
          </p>
        ) : (
          <div className='flex flex-col gap-3'>
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id.toString()}
                assignment={assignment}
                courseCode={course.code}
              />
            ))}
          </div>
        )}
      </section>

      {/* Resources section */}
      <section>
        <h2 className='mb-4 text-xl font-bold text-dark-text'>Resources</h2>

        {resources.length === 0 ? (
          <p className='text-sm text-muted'>
            No resources for this course yet.
          </p>
        ) : (
          <div className='flex flex-col gap-3'>
            {resources.map((resource) => (
              <ResourceCard
                key={resource._id.toString()}
                resource={resource}
                courseCode={course.code}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
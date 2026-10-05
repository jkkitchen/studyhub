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
}: EditAssignmentPageProps) {
  const { id } = await params;

    //Retrieve the assignment document (Mongoose document) from the database using the id from the URL params, and retrieve the list of courses for the dropdown
    const assignmentDoc = await getAssignmentById(id);
    const courses = await getCourses();
    
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

    //Page Content
    return (
      <main>
        <h1>Edit Assignment</h1>
        <AssignmentForm assignment={assignment} courses={courses} />
      </main>
    );
}
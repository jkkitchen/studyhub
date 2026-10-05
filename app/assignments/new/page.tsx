import AssignmentForm from '@/components/AssignmentForm';
import { getCourses } from '@/lib/db';

export default async function NewAssignmentPage() {
  const courses = await getCourses();

  //Need to update once two courses models are resolved and merged, but for now just return the form with the courses list
    //Page Content
    return (
    <main>
      <h1>Create Assignment</h1>
      <AssignmentForm courses={courses} />
    </main>
  );
}

'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { addAssignment, updateAssignment, deleteAssignment } from '@/lib/db';

//Create Zod Assignment Schema
const assignmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  courseId: z.string().min(1, 'Course is required'),
  dueDate: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)), //empty string is still counted as a string unless you transform it to undefined
  completed: z.boolean().default(false),
});

//Define State for Error Handling on Form
export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    courseId?: string[];
    dueDate?: string[];
    completed?: string[];
  };
  message?: string | null;
};

//Create Assignment
export async function addAssignmentAction(
  _prevState: State,
  formData: FormData
): Promise<State> {
  //Get data from the form
  const title = formData.get('title');
  const description = formData.get('description');
  const courseId = formData.get('courseId');
  const dueDate = formData.get('dueDate');
  const completed = formData.get('completed') === 'on'; //checkbox returns 'on' if checked

  //Check that the data is valid using Zod
  const result = assignmentSchema.safeParse({
    title,
    description,
    courseId,
    dueDate,
    completed,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: null,
    };
  }

  // If the data is valid, call the function from db.ts to add the assignment to the database
  await addAssignment(result.data);

  //Refresh the cached data on the assignments page reload the page to show the new assignment
  revalidatePath('/assignments');
  redirect('/assignments');
}

//Update Assignment
export async function updateAssignmentAction(
  assignmentId: string,
  _prevState: State,
  formData: FormData
): Promise<State> {
  //Get data from the form
  const title = formData.get('title');
  const description = formData.get('description');
  const courseId = formData.get('courseId');
  const dueDate = formData.get('dueDate');
  const completed = formData.get('completed') === 'on'; //checkbox returns 'on' if checked

  //Check that the data is valid using Zod
  const result = assignmentSchema.safeParse({
    title,
    description,
    courseId,
    dueDate,
    completed,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: null,
    };
  }

  // If the data is valid, call the function from db.ts to update the assignment in the database
  await updateAssignment(assignmentId, result.data);

  //Refresh the cached data on the assignments page reload the page to show the new assignment
  revalidatePath('/assignments');
  redirect('/assignments');
}

//Delete Assignment
export async function deleteAssignmentAction(assignmentId: string) {
  try {
    await deleteAssignment(assignmentId);
  } catch (error) {
    console.error('Failed to delete assignment:', error);
    throw new Error('Failed to delete assignment.');
  }

  revalidatePath('/assignments');
  redirect('/assignments');
}
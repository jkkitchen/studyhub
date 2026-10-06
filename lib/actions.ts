'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import {
  addAssignment,
  updateAssignment,
  deleteAssignment,
  addCourse,
  updateCourse,
  deleteCourse,
  addResource,
  updateResource,
  deleteResource,
} from '@/lib/db';

//Create Zod Schemas

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

const courseSchema = z.object({
  name: z.string().min(1, 'Course name is required'),
  code: z.string().min(1, 'Course code is required'),
  description: z.string().optional(),
});

const resourceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['link', 'note', 'file'], 'Type is required'),
  content: z.string().min(1, 'Content is required'),
  courseId: z.string().min(1, 'Course is required'),
});

//---------------------------------------

//Define State for Error Handling on Forms

export type AssignmentState = {
  errors?: {
    title?: string[];
    description?: string[];
    courseId?: string[];
    dueDate?: string[];
    completed?: string[];
  };
  message?: string | null;
};

export type CourseState = {
  errors?: {
    name?: string[];
    code?: string[];
    description?: string[];
  };
  message?: string | null;
};

export type ResourceState = {
  errors?: {
    title?: string[];
    type?: string[];
    content?: string[];
    courseId?: string[];
  };
  message?: string | null;
};

//---------------------------------------

//Create Assignment
export async function addAssignmentAction(
  _prevState: AssignmentState,
  formData: FormData
): Promise<AssignmentState> {
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
  //Use try/catch block in case addAssignment fails (e.g., database connection issues, validation errors, etc.)
  try {
    await addAssignment(result.data);
  } catch (error) {
    console.error('Failed to create assignment:', error);

    return {
      message: 'Failed to create assignment.',
    };
  }

  revalidatePath('/assignments');
  redirect('/assignments');

  //Refresh the cached data on the assignments page reload the page to show the new assignment
  revalidatePath('/assignments');
  redirect('/assignments');
}

//Update Assignment
export async function updateAssignmentAction(
  assignmentId: string,
  _prevState: AssignmentState,
  formData: FormData
): Promise<AssignmentState> {
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
  //Use try/catch block in case updateAssignment fails (e.g., database connection issues, validation errors, etc.)
  try {
    await updateAssignment(assignmentId, result.data);
  } catch (error) {
    console.error('Failed to update assignment:', error);

    return {
      message: 'Failed to update assignment.',
    };
  }

  revalidatePath('/assignments');
  redirect('/assignments');

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

//---------------------------------------

//Create course
export async function addCourseAction(
  _prevState: CourseState,
  formData: FormData
): Promise<CourseState> {
  //Get data from the form
  const name = formData.get('name');
  const code = formData.get('code');
  const description = formData.get('description');

  //Check that the data is valid using Zod
  const result = courseSchema.safeParse({
    name,
    code,
    description,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: null,
    };
  }

  // If the data is valid, call the function from db.ts to add the course to the database
  //Use try/catch block in case addCourse fails (e.g., database connection issues, validation errors, etc.)
  try {
    await addCourse(result.data);
  } catch (error) {
    console.error('Failed to create course:', error);

    return {
      message: 'Failed to create course.',
    };
  }

  //Refresh the cached data on the courses page
  revalidatePath('/courses');
  redirect('/courses');
}

//Update course
export async function updateCourseAction(
  courseId: string,
  _prevState: CourseState,
  formData: FormData
): Promise<CourseState> {
  //Get data from the form
  const name = formData.get('name');
  const code = formData.get('code');
  const description = formData.get('description');

  //Check that the data is valid using Zod
  const result = courseSchema.safeParse({
    name,
    code,
    description,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: null,
    };
  }

  // If the data is valid, call the function from db.ts to update the course in the database
  //Use try/catch block in case updateCourse fails (e.g., database connection issues, validation errors, etc.)
  try {
    await updateCourse(courseId, result.data);
  } catch (error) {
    console.error('Failed to update course:', error);
    return {
      message: 'Failed to update course.',
    };
  }

  //Refresh the cached data on the courses page
  revalidatePath('/courses');
  redirect('/courses');
}

//Delete course
export async function deleteCourseAction(courseId: string) {
  //Use try/catch block in case deleteCourse fails (e.g., database connection issues, validation errors, etc.)
  try {
    await deleteCourse(courseId);
  } catch (error) {
    console.error('Failed to delete course:', error);
    throw new Error('Failed to delete course.');
  }
  //Refresh the cached data on the courses page
  revalidatePath('/courses');
  redirect('/courses');
}

//---------------------------------------

//Create resource
export async function addResourceAction(
  _prevState: ResourceState,
  formData: FormData
): Promise<ResourceState> {
  //Get data from the form
  const title = formData.get('title');
  const type = formData.get('type');
  const content = formData.get('content');
  const courseId = formData.get('courseId');

  //Check that the data is valid using Zod
  const result = resourceSchema.safeParse({
    title,
    type,
    content,
    courseId,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: null,
    };
  }

  // If the data is valid, call the function from db.ts to add the resource to the database
  //Use try/catch block in case addResource fails (e.g., database connection issues, validation errors, etc.)
  try {
    await addResource(result.data);
  } catch (error) {
    console.error('Failed to create resource:', error);
    return {
      message: 'Failed to create resource.',
    };
  }

  //Refresh the cached data on the resources page
  revalidatePath('/resources');
  redirect('/resources');
}

//Update Resource
export async function updateResourceAction(
  resourceId: string,
  _prevState: ResourceState,
  formData: FormData
): Promise<ResourceState> {
  //Get data from the form
  const title = formData.get('title');
  const type = formData.get('type');
  const content = formData.get('content');
  const courseId = formData.get('courseId');

  //Check that the data is valid using Zod
  const result = resourceSchema.safeParse({
    title,
    type,
    content,
    courseId,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: null,
    };
  }

  // If the data is valid, call the function from db.ts to update the resource in the database
  //Use try/catch block in case updateResource fails (e.g., database connection issues, validation errors, etc.)
  try {
    await updateResource(resourceId, result.data);
  } catch (error) {
    console.error('Failed to update resource:', error);
    return {
      message: 'Failed to update resource.',
    };
  }

  //Refresh the cached data on the resources page
  revalidatePath('/resources');
  redirect('/resources');
}

//Delete Resource
export async function deleteResourceAction(resourceId: string) {
  //Use try/catch block in case deleteResource fails (e.g., database connection issues, validation errors, etc.)
  try {
    await deleteResource(resourceId);
  } catch (error) {
    console.error('Failed to delete resource:', error);
    throw new Error('Failed to delete resource.');
  }
  //Refresh the cached data on the resources page
  revalidatePath('/resources');
  redirect('/resources');
}

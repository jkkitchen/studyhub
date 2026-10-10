//Import models
import Course from '@/models/Course';
import Assignment from '@/models/Assignment';
import Resource from '@/models/Resource';
import { AssignmentInput, CourseInput, ResourceInput } from '@/types/models';

import { connectDB } from '@/lib/mongodb';
import { auth } from '@/auth';

//COURSES
//Get all courses
export async function getCourses() {
  await connectDB(); //wait for the database connection
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find courses belonging to the logged-in user and sort by course code in alphabetical order
  const courses = await Course.find({
    userId: session.user.id,
  }).sort({ code: 1 });

  return courses;
}

//Get one course
export async function getCourseById(courseId: string) {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find the course by ID and belonging to the logged-in user
  const course = await Course.findOne({
    _id: courseId,
    userId: session.user.id,
  });

  if (!course) {
    throw new Error('Course not found');
  }

  return course;
}

//Add new course
export async function addCourse(data: CourseInput) {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Create the new course
  const course = await Course.create({
    userId: session.user.id,
    name: data.name,
    code: data.code,
    description: data.description,
  });

  //Returns values from database (including id, createdAt, updatedAt), although not currently used in the actions.ts file, but could be useful in the future
  return course;
}

//Update course
export async function updateCourse(courseId: string, data: CourseInput) {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Update the course
  const course = await Course.findOneAndUpdate(
    { _id: courseId, userId: session.user.id },
    {
      name: data.name,
      code: data.code,
      description: data.description,
    },
    { new: true, runValidators: true } //Return the updated document, runValidators ensures that the data is validated against the schema
  );

  if (!course) {
    throw new Error('Course not found');
  }

  //Returns values from database (including id, createdAt, updatedAt), although not currently used in the actions.ts file, but could be useful in the future
  return course;
}

//Delete course
export async function deleteCourse(courseId: string) {
  await connectDB();

  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  // Verify that this course belongs to the logged-in user
  const course = await Course.findOne({
    _id: courseId,
    userId: session.user.id,
  });

  if (!course) {
    throw new Error('Course not found');
  }

  // Delete associated assignments
  await Assignment.deleteMany({
    courseId: courseId,
    userId: session.user.id,
  });

  // Delete associated resources
  await Resource.deleteMany({
    courseId: courseId,
    userId: session.user.id,
  });

  // Delete the course
  await Course.findOneAndDelete({
    _id: courseId,
    userId: session.user.id,
  });

  //Returns values from database that were deleted
  return course;
}

//-----------------------------------------------------------------------

//ASSIGNMENTS
//Get all assignments
//NOTE: this returns all assignments including completed ones, this will need to be handled on specific pages (like the dashboard) to only show incomplete assignments
export async function getAssignments() {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find assignments belonging to the logged-in user
  const assignments = await Assignment.find({
    userId: session.user.id,
  });

  //Sort assignments by due date, with assignments that don't have a due date last
  assignments.sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0; //if neither have a due date, keep the order the same
    if (!a.dueDate) return 1; //if a doesn't have a due date, put it after b
    if (!b.dueDate) return -1; //if b doesn't have a due date, put it after a
    return a.dueDate.getTime() - b.dueDate.getTime(); //sort by due date
  });

  return assignments;
}

//Get one assignment
export async function getAssignmentById(assignmentId: string) {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find the assignment by ID and belonging to the logged-in user
  const assignment = await Assignment.findOne({
    _id: assignmentId,
    userId: session.user.id,
  });

  if (!assignment) {
    throw new Error('Assignment not found');
  }

  return assignment;
}

//Create new assignment
export async function addAssignment(data: AssignmentInput) {
  await connectDB();
  const session = await auth(); //get the logged-in user session
  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Create the new assignment
  const assignment = await Assignment.create({
    userId: session.user.id,
    courseId: data.courseId,
    title: data.title,
    description: data.description,
    dueDate: data.dueDate,
    completed: data.completed,
  });

  //Returns values from database (including id, createdAt, updatedAt), although not currently used in the actions.ts file, but could be useful in the future
  return assignment;
}

//Update assignment
export async function updateAssignment(
  assignmentId: string,
  data: AssignmentInput
) {
  await connectDB();
  const session = await auth(); //get the logged-in user session
  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find the assignment by ID and belonging to the logged-in user
  const assignment = await Assignment.findOneAndUpdate(
    { _id: assignmentId, userId: session.user.id },
    {
      courseId: data.courseId,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      completed: data.completed,
    },
    { new: true, runValidators: true } //return the updated document, runValidators ensures that the data is validated against the schema
  );

  //Check if assignment exists
  if (!assignment) {
    throw new Error('Assignment not found');
  }

  //Returns values from database (including id, createdAt, updatedAt), although not currently used in the actions.ts file, but could be useful in the future
  return assignment;
}

//Delete assignment
export async function deleteAssignment(assignmentId: string) {
  await connectDB();

  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find and delete the assignment
  const assignment = await Assignment.findOneAndDelete({
    _id: assignmentId,
    userId: session.user.id,
  });

  //Check if assignment exists
  if (!assignment) {
    throw new Error('Assignment not found');
  }

  //Returns values from database that were deleted
  return assignment;
}

//-----------------------------------------------------------------------

//RESOURCES
//Get all resources
export async function getResources() {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find resources belonging to the logged-in user
  const resources = await Resource.find({
    userId: session.user.id,
  }).sort({ createdAt: -1 }); //Put in order of when they were created with the most recent at the top

  return resources;
}

//Get one resource (used on the edit resource form)
export async function getResourceById(resourceId: string) {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find the resource by ID and belonging to the logged-in user
  const resource = await Resource.findOne({
    _id: resourceId,
    userId: session.user.id,
  });

  if (!resource) {
    throw new Error('Resource not found');
  }

  return resource;
}

//Add new resource
export async function addResource(data: ResourceInput) {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Create the new resource
  const resource = await Resource.create({
    userId: session.user.id,
    courseId: data.courseId,
    title: data.title,
    type: data.type,
    content: data.content,
  });

  //Returns values from database (including id, createdAt, updatedAt), although not currently used in the actions.ts file, but could be useful in the future
  return resource;
}

//Update resource
export async function updateResource(resourceId: string, data: ResourceInput) {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find the resource by ID and belonging to the logged-in user
  const resource = await Resource.findOneAndUpdate(
    { _id: resourceId, userId: session.user.id },
    {
      courseId: data.courseId,
      title: data.title,
      type: data.type,
      content: data.content,
    },
    { new: true, runValidators: true } //return the updated document, runValidators ensures that the data is validated against the schema
  );

  //Check if resource exists
  if (!resource) {
    throw new Error('Resource not found');
  }

  //Returns values from database (including id, createdAt, updatedAt), although not currently used in the actions.ts file, but could be useful in the future
  return resource;
}

//Delete resource
export async function deleteResource(resourceId: string) {
  await connectDB();
  const session = await auth(); //get the logged-in user session

  //Make sure there is a logged-in user
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  //Find the resource by ID and belonging to the logged-in user
  const resource = await Resource.findOneAndDelete({
    _id: resourceId,
    userId: session.user.id,
  });

  //Check if resource exists
  if (!resource) {
    throw new Error('Resource not found');
  }

  //Returns values from database (including id, createdAt, updatedAt), although not currently used in the actions.ts file, but could be useful in the future
  return resource;
}

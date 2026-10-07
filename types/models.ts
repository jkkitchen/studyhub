export interface Assignment {
  _id: string;
  userId: string;
  courseId: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentInput {
  courseId: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
}
export interface Course {
  _id: string;
  userId: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseInput {
  name: string;
  code: string;
  description?: string;
}

export interface Resource {
  _id: string;
  userId: string;
  courseId: string;
  title: string;
  type: 'link' | 'note' | 'file';
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceInput {
  courseId: string;
  title: string;
  type: 'link' | 'note' | 'file';
  content: string;
}
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
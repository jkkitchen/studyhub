export interface Course {
  _id: string;
  userId: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
}

export interface CourseInput {
  name: string;
  code: string;
  description?: string;
}

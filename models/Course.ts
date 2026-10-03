import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface ICourse extends Document {
  userId: string; // the id of the user who owns this course (text)
  name: string; // course name, always present
  code?: string; // "?" means optional: a course may have no code
  description: string; // always present, but can be an empty string
  created: Date; // added automatically by "timestamps: true" below
  update: Date; // also added automatically, changes on every update
}

// Create the runtime blueprint. <ICourse> links it to the interface above,
// so TypeScript checks that these fields match the interface.
const CourseSchema = new Schema<ICourse>(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
      index: true, // index: true = MongoDB builds a lookup index, so finding "all courses for this user" is fast
    },
    name: {
      type: String,
      required: true,
      trim: true, // trim: true = removes spaces at the start and end ("  Math " becomes "Math")
    },
    code: {
      type: String,
      trim: true,
      uppercase: true, // uppercase: true = "cs101" is saved as "CS101"
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  // Second argument = schema options.
  // timestamps: true makes Mongoose add and maintain createdAt and updatedAt for you
  { timestamps: true }
);

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;

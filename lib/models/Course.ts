import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
  userId: string;
  name: string;
  code: string;
  description?: string;
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;

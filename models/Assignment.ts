//COPIED FROM PR36 TO CHECK THAT THE ASSIGNMENT CARD IS RENDERING CORRECTLY ON THE DASHBOARD PAGE
// mongoose = the library itself. The names in { } are types/tools we use from it:
// Schema = builds the blueprint, Document = base type for one record,
// Model = type for the collection tool, Types = gives us Types.ObjectId (a MongoDB id)
import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Describes the shape of ONE assignment record, for TypeScript only.
// "extends Document" adds Mongoose's built-ins (_id, .save(), etc.)
export interface IAssignment extends Document {
  userId: string; // id of the user who owns this assignment
  courseId: Types.ObjectId; // id of the course this assignment belongs to
  title: string; // assignment name, always present
  description: string; // details, always present but can be an empty string
  dueDate?: Date; // "?" = optional: an assignment may have no due date
  completed: boolean; // true once the student has finished it
  createdAt: Date; // added automatically by timestamps
  updatedAt: Date; // added automatically, changes on every update
}

// The runtime blueprint. <IAssignment> links it to the interface above,
// so TypeScript checks that the fields match.
const AssignmentSchema = new Schema<IAssignment>(
  {
    userId: {
      type: String, // stored as text
      required: true, // saving fails without it
      index: true, // fast lookup of "all assignments for this user"
    },
    courseId: {
      type: Schema.Types.ObjectId, // stored as a real MongoDB id
      ref: 'Course', // points to the Course model (enables .populate('courseId'))
      required: true,
      index: true, // fast lookup of "all assignments in this course"
    },
    title: {
      type: String,
      required: true,
      trim: true, // removes spaces at the start and end
    },
    description: {
      type: String,
      trim: true,
      default: '', // empty string if nothing is provided
    },
    dueDate: {
      type: Date, // optional: no "required", so it can be left out
    },
    completed: {
      type: Boolean,
      default: false, // every new assignment starts as not completed
    },
  },
  // Schema options: timestamps: true adds createdAt and updatedAt automatically
  { timestamps: true }
);

// Reuse the model if Next.js already registered it (hot reload), otherwise create it.
// ": Model<IAssignment>" is the type label so TypeScript knows what Assignment is.
const Assignment: Model<IAssignment> =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>('Assignment', AssignmentSchema);

// Lets other files write: import Assignment from "@/models/Assignment"
export default Assignment;
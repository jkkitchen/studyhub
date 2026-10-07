// mongoose = the library itself. The names in { } are types/tools we use from it:
// Schema = builds the blueprint, Document = base type for one record,
// Model = type for the collection tool, Types = gives us Types.ObjectId (a MongoDB id)
import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// A union type: a resource's type can ONLY be one of these three strings.
// This was missing from your file, and is why 'ResourceType' had no definition.
export type ResourceType = 'link' | 'note' | 'file';

// Describes the shape of ONE resource record, for TypeScript only (checked while you write code)
export interface IResource extends Document {
  userId: string; // id of the user who owns this resource
  courseId: Types.ObjectId; // id of the course this resource belongs to
  title: string; // display name of the resource
  type: ResourceType; // must be "link", "note" or "file"
  content: string; // the URL, note text, or file reference
  createdAt: Date; // added automatically by timestamps
  updatedAt: Date; // added automatically, changes on every update
}

// The runtime blueprint. <IResource> links it to the interface above.
const ResourceSchema = new Schema<IResource>(
  {
    userId: {
      type: String, // stored as text
      required: true, // saving fails without it
      index: true, // fast lookup of "all resources for this user"
    },
    courseId: {
      type: Schema.Types.ObjectId, // stored as a real MongoDB id
      ref: 'Course', // points to the Course model (enables .populate("courseId"))
      required: true,
      index: true, // fast lookup of "all resources in this course"
    },
    title: {
      type: String,
      required: true,
      trim: true, // removes spaces at the start and end
    },
    type: {
      type: String,
      enum: ['link', 'note', 'file'], // Mongoose rejects any other value at runtime
      default: 'link', // used when no type is given
    },
    content: {
      type: String,
      default: '', // empty string if nothing is provided
    },
  },
  // Schema options: timestamps: true adds createdAt and updatedAt automatically
  { timestamps: true }
);

// Reuse the model if Next.js already registered it (hot reload), otherwise create it.
// The ": Model<IResource>" part is the type label for TypeScript.
const Resource: Model<IResource> =
  mongoose.models.Resource ||
  mongoose.model<IResource>('Resource', ResourceSchema);

// Lets other files write: import Resource from "@/models/Resource"
export default Resource;

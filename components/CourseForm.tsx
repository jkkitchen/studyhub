'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import {
  addCourseAction,
  updateCourseAction,
  type CourseState,
} from '@/lib/actions';
import type { Course } from '@/types/models';

interface CourseFormProps {
  course?: Course; //? because this form can be used for creating a new course or editing an existing one
}

export default function CourseForm({ course }: CourseFormProps) {
  //If updating an existing course, bind the course id to the update action, otherwise use the add action.
  //This allows the same form to be used for both creating and updating courses.
  const courseAction = course
    ? updateCourseAction.bind(null, course._id)
    : addCourseAction;

  const initialState: CourseState = {
    errors: {},
    message: null,
  };

  const [state, formAction, isPending] = useActionState(
    courseAction,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Course Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Course Name <span className="text-danger">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={course?.name ?? ''}
          required
          placeholder="e.g. Intro to Databases"
          aria-describedby="name-error"
          className="w-full rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 text-sm text-dark-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none"
        />
        <div id="name-error" aria-live="polite">
          {state.errors?.name?.map((error) => (
            <p key={error} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Course Code */}
      <div>
        <label htmlFor="code" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Course Code <span className="text-danger">*</span>
        </label>
        <input
          id="code"
          name="code"
          type="text"
          defaultValue={course?.code ?? ''}
          required
          placeholder="e.g. CS 101"
          aria-describedby="code-error"
          className="w-full rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 text-sm text-dark-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none"
        />
        <div id="code-error" aria-live="polite">
          {state.errors?.code?.map((error) => (
            <p key={error} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-semibold text-dark-text"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={course?.description ?? ''}
          rows={4}
          placeholder="A short summary of what this course covers."
          aria-describedby="description-error"
          className="w-full rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 text-sm text-dark-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none"
        />
        <div id="description-error" aria-live="polite">
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Action Error */}
      {state.message && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border-2 border-danger-light bg-danger-light px-3.5 py-2.5 text-sm font-medium text-danger"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {state.message}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t-2 border-stone-100 pt-4">
        <Link
          href="/courses"
          className="rounded-lg px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-background hover:text-dark-text"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending && (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 animate-spin">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" fill="none" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" className="opacity-75" />
            </svg>
          )}
          {isPending ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  );
}
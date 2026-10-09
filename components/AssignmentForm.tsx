'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { addAssignmentAction, updateAssignmentAction, type AssignmentState } from '@/lib/actions';
import type { Assignment, Course } from '@/types/models';

interface AssignmentFormProps {
  assignment?: Assignment; //? because this form can be used for creating a new assignment or editing an existing one
  courses: Course[]; //list of courses to populate the course selection dropdown
}

export default function AssignmentForm({ assignment, courses }: AssignmentFormProps) {
  //If updating an existing assignment, bind the assignment id to the update action, otherwise use the add action.
  //This allows the same form to be used for both creating and updating assignments.
  const assignmentAction = assignment
    ? updateAssignmentAction.bind(null, assignment._id)
    : addAssignmentAction;

  const initialState: AssignmentState = {
    errors: {},
    message: null,
  };

  const [state, formAction, isPending] = useActionState(
    assignmentAction,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Assignment Title */}
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Assignment Title <span className="text-danger">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={assignment?.title ?? ''}
          required
          placeholder="e.g. Database Schema Draft"
          aria-describedby="title-error"
          className="w-full rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 text-sm text-dark-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none"
        />
        <div id="title-error" aria-live="polite">
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Assignment Description */}
      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Assignment Description <span className="text-danger">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={assignment?.description ?? ''}
          rows={4}
          required          
          placeholder="What does this assignment involve?"
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

      {/* Course Selection */}
      <div>
        <label htmlFor="courseId" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Course <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <select
            id="courseId"
            name="courseId"
            defaultValue={assignment?.courseId ?? ''}
            required
            aria-describedby="courseId-error"
            className="w-full appearance-none rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 pr-10 text-sm text-dark-text transition-colors focus:border-accent focus:outline-none"
          >
            <option value="" disabled>
              Select the course
            </option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <div id="courseId-error" aria-live="polite">
          {state.errors?.courseId?.map((error) => (
            <p key={error} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          defaultValue={
            assignment?.dueDate
              ? new Date(assignment.dueDate).toISOString().split('T')[0]
              : ''
          }
          aria-describedby="dueDate-error"
          className="w-full rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 text-sm text-dark-text transition-colors focus:border-accent focus:outline-none"
        />
        <div id="dueDate-error" aria-live="polite">
          {state.errors?.dueDate?.map((error) => (
            <p key={error} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Completed */}
      <div className="flex items-center gap-3 rounded-lg border-2 border-stone-200 bg-background px-3.5 py-3">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          defaultChecked={assignment?.completed ?? false}
          className="h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-stone-300 accent-primary focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <label htmlFor="completed" className="cursor-pointer select-none text-sm font-medium text-dark-text">
          Mark as completed
        </label>
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
          href="/assignments"
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
          {isPending
            ? 'Saving...'
            : assignment
              ? 'Update Assignment'
              : 'Create Assignment'}
        </button>
      </div>
    </form>
  );
}
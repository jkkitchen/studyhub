'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import {
  addResourceAction,
  updateResourceAction,
  type ResourceState,
} from '@/lib/actions';
import type { Course, Resource } from '@/types/models';

interface ResourceFormProps {
  resource?: Resource;
  courses: Course[];
}

export default function ResourceForm({ resource, courses }: ResourceFormProps) {
  // If updating an existing resource, bind the resource id to the update
  // action. Otherwise, use the add action.
  const resourceAction = resource
    ? updateResourceAction.bind(null, resource._id)
    : addResourceAction;

  const initialState: ResourceState = {
    errors: {},
    message: null,
  };

  const [state, formAction, isPending] = useActionState(
    resourceAction,
    initialState
  );

  //NOTE: For file option, it's currently a textarea. If we want to be able to upload files we will need to change the input type to file
  // and handle the file upload in the action.
  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Resource Title */}
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Resource Title <span className="text-danger">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={resource?.title ?? ''}
          required
          placeholder="e.g. Normalization Cheat Sheet"
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

      {/* Resource Type */}
      <div>
        <label htmlFor="type" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Resource Type <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <select
            id="type"
            name="type"
            defaultValue={resource?.type ?? ''}
            required
            aria-describedby="type-error"
            className="w-full appearance-none rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 pr-10 text-sm text-dark-text transition-colors focus:border-accent focus:outline-none"
          >
            <option value="" disabled>
              Select a resource type
            </option>
            <option value="link">Link</option>
            <option value="note">Note</option>
            <option value="file">File</option>
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
        <div id="type-error" aria-live="polite">
          {state.errors?.type?.map((error) => (
            <p key={error} className="mt-1.5 text-sm font-medium text-danger">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Course */}
      <div>
        <label htmlFor="courseId" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Course <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <select
            id="courseId"
            name="courseId"
            defaultValue={resource?.courseId ?? ''}
            required
            aria-describedby="courseId-error"
            className="w-full appearance-none rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 pr-10 text-sm text-dark-text transition-colors focus:border-accent focus:outline-none"
          >
            <option value="" disabled>
              Select a course
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

      {/* Content */}
      <div>
        <label htmlFor="content" className="mb-1.5 block text-sm font-semibold text-dark-text">
          Content <span className="text-danger">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={resource?.content ?? ''}
          rows={4}
          required
          placeholder="Paste a link, write a note, or describe the file."
          aria-describedby="content-error"
          className="w-full rounded-lg border-2 border-stone-200 bg-background px-3.5 py-2.5 text-sm text-dark-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none"
        />
        <div id="content-error" aria-live="polite">
          {state.errors?.content?.map((error) => (
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
          href="/resources"
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
            : resource
              ? 'Update Resource'
              : 'Create Resource'}
        </button>
      </div>
    </form>
  );
}
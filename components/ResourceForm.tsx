'use client';

import { useActionState } from 'react';
import {
  addResourceAction,
  updateResourceAction,
  type ResourceState,
} from '@/lib/actions';
import type { Course, Resource } from '@/types/models';
import Link from 'next/link';

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
    <form action={formAction} className='flex w-full flex-col gap-5'>
      {/* Resource Title */}
      <div>
        <label
          htmlFor='title'
          className='mb-1 block font-medium text-dark-text'
        >
          Resource Title
        </label>
        <input
          id='title'
          name='title'
          type='text'
          defaultValue={resource?.title ?? ''}
          required
          aria-describedby='title-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        />
        <div id='title-error' aria-live='polite'>
          {state.errors?.title?.map((error) => (
            <p key={error} className='mt-1 text-sm text-red-600'>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Resource Type */}
      <div>
        <label htmlFor='type' className='mb-1 block font-medium text-dark-text'>
          Resource Type
        </label>
        <select
          id='type'
          name='type'
          defaultValue={resource?.type ?? ''}
          required
          aria-describedby='type-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        >
          <option value='' disabled>
            Select a resource type
          </option>
          <option value='link'>Link</option>
          <option value='note'>Note</option>
          <option value='file'>File</option>
        </select>
        <div id='type-error' aria-live='polite'>
          {state.errors?.type?.map((error) => (
            <p key={error} className='mt-1 text-sm text-red-600'>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Course */}
      <div>
        <label
          htmlFor='courseId'
          className='mb-1 block font-medium text-dark-text'
        >
          Course
        </label>
        <select
          id='courseId'
          name='courseId'
          defaultValue={resource?.courseId ?? ''}
          required
          aria-describedby='courseId-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        >
          <option value='' disabled>
            Select a course
          </option>

          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>
        <div id='courseId-error' aria-live='polite'>
          {state.errors?.courseId?.map((error) => (
            <p key={error} className='mt-1 text-sm text-red-600'>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor='content'
          className='mb-1 block font-medium text-dark-text'
        >
          Content
        </label>
        <textarea
          id='content'
          name='content'
          defaultValue={resource?.content ?? ''}
          rows={4}
          required
          aria-describedby='content-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        />
        <div id='content-error' aria-live='polite'>
          {state.errors?.content?.map((error) => (
            <p key={error} className='mt-1 text-sm text-red-600'>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Action Error */}
      {state.message && (
        <p role='alert' className='text-sm text-red-600'>
          {state.message}
        </p>
      )}

      {/* Form buttons */}
      <div className='flex flex-wrap items-center justify-around gap-3 pt-4'>
        <Link
          href={resource ? `/resources/${resource._id}` : '/resources'}
          className='inline-flex items-center justify-center rounded-lg border-2 border-stone-300 bg-stone-200 px-4 py-2.5 text-sm font-semibold text-dark-text transition-colors hover:bg-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        >
          Cancel
        </Link>

        <button
          type='submit'
          disabled={isPending}
          className='inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50'
        >
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

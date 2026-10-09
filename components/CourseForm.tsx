'use client';

import { useActionState } from 'react';
import {
  addCourseAction,
  updateCourseAction,
  type CourseState,
} from '@/lib/actions';
import type { Course } from '@/types/models';
import Link from 'next/link';

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
    <form action={formAction} className='flex w-full max-w-2xl flex-col gap-5'>
      {/* Course Name */}
      <div>
        <label htmlFor='name' className='mb-1 block font-medium text-dark-text'>
          Course Name
        </label>
        <input
          id='name'
          name='name'
          type='text'
          defaultValue={course?.name ?? ''}
          required
          aria-describedby='name-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        />
        <div id='name-error' aria-live='polite'>
          {state.errors?.name?.map((error) => (
            <p key={error} className='mt-1 text-sm text-red-600'>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Course Code */}
      <div>
        <label htmlFor='code' className='mb-1 block font-medium text-dark-text'>
          Course Code
        </label>
        <input
          id='code'
          name='code'
          type='text'
          defaultValue={course?.code ?? ''}
          required
          aria-describedby='code-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        />
        <div id='code-error' aria-live='polite'>
          {state.errors?.code?.map((error) => (
            <p key={error} className='mt-1 text-sm text-red-600'>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor='description'
          className='mb-1 block font-medium text-dark-text'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          defaultValue={course?.description ?? ''}
          rows={4}
          aria-describedby='description-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        />
        <div id='description-error' aria-live='polite'>
          {state.errors?.description?.map((error) => (
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

      {/* Submit */}
      <div className='flex flex-wrap items-center justify-around gap-3 pt-4'>
        <Link
          href={course ? `/courses/${course._id}` : '/courses'}
          className='inline-flex items-center justify-center rounded-lg border-2 border-stone-300 bg-stone-200 px-4 py-2.5 text-sm font-semibold text-dark-text transition-colors hover:bg-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        >
          Cancel
        </Link>

        <button
          type='submit'
          disabled={isPending}
          className='inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isPending ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  );
}
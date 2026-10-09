'use client';

import { useActionState } from 'react';
import { addAssignmentAction, updateAssignmentAction, type AssignmentState } from '@/lib/actions';
import type { Assignment, Course } from '@/types/models';
import Link from 'next/link';

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
    <form action={formAction} className='flex w-full flex-col gap-5'>
      {/* Assignment Title */}
      <div>
        <label
          htmlFor='title'
          className='mb-1 block font-medium text-dark-text'
        >
          Assignment Title
        </label>
        <input
          id='title'
          name='title'
          type='text'
          defaultValue={assignment?.title ?? ''}
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

      {/*Assignment Description*/}
      <div>
        <label
          htmlFor='description'
          className='mb-1 block font-medium text-dark-text'
        >
          Assignment Description
        </label>
        <textarea
          id='description'
          name='description'
          defaultValue={assignment?.description ?? ''}
          rows={4}
          required
          aria-describedby='description-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        />
      </div>
      <div id='description-error' aria-live='polite'>
        {state.errors?.description?.map((error) => (
          <p key={error} className='text-red-600 text-sm'>
            {error}
          </p>
        ))}
      </div>

      {/*Course Selection*/}
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
          defaultValue={assignment?.courseId ?? ''}
          required
          aria-describedby='courseId-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        >
          <option value='' disabled>
            Select the Course
          </option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>
        <div id='courseId-error' aria-live='polite'>
          {state.errors?.courseId?.map((error) => (
            <p key={error} className='text-red-600 text-sm'>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label
          htmlFor='dueDate'
          className='mb-1 block font-medium text-dark-text'
        >
          Due Date
        </label>
        <input
          type='date'
          id='dueDate'
          name='dueDate'
          defaultValue={
            assignment?.dueDate
              ? new Date(assignment.dueDate).toISOString().split('T')[0]
              : ''
          }
          aria-describedby='dueDate-error'
          className='w-full rounded-lg border-2 border-stone-200 bg-background px-3 py-2.5 text-dark-text transition-colors focus:border-primary focus:outline-none'
        />
        <div id='dueDate-error' aria-live='polite'>
          {state.errors?.dueDate?.map((error) => (
            <p key={error} className='text-red-600 text-sm'>
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Completed */}
      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          id='completed'
          name='completed'
          defaultChecked={assignment?.completed ?? false}
          className='h-4 w-4 accent-primary'
        />
        <label htmlFor='completed' className='font-medium text-dark-text'>
          Completed
        </label>
      </div>

      {/* Form buttons */}
      <div className='flex flex-wrap items-center justify-around gap-3 pt-4'>
        <Link
          href={assignment ? `/assignments/${assignment._id}` : '/assignments'}
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
            : assignment
              ? 'Update Assignment'
              : 'Create Assignment'}
        </button>
      </div>
    </form>
  );
}

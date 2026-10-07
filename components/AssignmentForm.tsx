'use client';

import { useActionState } from 'react';
import { addAssignmentAction, updateAssignmentAction, type AssignmentState } from '@/lib/actions';
import { Assignment, Course } from '@/types/models';

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
    <form action={formAction} className='flex flex-col gap-4'>
      {/*Assignment Title*/}
      <div>
        <label htmlFor='title' className='block font-medium mb-1'>
          Assignment Title
        </label>
        <input
          id='title'
          name='title'
          type='text'
          defaultValue={assignment?.title ?? ''}
          required
          aria-describedby='title-error'
          className='w-full border rounded p-2'
        />
      </div>
      <div id='title-error' aria-live='polite'>
        {state.errors?.title?.map((error) => (
          <p key={error} className='text-red-600 text-sm'>
            {error}
          </p>
        ))}
      </div>

      {/*Assignment Description*/}
      <div>
        <label htmlFor='description' className='block font-medium mb-1'>
          Assignment Description
        </label>
        <textarea
          id='description'
          name='description'
          defaultValue={assignment?.description ?? ''}
          required
          aria-describedby='description-error'
          className='w-full border rounded p-2'
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
        <label htmlFor='courseId' className='block font-medium mb-1'>
          Course
        </label>
        <select
          id='courseId'
          name='courseId'
          defaultValue={assignment?.courseId ?? ''}
          required
          aria-describedby='courseId-error'
          className='w-full border rounded p-2'
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
        <label htmlFor='dueDate' className='block font-medium mb-1'>
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
          className='w-full border rounded p-2'
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
      <div>
        <input
          type='checkbox'
          id='completed'
          name='completed'
          defaultChecked={assignment?.completed ?? false}
        />
        <label htmlFor='completed'>Completed</label>
      </div>

      <button
        type='submit'
        disabled={isPending}
        className='rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800 disabled:opacity-50'
      >
        {isPending
          ? 'Saving...'
          : assignment
            ? 'Update Assignment'
            : 'Create Assignment'}
      </button>
    </form>
  );
}

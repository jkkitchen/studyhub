//To be used on Course, Assignment, and Resource individual pages
'use client';

import {
  deleteCourseAction,
  deleteAssignmentAction,
  deleteResourceAction,
} from '@/lib/actions';

interface DeleteButtonProps {
  id: string;
  type: 'course' | 'assignment' | 'resource';
}

//Create popup window to confirm they meant to delete the course/assignment/resource
export default function DeleteButton({ id, type }: DeleteButtonProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      type === 'course'
        ? 'Are you sure you want to delete this course? All associated assignments and resources will also be deleted.'
        : `Are you sure you want to delete this ${type}?`
    );

    if (!confirmed) return;

    if (type === 'course') {
      await deleteCourseAction(id);
    } else if (type === 'assignment') {
      await deleteAssignmentAction(id);
    } else {
      await deleteResourceAction(id);
    }
  }

  return (
    <button
      type='button'
      onClick={handleDelete}
      className='inline-flex items-center justify-center rounded-lg bg-danger px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger'
    >
      Delete {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  );
}

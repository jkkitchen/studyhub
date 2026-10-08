'use client';

import { deleteCourseAction } from '@/lib/actions';

export default function DeleteCourseButton({ courseId }: { courseId: string }) {
  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this course? All associated assignments and resources will also be permanently deleted.'
    );

    if (confirmed) {
      await deleteCourseAction(courseId);
    }
  }

  return (
    <button
      type='button'
      onClick={handleDelete}
      className='inline-flex items-center justify-center rounded-lg bg-danger px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger'
    >
      Delete Course
    </button>
  );
}

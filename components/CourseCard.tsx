import type { ICourse } from '@/models/Course';
import Link from 'next/link';

interface CourseCardProps {
  course: ICourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course._id.toString()}`}
      className='rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-accent bg-surface p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
    >
      <span className='inline-flex h-9 items-center justify-center rounded-lg bg-accent-light px-3 text-sm font-bold text-accent'>
        {course.code}
      </span>
      <p className='mt-3 font-semibold text-dark-text'>{course.name}</p>
      <p className='text-sm text-muted'>{course.description}</p>
    </Link>
  );
}

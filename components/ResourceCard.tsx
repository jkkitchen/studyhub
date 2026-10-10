import type { IResource } from '@/models/Resource';
import Link from 'next/link';

interface ResourceCardProps {
  resource: IResource;
  courseCode: string;
}

export default function ResourceCard({
  resource,
  courseCode,
}: ResourceCardProps) {
  return (
    <Link
      href={`/resources/${resource._id.toString()}`}
      className='flex items-center justify-between gap-4 rounded-2xl border-2 border-l-[6px] border-stone-200 border-l-accent bg-surface p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
    >
      <div className='min-w-0 flex-1'>
        <p className='truncate font-semibold text-dark-text'>
          {resource.title}
        </p>

        <p className='text-sm text-muted'>{courseCode}</p>
      </div>

      <span className='shrink-0 text-xs font-medium text-subtle'>
        {resource.type}
      </span>
    </Link>
  );
}

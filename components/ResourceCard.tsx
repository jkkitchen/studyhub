import type { IResource } from '@/models/Resource';

interface ResourceCardProps {
  resource: IResource;
  courseCode: string;
}

export default function ResourceCard({
  resource,
  courseCode,
}: ResourceCardProps) {
  return (
    <div className='flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
      <div className='min-w-0 flex-1'>
        <p className='truncate font-semibold text-dark-text'>
          {resource.title}
        </p>

        <p className='text-sm text-muted'>{courseCode}</p>
      </div>

      <span className='shrink-0 text-xs font-medium text-subtle'>
        {resource.type}
      </span>
    </div>
  );
}

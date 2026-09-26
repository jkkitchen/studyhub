'use client';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-12 text-center'>
      <h2 className='text-xl font-semibold text-gray-900'>{title}</h2>

      <p className='mt-2 max-w-md text-sm text-gray-600'>{description}</p>

      {actionLabel && onAction && (
        <button
          type='button'
          onClick={onAction}
          className='mt-6 rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800'
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

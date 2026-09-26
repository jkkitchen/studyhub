'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='flex min-h-[60vh] items-center justify-center px-4'>
      <div className='max-w-md text-center'>
        <h1 className='text-2xl font-bold'>Something went wrong</h1>

        <p className='mt-3 text-gray-600'>
          We couldn&apos;t load this page right now. Please try again.
        </p>

        <button
          type='button'
          onClick={() => reset()}
          className='mt-6 rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800'
        >
          Try again
        </button>
      </div>
    </main>
  );
}

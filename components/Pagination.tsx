'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// totalPages comes from the server
export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read the current page from the URL.
  const currentPage = Number(searchParams.get('page')) || 1;

  // Build a link to another page, keeping the search term
  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label='Pagination'
      className='flex items-center justify-center gap-4 mt-8'
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50'
        >
          Previous
        </Link>
      ) : (
        <span className='rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-600'>
          Previous
        </span>
      )}

      <span className='text-sm font-semibold text-gray-700'>
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50'
        >
          Next
        </Link>
      ) : (
        <span className='rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-600'>
          Next
        </span>
      )}
    </nav>
  );
}

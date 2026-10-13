//This client component fetches data from the API Route Handler 
// (Component -> API Route Handler -> Database Function -> MongoDB)
'use client';

import { useEffect, useState } from 'react';
import ResourceCard from '@/components/ResourceCard';
import type { Resource } from '@/types/models';
import { useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/Pagination';

// Define the data returned by our Resources API

interface Course {
  id: string;
  code: string;
}

interface ResourceListProps {
  courses: Course[];
}

export default function ResourceList({ courses }: ResourceListProps) {
  const searchParams = useSearchParams();

    const query = searchParams.get('query') || '';
    console.log('ResourceList search query:', query);
  const currentPage = Math.max(
    1,
    Math.floor(Number(searchParams.get('page')) || 1)
  );

  const [resources, setResources] = useState<Resource[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch resources from our API route
  useEffect(() => {
      async function fetchResources() {
        setLoading(true); //makes it so later searches will still show loading message
        setError(''); //if a request fails, the error message won't automatically disappear whent he next request succeeds
          
      try {
        const params = new URLSearchParams({
          query,
          page: currentPage.toString(),
        });

        const response = await fetch(`/api/resources?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }

        const data: { resources: Resource[]; totalPages: number } =
          await response.json();

        setResources(data.resources);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to load resources:', error);
        setError('Unable to load resources.');
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, [query, currentPage]);

  if (loading) {
    return <p className='text-sm text-muted'>Loading resources...</p>;
  }

  if (error) {
    return (
      <p role='alert' className='text-sm text-red-600'>
        {error}
      </p>
    );
  }

  // Separate resources by type
  const linkResources = resources.filter(
    (resource) => resource.type === 'link'
  );

  const noteResources = resources.filter(
    (resource) => resource.type === 'note'
  );

  // Display a section of resources using our existing ResourceCard
  function renderSection(
    title: string,
    items: Resource[],
    emptyMessage: string
  ) {
    return (
      <section>
        <h2 className='mb-4 text-xl font-bold text-dark-text'>{title}</h2>

        {items.length === 0 ? (
          <p className='text-sm text-muted'>{emptyMessage}</p>
        ) : (
          <div className='flex flex-col gap-3'>
            {items.map((resource) => {
              const course = courses.find(
                (course) => course.id === resource.courseId
              );

              return (
                <ResourceCard
                  key={resource._id}
                  resource={resource}
                  courseCode={course?.code ?? 'Unknown Course'}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }

return (
  <>
    {renderSection('Links', linkResources, 'No links added yet.')}
    {renderSection('Notes', noteResources, 'No notes added yet.')}
    {renderSection('Files', fileResources, 'No files added yet.')}

    {/* Pagination */}
    <div className='mt-8 flex justify-center'>
      <Pagination totalPages={totalPages} />
    </div>
  </>
);
}

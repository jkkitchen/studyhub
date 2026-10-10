//This client component fetches data from the API Route Handler 
// (Component -> API Route Handler -> Database Function -> MongoDB)
'use client';

import { useEffect, useState } from 'react';
import ResourceCard from '@/components/ResourceCard';
import type { Resource } from '@/types/models';

// Define the data returned by our Resources API

interface Course {
  id: string;
  code: string;
}

interface ResourceListProps {
  courses: Course[];
}

export default function ResourceList({ courses }: ResourceListProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch resources from our API route
  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch('/api/resources');

        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }

        const data: Resource[] = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Failed to load resources:', error);
        setError('Unable to load resources.');
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

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

  const fileResources = resources.filter(
    (resource) => resource.type === 'file'
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
    </>
  );
}

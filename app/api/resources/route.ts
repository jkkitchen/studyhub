import { NextResponse } from 'next/server';
import {
  getResources,
  getFilteredResources,
  getResourcesTotalPages,
  addResource,
} from '@/lib/db'; //Call server functions

// GET /api/resources
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('query');
    const page = searchParams.get('page');

    // Preserve the existing behavior when no search or page is requested
    if (query === null && page === null) {
      const resources = await getResources();
      return NextResponse.json(resources);
    }

    const searchQuery = query || '';
    const currentPage = Math.max(1, Math.floor(Number(page) || 1));

    const [resources, totalPages] = await Promise.all([
      getFilteredResources(searchQuery, currentPage),
      getResourcesTotalPages(searchQuery),
    ]);

    return NextResponse.json({
      resources,
      totalPages,
    });
  } catch (error) {
    console.error('Failed to get resources:', error);

    return NextResponse.json(
      { error: 'Failed to get resources' },
      { status: 500 }
    );
  }
}

// POST /api/resources
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const resource = await addResource({
      courseId: body.courseId,
      title: body.title,
      type: body.type,
      content: body.content,
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error('Failed to create resource:', error);

    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}

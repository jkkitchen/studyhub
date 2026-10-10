import { NextResponse } from 'next/server';
import { getResources, addResource } from '@/lib/db'; //Call server functions

// GET /api/resources
export async function GET() {
  try {
    const resources = await getResources();

    return NextResponse.json(resources);
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

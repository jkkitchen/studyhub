import { NextResponse } from 'next/server';
import { getResourceById, updateResource, deleteResource } from '@/lib/db'; //Call server functions

// GET /api/resources/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const resource = await getResourceById(id);

    return NextResponse.json(resource);
  } catch (error) {
    console.error('Failed to get resource:', error);

    return NextResponse.json(
      { error: 'Failed to get resource' },
      { status: 500 }
    );
  }
}

// PUT /api/resources/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const resource = await updateResource(id, {
      courseId: body.courseId,
      title: body.title,
      type: body.type,
      content: body.content,
    });

    return NextResponse.json(resource);
  } catch (error) {
    console.error('Failed to update resource:', error);

    return NextResponse.json(
      { error: 'Failed to update resource' },
      { status: 500 }
    );
  }
}

// DELETE /api/resources/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteResource(id);

    return NextResponse.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Failed to delete resource:', error);

    return NextResponse.json(
      { error: 'Failed to delete resource' },
      { status: 500 }
    );
  }
}

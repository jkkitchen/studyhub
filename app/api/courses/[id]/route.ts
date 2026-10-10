import { NextResponse } from 'next/server';
import { getCourseById, updateCourse, deleteCourse } from '@/lib/db'; //Call server functions

// GET /api/courses/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const course = await getCourseById(id);

    return NextResponse.json(course);
  } catch (error) {
    console.error('Failed to get course:', error);

    return NextResponse.json(
      { error: 'Failed to get course' },
      { status: 500 }
    );
  }
}

// PUT /api/courses/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const course = await updateCourse(id, {
      name: body.name,
      code: body.code,
      description: body.description,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error('Failed to update course:', error);

    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteCourse(id);

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Failed to delete course:', error);

    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}

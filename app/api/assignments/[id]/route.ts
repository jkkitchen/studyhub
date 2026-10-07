import { NextResponse } from 'next/server';
import {
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from '@/lib/db'; //Call server functions

// GET /api/assignments/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const assignment = await getAssignmentById(id);

    return NextResponse.json(assignment);
  } catch (error) {
    console.error('Failed to get assignment:', error);

    return NextResponse.json(
      { error: 'Failed to get assignment' },
      { status: 500 }
    );
  }
}

// PUT /api/assignments/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const assignment = await updateAssignment(id, {
      courseId: body.courseId,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      completed: body.completed,
    });

    return NextResponse.json(assignment);
  } catch (error) {
    console.error('Failed to update assignment:', error);

    return NextResponse.json(
      { error: 'Failed to update assignment' },
      { status: 500 }
    );
  }
}

// DELETE /api/assignments/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteAssignment(id);

    return NextResponse.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Failed to delete assignment:', error);

    return NextResponse.json(
      { error: 'Failed to delete assignment' },
      { status: 500 }
    );
  }
}

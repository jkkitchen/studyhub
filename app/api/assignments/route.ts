import { NextResponse } from 'next/server';
import { getAssignments, addAssignment } from '@/lib/db'; //Call server functions

// GET /api/assignments
export async function GET() {
  try {
    const assignments = await getAssignments();

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Failed to get assignments:', error);

    return NextResponse.json(
      { error: 'Failed to get assignments' },
      { status: 500 }
    );
  }
}

// POST /api/assignments
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const assignment = await addAssignment({
      courseId: body.courseId,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      completed: body.completed,
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error('Failed to create assignment:', error);

    return NextResponse.json(
      { error: 'Failed to create assignment' },
      { status: 500 }
    );
  }
}

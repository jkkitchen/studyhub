import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
// import { connectToDatabase } from '@/lib/mongodb'; will import it when database is setup well
import Course from '@/lib/models/Course';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    // await connectToDatabase();   requires proper database setup

    const course = await Course.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error('GET /api/courses/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const { name, code, description } = body;

    const update: Record<string, string> = {};
    if (typeof name === 'string' && name.trim()) update.name = name.trim();
    if (typeof code === 'string' && code.trim()) update.code = code.trim();
    if (typeof description === 'string')
      update.description = description.trim();

    // await connectToDatabase();   requires proper database setup

    const course = await Course.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      update,
      { new: true, runValidators: true }
    );

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error('PUT /api/courses/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    // await connectToDatabase();   requires proper database setup

    const course = await Course.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/courses/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
// import { connectToDatabase } from '@/lib/mongodb';  We will import it when the database has been fully setup well
import Course from '@/lib/models/Course'; 

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // await connectToDatabase(); Also needs connection from the database to work

    const courses = await Course.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error('GET /api/courses error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, code, description } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Course name is required' },
        { status: 400 }
      );
    }

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Course code is required' },
        { status: 400 }
      );
    }

    // await connectToDatabase(); Also requires proper database setup

    const course = await Course.create({
      userId: session.user.id,
      name: name.trim(),
      code: code.trim(),
      description: description?.trim() ?? '',
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error('POST /api/courses error:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}

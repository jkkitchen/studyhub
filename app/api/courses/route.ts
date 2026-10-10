import { NextResponse } from 'next/server';
import { getCourses, addCourse } from '@/lib/db'; //Call server functions

// GET /api/courses
export async function GET() {
  try {
    const courses = await getCourses();

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Failed to get courses:', error);

    return NextResponse.json(
      { error: 'Failed to get courses' },
      { status: 500 }
    );
  }
}

// POST /api/courses
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const course = await addCourse({
      name: body.name,
      code: body.code,
      description: body.description,
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Failed to create course:', error);

    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}

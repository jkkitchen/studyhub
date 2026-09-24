//Code to test that StudyHub can connect to Atlas
//Go to http://localhost:3000/api/test-db to see if it's connecting.
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      message: 'Successfully connected to MongoDB!',
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);

    return Response.json(
      { error: 'Failed to connect to MongoDB.' },
      { status: 500 }
    );
  }
}

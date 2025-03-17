import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Task Helper AI API is running' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Implement task processing logic
    return NextResponse.json({ message: 'Task received', data: body });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 400 }
    );
  }
} 
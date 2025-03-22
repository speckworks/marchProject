import { NextResponse } from 'next/server';
import type { Task } from '../../../types/task';

// In-memory storage for tasks (replace with database in production)
let tasks: Task[] = [];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const task = tasks.find(t => t.id === params.id);
    
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../../types/task';

// In-memory storage for tasks (replace with database in production)
let tasks: Task[] = [];

// Helper function to add CORS headers
function corsResponse(data: any, status: number = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return corsResponse({}, 200);
}

// GET /api/tasks - Get all tasks
export async function GET() {
  return corsResponse(tasks);
}

// POST /api/tasks - Create a new task
export async function POST(request: Request) {
  try {
    const body: CreateTaskRequest = await request.json();
    
    if (!body.title) {
      return corsResponse({ error: 'Title is required' }, 400);
    }

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: body.title,
      description: body.description || '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    return corsResponse(newTask);
  } catch (error) {
    return corsResponse({ error: 'Invalid request body' }, 400);
  }
}

// PUT /api/tasks - Update a task
export async function PUT(request: Request) {
  try {
    const body: UpdateTaskRequest & { id: string } = await request.json();
    
    if (!body.id) {
      return corsResponse({ error: 'Task ID is required' }, 400);
    }

    const taskIndex = tasks.findIndex(t => t.id === body.id);
    if (taskIndex === -1) {
      return corsResponse({ error: 'Task not found' }, 404);
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    return corsResponse(updatedTask);
  } catch (error) {
    return corsResponse({ error: 'Invalid request body' }, 400);
  }
}

// DELETE /api/tasks - Delete a task
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return corsResponse({ error: 'Task ID is required' }, 400);
  }

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return corsResponse({ error: 'Task not found' }, 404);
  }

  tasks = tasks.filter(t => t.id !== id);
  return corsResponse({ message: 'Task deleted successfully' });
} 
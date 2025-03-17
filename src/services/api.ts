const API_BASE_URL = 'http://localhost:3001/api';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const api = {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  async createTask(task: CreateTaskRequest): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  async updateTask(id: string, task: UpdateTaskRequest): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...task }),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },
}; 
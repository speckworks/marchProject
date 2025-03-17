'use client';

import { useState, useEffect } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import { api, Task as TaskType } from '@/services/api';

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string, description: string) => {
    try {
      const newTask = await api.createTask({ title, description });
      setTasks([...tasks, newTask]);
      setError(null);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  const updateTask = async (id: string, title: string, description: string) => {
    try {
      const updatedTask = await api.updateTask(id, { title, description });
      setTasks(tasks.map(task =>
        task.id === id ? updatedTask : task
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const updateTaskStatus = async (id: string, status: 'pending' | 'completed') => {
    try {
      const updatedTask = await api.updateTask(id, { completed: status === 'completed' });
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error('Error updating task status:', err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-teal mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-custom-coral mb-4">{error}</p>
        <button
          onClick={loadTasks}
          className="px-4 py-2 bg-custom-teal text-white rounded-md hover:bg-custom-teal/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <TaskForm onSubmit={addTask} />
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
        ) : (
          tasks.map(task => (
            <Task
              key={task.id}
              {...task}
              status={task.completed ? 'completed' : 'pending'}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))
        )}
      </div>
    </div>
  );
} 
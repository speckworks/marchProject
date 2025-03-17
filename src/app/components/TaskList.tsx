'use client';

import { useState } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const addTask = (title: string, description: string) => {
    const newTask: TaskItem = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status: 'pending',
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, title: string, description: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title, description } : task
    ));
  };

  const updateTaskStatus = (id: string, status: 'pending' | 'completed') => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

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
'use client';

import { useState } from 'react';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="border-[2px] border-custom-navy rounded-[2.5rem] mb-20">
      <div className="border-[2px] border-custom-teal rounded-[2.4rem]">
        <div className="border-[2px] border-custom-cream rounded-[2.3rem]">
          <div className="border-[2px] border-custom-peach rounded-[2.2rem]">
            <div className="border-[2px] border-custom-coral rounded-[2.1rem]">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2rem]">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-custom-navy mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border-2 border-custom-cream rounded-md focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-custom-teal"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-custom-navy mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border-2 border-custom-cream rounded-md focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-custom-teal"
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-custom-navy text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out hover:bg-[#008f11] focus:outline-none focus:ring-2 focus:ring-[#008f11] focus:ring-offset-2"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
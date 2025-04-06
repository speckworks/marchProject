'use client';

import { useState } from 'react';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTaskDescription = async () => {
    if (!title) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      
      const data = await response.json();
      setDescription(data.description);
    } catch (error) {
      console.error('Failed to generate description:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="border-[2px] border-custom-navy rounded-[2.5rem] mb-5">
      <div className="border-[2px] border-custom-teal rounded-[2.4rem]">
        <div className="border-[2px] border-custom-cream rounded-[2.3rem]">
          <div className="border-[2px] border-custom-peach rounded-[2.2rem]">
            <div className="border-[2px] border-custom-coral rounded-[2.1rem]">
              <form 
                className="space-y-4 bg-white p-6 rounded-[2.5rem] shadow"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!title.trim()) return;
                  await onSubmit(title, description);
                  setTitle('');
                  setDescription('');
                }}
              >
                <div>
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
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-custom-navy">
                    Description
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border-2 border-custom-cream rounded-md focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-custom-teal"
                      placeholder="Enter task description"
                      rows={3}
                    />
                    <button
                      type="button"
                      onClick={generateTaskDescription}
                      disabled={!title || isGenerating}
                      className="px-4 py-2 bg-custom-teal text-white rounded disabled:opacity-50"
                    >
                      {isGenerating ? 'Generating...' : 'AI Assist'}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!title}
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
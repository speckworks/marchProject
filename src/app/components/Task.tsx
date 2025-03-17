'use client';

import { useState } from 'react';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  onStatusChange: (id: string, status: 'pending' | 'completed') => void;
  onDelete: (id: string) => void;
}

export default function Task({ id, title, description, status, onStatusChange, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="border-[2px] border-custom-navy rounded-[2.5rem] mb-6">
      <div className="border-[2px] border-custom-teal rounded-[2.4rem]">
        <div className="border-[2px] border-custom-cream rounded-[2.3rem]">
          <div className="border-[2px] border-custom-peach rounded-[2.2rem]">
            <div className="border-[2px] border-custom-coral rounded-[2.1rem]">
              <div className="bg-white p-6 rounded-[2rem]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={status === 'completed'}
                      onChange={(e) => onStatusChange(id, e.target.checked ? 'completed' : 'pending')}
                      className="w-5 h-5 text-custom-teal rounded border-2 border-custom-cream focus:ring-custom-teal"
                    />
                    <div>
                      <h3 className={`text-lg font-semibold ${status === 'completed' ? 'line-through text-custom-navy/50' : 'text-custom-navy'}`}>
                        {title}
                      </h3>
                      <p className={`text-sm ${status === 'completed' ? 'line-through text-custom-navy/40' : 'text-custom-navy/70'}`}>
                        {description}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-3 py-1 text-sm border-2 border-custom-teal text-custom-teal hover:bg-custom-teal hover:text-white rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(id)}
                      className="px-3 py-1 text-sm border-2 border-custom-coral text-custom-coral hover:bg-custom-coral hover:text-white rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
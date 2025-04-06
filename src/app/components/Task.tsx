'use client';

import { useState } from 'react';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  onStatusChange: (id: string, status: 'pending' | 'completed') => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
}

export default function Task({
  id,
  title,
  description,
  status,
  onStatusChange,
  onDelete,
  onUpdate
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  return (
    <div className="border-[2px] border-custom-navy rounded-[2.5rem]">
      <div className="border-[2px] border-custom-teal rounded-[2.4rem]">
        <div className="border-[2px] border-custom-cream rounded-[2.3rem]">
          <div className="border-[2px] border-custom-peach rounded-[2.2rem]">
            <div className="border-[2px] border-custom-coral rounded-[2.1rem]">
              <div className="bg-white p-6 rounded-[2rem]">
                {isEditing ? (
                  // Edit mode - full width form
                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={status === 'completed'}
                        onChange={(e) => onStatusChange(id, e.target.checked ? 'completed' : 'pending')}
                        className="w-5 h-5 text-custom-teal rounded border-2 border-custom-cream focus:ring-custom-teal"
                      />
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 p-2 border rounded"
                      />
                    </div>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full p-2 border rounded font-sans min-h-[120px]"
                      rows={5}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          onUpdate(id, editTitle, editDescription);
                          setIsEditing(false);
                        }}
                        className="px-3 py-1 text-sm border-2 border-custom-teal text-custom-teal hover:bg-custom-teal hover:text-white rounded-md transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditTitle(title);
                          setEditDescription(description);
                          setIsEditing(false);
                        }}
                        className="px-3 py-1 text-sm border-2 border-custom-coral text-custom-coral hover:bg-custom-coral hover:text-white rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={status === 'completed'}
                        onChange={(e) => onStatusChange(id, e.target.checked ? 'completed' : 'pending')}
                        className="w-5 h-5 text-custom-teal rounded border-2 border-custom-cream focus:ring-custom-teal"
                      />
                      <div className="pr-5">
                        <h3 className={`text-lg font-semibold ${status === 'completed' ? 'line-through text-custom-navy/50' : 'text-custom-navy'}`}>
                          {title}
                        </h3>
                        <pre className={`whitespace-pre-wrap font-sans text-sm ${status === 'completed' ? 'line-through text-custom-navy/40' : 'text-custom-navy/70'}`}>
                          {description}
                        </pre>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
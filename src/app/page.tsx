import TaskList from './components/TaskList';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="border-b-[3px] border-custom-navy">
        <div className="border-b-[3px] border-custom-teal">
          <div className="border-b-[3px] border-custom-cream">
            <div className="border-b-[3px] border-custom-peach">
              <div className="border-b-[3px] border-custom-coral bg-white">
                <div className="max-w-7xl mx-auto px-4 py-6">
                  <h1 className="text-4xl font-bold text-custom-navy">
                    TaskHelper AI
                  </h1>
                  <p className="mt-2 text-custom-teal font-medium">
                    Manage your tasks efficiently with AI assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <TaskList />
      </div>
    </main>
  );
} 
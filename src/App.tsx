import { useState } from 'react';
import { useProgress } from './hooks/useProgress';
import type { TopicId, View } from './types';
import { Dashboard } from './views/Dashboard';
import { Learn } from './views/Learn';
import { Practice } from './views/Practice';
import { Flashcards } from './views/Flashcards';
import { MyProgress } from './views/MyProgress';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const progress = useProgress();
  const [view, setView] = useState<View>(
    (progress.state.lastView as View) || 'dashboard'
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navigate = (v: View) => {
    setView(v);
    progress.setLastView(v);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <Sidebar
          view={view}
          onNavigate={navigate}
          mobileOpen={mobileNavOpen}
          onMobileToggle={() => setMobileNavOpen((o) => !o)}
        />
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
            {view === 'dashboard' && (
              <Dashboard
              progress={progress}
              onNavigate={navigate}
            />
            )}
            {view === 'learn' && (
              <Learn
                progress={progress}
                onPractice={(topicId: TopicId) => {
                  progress.setLastView('practice', topicId);
                  navigate('practice');
                }}
              />
            )}
            {view === 'practice' && (
              <Practice progress={progress} onNavigate={navigate} />
            )}
            {view === 'flashcards' && <Flashcards progress={progress} />}
            {view === 'progress' && (
              <MyProgress progress={progress} onNavigate={navigate} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

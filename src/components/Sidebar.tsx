import { Icon } from './Icon';
import type { View } from '../types';

interface NavItem {
  id: View;
  label: string;
  icon: string;
}

const items: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'learn', label: 'Learn', icon: 'BookOpen' },
  { id: 'practice', label: 'Practice', icon: 'Brain' },
  { id: 'flashcards', label: 'Flashcards', icon: 'Layers' },
  { id: 'progress', label: 'My Progress', icon: 'TrendingUp' },
];

export function Sidebar({
  view,
  onNavigate,
  mobileOpen,
  onMobileToggle,
}: {
  view: View;
  onNavigate: (v: View) => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}) {
  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-white/90 backdrop-blur border-b border-slate-200 px-4 py-3">
        <button
          onClick={onMobileToggle}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <Brand />
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-slate-900/30"
          onClick={onMobileToggle}
        />
      )}

      <aside
        className={`${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 h-screen lg:h-screen w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col transition-transform duration-200`}
      >
        <div className="hidden lg:flex px-5 py-6 items-center gap-2.5 border-b border-slate-100">
          <Brand />
        </div>
        <div className="lg:hidden px-5 py-5 flex items-center justify-between border-b border-slate-100">
          <Brand />
          <button
            onClick={onMobileToggle}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {items.map((it) => {
            const active = view === it.id;
            return (
              <button
                key={it.id}
                onClick={() => onNavigate(it.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon
                  name={it.icon}
                  className={`h-5 w-5 ${
                    active ? 'text-brand-600' : 'text-slate-400'
                  }`}
                />
                {it.label}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 leading-relaxed">
            Study companion for the AZ-900 exam. Practice scores do not guarantee
            exam readiness.
          </p>
        </div>
      </aside>
    </>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
        <Icon name="Cloud" className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-bold tracking-wide text-slate-900">
          AZURE ACE
        </p>
        <p className="text-[11px] text-slate-400">AZ-900 Study Companion</p>
      </div>
    </div>
  );
}

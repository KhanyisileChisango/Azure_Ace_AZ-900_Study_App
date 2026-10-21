import { Icon } from '../components/Icon';
import { lessons } from '../data/lessons';
import { quizQuestions } from '../data/questions';
import { flashcards } from '../data/flashcards';
import { topics } from '../data/topics';
import type { useProgress } from '../hooks/useProgress';
import type { View } from '../types';

type Progress = ReturnType<typeof useProgress>;

export function Dashboard({
  progress,
  onNavigate,
}: {
  progress: Progress;
  onNavigate: (v: View) => void;
}) {
  const { state } = progress;
  const totalLessons = lessons.length;
  const completedLessons = state.lessonsCompleted.length;
  const overallPct = Math.round((completedLessons / totalLessons) * 100);

  const accuracy =
    state.quiz.answered > 0
      ? Math.round((state.quiz.correct / state.quiz.answered) * 100)
      : 0;

  const weakestTopics = topics
    .map((t) => {
      const stat = state.quiz.byTopic[t.id];
      const acc = stat && stat.total > 0 ? stat.correct / stat.total : null;
      return { topic: t, acc, answered: stat?.total ?? 0 };
    })
    .filter((x) => x.acc !== null && x.acc < 0.7)
    .sort((a, b) => (a.acc ?? 0) - (b.acc ?? 0));

  const hasActivity =
    completedLessons > 0 ||
    state.quiz.answered > 0 ||
    state.flashcards.reviewed > 0;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-brand-600">Welcome back</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
          Let's keep building your Azure knowledge
        </h1>
        <p className="mt-2 text-slate-500 max-w-2xl">
          Learn core cloud concepts, practice with exam-style questions, review
          flashcards, and track your progress toward the AZ-900 certification.
        </p>
      </header>

      {/* Continue studying hero */}
      <section className="card relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              {hasActivity ? 'Pick up where you left off' : 'Start your journey'}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              {hasActivity
                ? `You've completed ${overallPct}% of lessons`
                : 'Your first lesson awaits'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {hasActivity
                ? `${completedLessons} of ${totalLessons} lessons completed · ${state.quiz.answered} questions answered`
                : 'Begin with cloud concepts to understand the fundamentals.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('learn')}
            className="btn-primary shrink-0"
          >
            Continue Studying
            <Icon name="ArrowRight" className="h-4 w-4" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="relative mt-6">
          <div className="h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-brand-500 transition-all"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon="Target"
          label="Questions answered"
          value={state.quiz.answered.toString()}
          sub={hasActivity ? `${accuracy}% accuracy` : 'No activity yet'}
        />
        <StatCard
          icon="CheckCircle2"
          label="Correct answers"
          value={state.quiz.correct.toString()}
          sub={
            state.quiz.answered > 0
              ? `out of ${state.quiz.answered}`
              : 'Start practicing'
          }
        />
        <StatCard
          icon="BookMarked"
          label="Lessons completed"
          value={`${completedLessons}/${totalLessons}`}
          sub={`${totalLessons - completedLessons} remaining`}
        />
      </section>

      {/* Topics needing revision */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Topics needing revision
          </h2>
          <button
            onClick={() => onNavigate('progress')}
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all
          </button>
        </div>
        {weakestTopics.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-sm text-slate-500">
              {state.quiz.answered === 0
                ? 'Answer a few practice questions and we will suggest topics to revisit.'
                : 'Great work — no weak topics detected yet. Keep practicing!'}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {weakestTopics.map(({ topic, acc, answered }) => (
              <button
                key={topic.id}
                onClick={() => onNavigate('practice')}
                className="card w-full flex items-center gap-4 p-4 text-left transition hover:shadow-card-hover"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
                  <Icon name={topic.icon} className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {topic.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {answered} answered · {Math.round((acc ?? 0) * 100)}% accuracy
                  </p>
                </div>
                <Icon
                  name="ArrowRight"
                  className="h-4 w-4 text-slate-300"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Shortcuts */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Shortcuts</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Shortcut
            icon="BookOpen"
            label="Learn"
            desc={`${totalLessons} lessons`}
            onClick={() => onNavigate('learn')}
          />
          <Shortcut
            icon="Brain"
            label="Practice"
            desc={`${quizQuestions.length} questions`}
            onClick={() => onNavigate('practice')}
          />
          <Shortcut
            icon="Layers"
            label="Flashcards"
            desc={`${flashcards.length} cards`}
            onClick={() => onNavigate('flashcards')}
          />
          <Shortcut
            icon="TrendingUp"
            label="My Progress"
            desc="See your stats"
            onClick={() => onNavigate('progress')}
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

function Shortcut({
  icon,
  label,
  desc,
  onClick,
}: {
  icon: string;
  label: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="card p-4 flex flex-col gap-2 items-start transition hover:shadow-card-hover hover:-translate-y-0.5"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 text-brand-600">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </button>
  );
}

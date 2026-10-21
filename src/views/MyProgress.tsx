import { useState } from 'react';
import { Icon } from '../components/Icon';
import { lessons } from '../data/lessons';
import { quizQuestions } from '../data/questions';
import { flashcards } from '../data/flashcards';
import { topics } from '../data/topics';
import type { useProgress } from '../hooks/useProgress';
import type { TopicId, View } from '../types';

type Progress = ReturnType<typeof useProgress>;

export function MyProgress({
  progress,
  onNavigate,
}: {
  progress: Progress;
  onNavigate: (v: View) => void;
}) {
  const { state } = progress;

  const accuracy =
    state.quiz.answered > 0
      ? Math.round((state.quiz.correct / state.quiz.answered) * 100)
      : 0;

  const completedLessons = state.lessonsCompleted.length;
  const totalLessons = lessons.length;

  const cardsReviewed = Object.keys(state.flashcards.status).filter(
    (id) => state.flashcards.status[id] !== 'unseen'
  ).length;

  // accuracy by topic + recommendation
  const topicStats = topics.map((t) => {
    const stat = state.quiz.byTopic[t.id];
    const lessonCount = lessons.filter((l) => l.topicId === t.id).length;
    const lessonsDone = lessons.filter(
      (l) => l.topicId === t.id && state.lessonsCompleted.includes(l.id)
    ).length;
    const acc = stat && stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : null;
    const lessonPct = Math.round((lessonsDone / lessonCount) * 100);
    return {
      topic: t,
      answered: stat?.total ?? 0,
      correct: stat?.correct ?? 0,
      acc,
      lessonPct,
      lessonsDone,
      lessonCount,
    };
  });

  // recommendation: lowest accuracy with answered > 0, else least completed lessons
  const answeredTopics = topicStats.filter((t) => t.answered > 0);
  let recommendation: { topicId: TopicId; reason: string } | null = null;
  if (answeredTopics.length > 0) {
    const weakest = [...answeredTopics].sort((a, b) => (a.acc ?? 0) - (b.acc ?? 0))[0];
    if ((weakest.acc ?? 100) < 80) {
      recommendation = {
        topicId: weakest.topic.id,
        reason: `Your accuracy in this topic is ${weakest.acc}%.`,
      };
    }
  }
  if (!recommendation) {
    const leastDone = [...topicStats].sort(
      (a, b) => a.lessonPct - b.lessonPct
    )[0];
    if (leastDone.lessonPct < 100) {
      recommendation = {
        topicId: leastDone.topic.id,
        reason: `You've completed ${leastDone.lessonPct}% of lessons here.`,
      };
    }
  }

  const hasActivity =
    completedLessons > 0 ||
    state.quiz.answered > 0 ||
    cardsReviewed > 0;

  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My Progress
          </h1>
          <p className="mt-2 text-slate-500 max-w-2xl">
            See how you're doing across each AZ-900 area, and get a suggestion
            for what to study next.
          </p>
        </div>
      </header>

      {!hasActivity ? (
        <EmptyState onNavigate={onNavigate} />
      ) : (
        <>
          {/* Overall stats */}
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatTile
              icon="Target"
              label="Questions answered"
              value={state.quiz.answered.toString()}
            />
            <StatTile
              icon="CheckCircle2"
              label="Correct answers"
              value={state.quiz.correct.toString()}
              sub={`${accuracy}% accuracy`}
            />
            <StatTile
              icon="BookMarked"
              label="Lessons completed"
              value={`${completedLessons}/${totalLessons}`}
            />
            <StatTile
              icon="Layers"
              label="Flashcards reviewed"
              value={`${cardsReviewed}/${flashcards.length}`}
            />
          </section>

          {/* Recommendation */}
          {recommendation && (
            <section className="card relative overflow-hidden p-5 sm:p-6">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-100/60 blur-3xl" />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shrink-0">
                    <Icon name="Sparkles" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                      Suggested next
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      Study:{' '}
                      {topics.find((t) => t.id === recommendation.topicId)?.title}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {recommendation.reason}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => onNavigate('learn')}
                    className="btn-ghost"
                  >
                    Learn
                  </button>
                  <button
                    onClick={() => onNavigate('practice')}
                    className="btn-primary"
                  >
                    Practice
                    <Icon name="ArrowRight" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Topic breakdown */}
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Accuracy by topic
            </h2>
            <div className="space-y-3">
              {topicStats.map(
                ({ topic, answered, correct, acc, lessonPct, lessonsDone, lessonCount }) => (
                  <div key={topic.id} className="card p-5">
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 shrink-0">
                        <Icon name={topic.icon} className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          {topic.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {answered} questions answered · {lessonsDone}/{lessonCount} lessons
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        {acc !== null ? (
                          <>
                            <p
                              className={`text-xl font-bold ${
                                (acc ?? 0) >= 70
                                  ? 'text-emerald-600'
                                  : (acc ?? 0) >= 50
                                  ? 'text-amber-600'
                                  : 'text-rose-600'
                              }`}
                            >
                              {acc}%
                            </p>
                            <p className="text-xs text-slate-400">accuracy</p>
                          </>
                        ) : (
                          <p className="text-sm text-slate-400">No data</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <ProgressRow label="Questions" pct={acc ?? 0} active={answered > 0} />
                      <ProgressRow label="Lessons" pct={lessonPct} active />
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </>
      )}

      {/* Reset */}
      <section className="border-t border-slate-200 pt-6">
        {confirmReset ? (
          <div className="card p-5">
            <p className="text-sm font-semibold text-slate-900">
              Reset all progress?
            </p>
            <p className="mt-1 text-sm text-slate-500">
              This clears your lessons, quiz history, and flashcard marks from
              this browser. This cannot be undone.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  progress.reset();
                  setConfirmReset(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
              >
                <Icon name="Trash2" className="h-4 w-4" />
                Yes, reset everything
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-700"
          >
            <Icon name="Trash2" className="h-4 w-4" />
            Reset demo progress
          </button>
        )}
      </section>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="card p-4">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
        <Icon name={icon} className="h-4.5 w-4.5" />
      </div>
      <p className="mt-3 text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-xl font-bold text-slate-900">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

function ProgressRow({
  label,
  pct,
  active,
}: {
  label: string;
  pct: number;
  active: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-xs text-slate-400">{active ? `${pct}%` : '—'}</p>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100">
        <div
          className={`h-1.5 rounded-full transition-all ${
            active ? 'bg-brand-500' : 'bg-slate-200'
          }`}
          style={{ width: `${active ? pct : 0}%` }}
        />
      </div>
    </div>
  );
}

function EmptyState({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div className="card p-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon name="Sparkles" className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">
        No study activity yet
      </h2>
      <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
        Once you start lessons, practice quizzes, or flashcards, your progress
        will appear here — along with a recommendation for what to study next.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <button onClick={() => onNavigate('learn')} className="btn-primary">
          Start learning
          <Icon name="ArrowRight" className="h-4 w-4" />
        </button>
        <button onClick={() => onNavigate('practice')} className="btn-ghost">
          Try a quiz
        </button>
      </div>
    </div>
  );
}

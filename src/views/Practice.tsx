import { useMemo, useState } from 'react';
import { Icon } from '../components/Icon';
import { quizQuestions } from '../data/questions';
import { topics, topicMap } from '../data/topics';
import type { useProgress } from '../hooks/useProgress';
import type { QuizQuestion, TopicId, View } from '../types';

type Progress = ReturnType<typeof useProgress>;

type Mode = 'menu' | 'quiz' | 'results' | 'review';

export function Practice({
  progress,
  onNavigate,
}: {
  progress: Progress;
  onNavigate: (v: View) => void;
}) {
  const [mode, setMode] = useState<Mode>('menu');
  const [topicFilter, setTopicFilter] = useState<TopicId | 'all' | 'incorrect'>(
    'all'
  );
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionIncorrectIds, setSessionIncorrectIds] = useState<string[]>([]);

  const start = (filter: TopicId | 'all' | 'incorrect') => {
    let qs: QuizQuestion[] = [];
    if (filter === 'all') {
      qs = shuffle(quizQuestions);
    } else if (filter === 'incorrect') {
      const ids = progress.state.quiz.incorrectQuestionIds;
      qs = quizQuestions.filter((q) => ids.includes(q.id));
      if (qs.length === 0) {
        // nothing to review
        return;
      }
      qs = shuffle(qs);
    } else {
      qs = shuffle(quizQuestions.filter((q) => q.topicId === filter));
    }
    setTopicFilter(filter);
    setActiveQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setChecked(false);
    setSessionCorrect(0);
    setSessionIncorrectIds([]);
    setMode('quiz');
  };

  const check = () => {
    if (selected === null) return;
    const q = activeQuestions[current];
    const isCorrect = selected === q.answerIndex;
    const seenBefore = progress.state.quiz.questionIdsSeen.includes(q.id);
    progress.recordQuizAnswer(q.id, q.topicId, isCorrect, seenBefore);
    if (isCorrect) setSessionCorrect((c) => c + 1);
    else setSessionIncorrectIds((ids) => [...ids, q.id]);
    setChecked(true);
  };

  const next = () => {
    if (current + 1 >= activeQuestions.length) {
      setMode('results');
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setChecked(false);
  };

  if (mode === 'quiz') {
    return (
      <QuizView
        questions={activeQuestions}
        current={current}
        selected={selected}
        checked={checked}
        onSelect={(i) => !checked && setSelected(i)}
        onCheck={check}
        onNext={next}
        onExit={() => setMode('menu')}
      />
    );
  }

  if (mode === 'results') {
    return (
      <ResultsView
        total={activeQuestions.length}
        correct={sessionCorrect}
        incorrectIds={sessionIncorrectIds}
        filter={topicFilter}
        onRetake={() => start(topicFilter)}
        onReview={() => setMode('review')}
        onMenu={() => setMode('menu')}
      />
    );
  }

  if (mode === 'review') {
    return (
      <ReviewView
        questions={activeQuestions.filter((q) =>
          sessionIncorrectIds.includes(q.id)
        )}
        onMenu={() => setMode('menu')}
        onRetake={() => start(topicFilter)}
      />
    );
  }

  // mode === 'menu'
  return (
    <PracticeMenu
      progress={progress}
      onStart={start}
      onNavigate={onNavigate}
    />
  );
}

function PracticeMenu({
  progress,
  onStart,
  onNavigate,
}: {
  progress: Progress;
  onStart: (f: TopicId | 'all' | 'incorrect') => void;
  onNavigate: (v: View) => void;
}) {
  const incorrectCount = progress.state.quiz.incorrectQuestionIds.length;
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Practice
        </h1>
        <p className="mt-2 text-slate-500 max-w-2xl">
          Test your knowledge with exam-style questions. Choose a topic or take
          a mixed quiz. You'll get immediate feedback and explanations after
          each answer.
        </p>
      </header>

      {/* Full quiz */}
      <button
        onClick={() => onStart('all')}
        className="card w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 text-left transition hover:shadow-card-hover"
      >
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white">
            <Icon name="Brain" className="h-6 w-6" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">
              Full practice quiz
            </p>
            <p className="text-sm text-slate-500">
              {quizQuestions.length} questions across all three areas
            </p>
          </div>
        </div>
        <span className="btn-primary self-start sm:self-auto">
          Start quiz
          <Icon name="ArrowRight" className="h-4 w-4" />
        </span>
      </button>

      {/* Incorrect review */}
      <button
        onClick={() => onStart('incorrect')}
        disabled={incorrectCount === 0}
        className="card w-full flex items-center justify-between gap-4 p-5 text-left transition hover:shadow-card-hover disabled:opacity-60 disabled:hover:shadow-card"
      >
        <div className="flex items-center gap-4">
          <div
            className={`grid h-12 w-12 place-items-center rounded-xl ${
              incorrectCount > 0
                ? 'bg-amber-50 text-amber-600'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Icon name="RotateCcw" className="h-6 w-6" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">
              Review incorrect answers
            </p>
            <p className="text-sm text-slate-500">
              {incorrectCount > 0
                ? `${incorrectCount} question${
                    incorrectCount === 1 ? '' : 's'
                  } to revisit`
                : 'No incorrect answers to review yet'}
            </p>
          </div>
        </div>
        <Icon name="ArrowRight" className="h-5 w-5 text-slate-300" />
      </button>

      {/* Topic practice */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">
          Practice by topic
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {topics.map((topic) => {
            const count = quizQuestions.filter(
              (q) => q.topicId === topic.id
            ).length;
            return (
              <button
                key={topic.id}
                onClick={() => onStart(topic.id)}
                className="card p-5 text-left transition hover:shadow-card-hover hover:-translate-y-0.5"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={topic.icon} className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {topic.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">{count} questions</p>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Tip: practice scores are study aids, not a guarantee of exam readiness.
        Visit{' '}
        <button
          onClick={() => onNavigate('progress')}
          className="text-brand-600 font-medium hover:underline"
        >
          My Progress
        </button>{' '}
        to see accuracy by topic.
      </p>
    </div>
  );
}

function QuizView({
  questions,
  current,
  selected,
  checked,
  onSelect,
  onCheck,
  onNext,
  onExit,
}: {
  questions: QuizQuestion[];
  current: number;
  selected: number | null;
  checked: boolean;
  onSelect: (i: number) => void;
  onCheck: () => void;
  onNext: () => void;
  onExit: () => void;
}) {
  const q = questions[current];
  const topic = topicMap[q.topicId];
  const isCorrect = checked && selected === q.answerIndex;
  const pct = Math.round(((current + (checked ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <Icon name="ArrowLeft" className="h-4 w-4" />
          Exit quiz
        </button>
        <p className="text-sm font-medium text-slate-500">
          Question {current + 1} of {questions.length}
        </p>
      </div>

      <div className="h-1.5 w-full rounded-full bg-slate-100">
        <div
          className="h-1.5 rounded-full bg-brand-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="card p-5 sm:p-6">
        <span className="chip bg-brand-50 text-brand-700">
          <Icon name={topic.icon} className="h-3.5 w-3.5" />
          {topic.title}
        </span>
        <h2 className="mt-3 text-lg font-semibold text-slate-900">
          {q.question}
        </h2>

        <div className="mt-4 space-y-2.5">
          {q.options.map((opt, i) => {
            const isSel = selected === i;
            const isAns = i === q.answerIndex;
            let cls =
              'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition';
            if (!checked) {
              cls += isSel
                ? ' border-brand-500 bg-brand-50 text-slate-900 ring-1 ring-brand-300'
                : ' border-slate-200 hover:border-brand-300 hover:bg-slate-50';
            } else if (isAns) {
              cls += ' border-emerald-500 bg-emerald-50 text-emerald-800';
            } else if (isSel) {
              cls += ' border-red-400 bg-red-50 text-red-700';
            } else {
              cls += ' border-slate-200 text-slate-500';
            }
            return (
              <button
                key={i}
                disabled={checked}
                onClick={() => onSelect(i)}
                className={cls}
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full border text-xs font-semibold shrink-0 ${
                    checked && isAns
                      ? 'border-emerald-500 text-emerald-600'
                      : checked && isSel
                      ? 'border-red-400 text-red-500'
                      : 'border-current'
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {!checked ? (
          <div className="mt-5 flex justify-end">
            <button
              onClick={onCheck}
              disabled={selected === null}
              className="btn-primary"
            >
              Submit answer
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div
              className={`rounded-xl p-4 ${
                isCorrect ? 'bg-emerald-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <Icon
                    name="CheckCircle2"
                    className="h-5 w-5 text-emerald-600"
                  />
                ) : (
                  <Icon name="XCircle" className="h-5 w-5 text-red-500" />
                )}
                <p
                  className={`text-sm font-semibold ${
                    isCorrect ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {isCorrect ? 'Correct!' : 'Not quite'}
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-700">{q.explanation}</p>
            </div>
            <div className="flex justify-end">
              <button onClick={onNext} className="btn-primary">
                {current + 1 >= questions.length ? 'See results' : 'Next question'}
                <Icon name="ArrowRight" className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultsView({
  total,
  correct,
  incorrectIds,
  filter,
  onRetake,
  onReview,
  onMenu,
}: {
  total: number;
  correct: number;
  incorrectIds: string[];
  filter: TopicId | 'all' | 'incorrect';
  onRetake: () => void;
  onReview: () => void;
  onMenu: () => void;
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const incorrectCount = incorrectIds.length;
  const pass = pct >= 70;
  const label =
    filter === 'all'
      ? 'Full quiz'
      : filter === 'incorrect'
      ? 'Review quiz'
      : topicMap[filter]?.title ?? 'Quiz';

  return (
    <div className="space-y-6">
      <div className="card p-6 sm:p-8 text-center">
        <div
          className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl ${
            pass ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}
        >
          <Icon name="Trophy" className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          {pass ? 'Nicely done!' : 'Keep practicing!'}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {label} · {correct} of {total} correct
        </p>

        <div className="mt-6 flex items-center justify-center gap-1">
          <span className="text-5xl font-bold text-slate-900">{pct}%</span>
          <span className="text-sm text-slate-400 mb-1">score</span>
        </div>

        <div className="mx-auto mt-5 max-w-sm h-2.5 w-full rounded-full bg-slate-100">
          <div
            className={`h-2.5 rounded-full transition-all ${
              pass ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Practice scores are study aids — they do not guarantee exam readiness.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-4 text-center">
          <p className="text-xs font-medium text-slate-500">Answered</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{total}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs font-medium text-slate-500">Correct</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{correct}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs font-medium text-slate-500">Incorrect</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">
            {incorrectCount}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        {incorrectCount > 0 && (
          <button onClick={onReview} className="btn-ghost">
            <Icon name="ListChecks" className="h-4 w-4" />
            Review incorrect answers
          </button>
        )}
        <button onClick={onRetake} className="btn-primary">
          <Icon name="RefreshCw" className="h-4 w-4" />
          Take this quiz again
        </button>
        <button onClick={onMenu} className="btn-ghost">
          Back to practice menu
        </button>
      </div>
    </div>
  );
}

function ReviewView({
  questions,
  onMenu,
  onRetake,
}: {
  questions: QuizQuestion[];
  onMenu: () => void;
  onRetake: () => void;
}) {
  return (
    <div className="space-y-6">
      <button
        onClick={onMenu}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <Icon name="ArrowLeft" className="h-4 w-4" />
        Back to results
      </button>

      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Review incorrect answers
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {questions.length} question{questions.length === 1 ? '' : 's'} to
          review. The correct answer is highlighted for each.
        </p>
      </header>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const topic = topicMap[q.topicId];
          return (
            <div key={q.id} className="card p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="chip bg-brand-50 text-brand-700">
                  <Icon name={topic.icon} className="h-3.5 w-3.5" />
                  {topic.title}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  Question {idx + 1}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">
                {q.question}
              </p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, i) => {
                  const isAns = i === q.answerIndex;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm ${
                        isAns
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full border text-xs font-semibold shrink-0 ${
                          isAns
                            ? 'border-emerald-500 text-emerald-600'
                            : 'border-slate-300 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                      {isAns && (
                        <Icon
                          name="CheckCircle2"
                          className="h-4 w-4 ml-auto text-emerald-600"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Explanation
                </p>
                <p className="mt-1 text-sm text-slate-700">{q.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button onClick={onRetake} className="btn-primary">
          <Icon name="RefreshCw" className="h-4 w-4" />
          Try these again
        </button>
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

import { useState } from 'react';
import { Icon } from '../components/Icon';
import { lessons } from '../data/lessons';
import { topics, topicMap } from '../data/topics';
import { quizQuestions } from '../data/questions';
import type { useProgress } from '../hooks/useProgress';
import type { Lesson, TopicId } from '../types';

type Progress = ReturnType<typeof useProgress>;

export function Learn({
  progress,
  onPractice,
}: {
  progress: Progress;
  onPractice: (topicId: TopicId) => void;
}) {
  const [openTopic, setOpenTopic] = useState<TopicId | null>(null);
  const [openLesson, setOpenLesson] = useState<Lesson | null>(null);

  if (openLesson) {
    return (
      <LessonView
        lesson={openLesson}
        progress={progress}
        onBack={() => setOpenLesson(null)}
        onPractice={() => onPractice(openLesson.topicId)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Learn</h1>
        <p className="mt-2 text-slate-500 max-w-2xl">
          Study material organized into the three core areas of the AZ-900 exam.
          Each lesson includes a plain explanation, a real-world analogy, a
          business example, and a quick knowledge check.
        </p>
      </header>

      <div className="space-y-5">
        {topics.map((topic) => {
          const topicLessons = lessons.filter((l) => l.topicId === topic.id);
          const completedCount = topicLessons.filter((l) =>
            progress.state.lessonsCompleted.includes(l.id)
          ).length;
          const expanded = openTopic === topic.id;
          const qCount = quizQuestions.filter(
            (q) => q.topicId === topic.id
          ).length;

          return (
            <div key={topic.id} className="card overflow-hidden">
              <button
                onClick={() =>
                  setOpenTopic(expanded ? null : topic.id)
                }
                className="w-full flex items-center gap-4 p-5 text-left transition hover:bg-slate-50"
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 shrink-0`}
                >
                  <Icon name={topic.icon} className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-slate-900">
                      {topic.title}
                    </h2>
                    <span className="chip bg-slate-100 text-slate-500">
                      {completedCount}/{topicLessons.length}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500 truncate">
                    {topic.subtitle}
                  </p>
                </div>
                <Icon
                  name="ArrowRight"
                  className={`h-5 w-5 text-slate-400 transition-transform ${
                    expanded ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {expanded && (
                <div className="border-t border-slate-100 px-3 py-3 sm:px-5">
                  <ul className="space-y-1">
                    {topicLessons.map((lesson) => {
                      const done = progress.state.lessonsCompleted.includes(
                        lesson.id
                      );
                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => setOpenLesson(lesson)}
                            className="w-full flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-slate-50"
                          >
                            <div
                              className={`grid h-7 w-7 place-items-center rounded-lg shrink-0 ${
                                done
                                  ? 'bg-emerald-50 text-emerald-600'
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              <Icon
                                name={done ? 'CheckCircle2' : 'BookOpen'}
                                className="h-4 w-4"
                              />
                            </div>
                            <span className="flex-1 text-sm font-medium text-slate-800">
                              {lesson.title}
                            </span>
                            <Icon
                              name="ArrowRight"
                              className="h-4 w-4 text-slate-300"
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                    <p className="text-xs text-slate-500">
                      {qCount} practice questions available for this topic
                    </p>
                    <button
                      onClick={() => onPractice(topic.id)}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Practice this topic
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LessonView({
  lesson,
  progress,
  onBack,
  onPractice,
}: {
  lesson: Lesson;
  progress: Progress;
  onBack: () => void;
  onPractice: () => void;
}) {
  const topic = topicMap[lesson.topicId];
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const alreadyDone = progress.state.lessonsCompleted.includes(lesson.id);

  const isCorrect = selected === lesson.knowledgeCheck.answerIndex;

  const handleCheck = () => {
    if (selected === null) return;
    setChecked(true);
    if (!alreadyDone) progress.completeLesson(lesson.id);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <Icon name="ArrowLeft" className="h-4 w-4" />
        Back to lessons
      </button>

      <header className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 shrink-0">
          <Icon name={topic.icon} className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {topic.title}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {lesson.title}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">{lesson.summary}</p>
        </div>
      </header>

      {alreadyDone && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
          <Icon name="CheckCircle2" className="h-4 w-4" />
          Lesson completed
        </div>
      )}

      <section className="card p-5 sm:p-6">
        <SectionTitle icon="BookOpen" title="Explanation" />
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          {lesson.explanation}
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="card p-5">
          <SectionTitle icon="Lightbulb" title="Real-world analogy" />
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {lesson.analogy}
          </p>
        </section>
        <section className="card p-5">
          <SectionTitle icon="Building2" title="Business example" />
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {lesson.businessExample}
          </p>
        </section>
      </div>

      <section className="card p-5 sm:p-6">
        <SectionTitle icon="ListChecks" title="Key takeaways" />
        <ul className="mt-3 space-y-2.5">
          {lesson.keyTakeaways.map((kt, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand-100 text-brand-700 shrink-0">
                <span className="text-[11px] font-bold">{i + 1}</span>
              </div>
              <p className="text-sm text-slate-700">{kt}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Knowledge check */}
      <section className="card p-5 sm:p-6">
        <SectionTitle icon="Target" title="Quick knowledge check" />
        <p className="mt-2 mb-3 text-sm font-medium text-slate-800">
          {lesson.knowledgeCheck.question}
        </p>
        <div className="space-y-2">
          {lesson.knowledgeCheck.options.map((opt, i) => {
            const isSel = selected === i;
            const isAns = i === lesson.knowledgeCheck.answerIndex;
            let cls =
              'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition';
            if (!checked) {
              cls += isSel
                ? ' border-brand-500 bg-brand-50 text-slate-900'
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
                onClick={() => setSelected(i)}
                className={cls}
              >
                <span className="grid h-6 w-6 place-items-center rounded-full border border-current text-xs font-semibold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {!checked ? (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCheck}
              disabled={selected === null}
              className="btn-primary"
            >
              Check answer
            </button>
          </div>
        ) : (
          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <Icon name="CheckCircle2" className="h-5 w-5 text-emerald-600" />
              ) : (
                <Icon name="XCircle" className="h-5 w-5 text-red-500" />
              )}
              <p
                className={`text-sm font-semibold ${
                  isCorrect ? 'text-emerald-700' : 'text-red-600'
                }`}
              >
                {isCorrect ? 'Correct!' : 'Not quite — review the explanation'}
              </p>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {lesson.knowledgeCheck.explanation}
            </p>
          </div>
        )}
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button onClick={onBack} className="btn-ghost">
          <Icon name="ArrowLeft" className="h-4 w-4" />
          All lessons
        </button>
        <button onClick={onPractice} className="btn-primary">
          Practice this topic
          <Icon name="ArrowRight" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} className="h-4 w-4 text-brand-600" />
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
    </div>
  );
}

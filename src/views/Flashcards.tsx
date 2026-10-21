import { useMemo, useState } from 'react';
import { Icon } from '../components/Icon';
import { flashcards } from '../data/flashcards';
import { topicMap } from '../data/topics';
import type { useProgress } from '../hooks/useProgress';
import type { Flashcard, FlashcardStatus } from '../types';

type Progress = ReturnType<typeof useProgress>;

export function Flashcards({ progress }: { progress: Progress }) {
  const [deck, setDeck] = useState<Flashcard[]>(() => buildDeck(progress));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = deck[index];
  const reviewed = Object.keys(progress.state.flashcards.status).filter(
    (id) => progress.state.flashcards.status[id] !== 'unseen'
  ).length;
  const reviewCount = deck.filter(
    (c) => progress.state.flashcards.status[c.id] === 'review'
  ).length;

  const mark = (status: FlashcardStatus) => {
    if (!card) return;
    progress.setFlashcardStatus(card.id, status);
    setFlipped(false);
    if (index + 1 < deck.length) {
      setIndex((i) => i + 1);
    } else {
      // rebuild deck prioritizing review cards
      setDeck(buildDeck(progress));
      setIndex(0);
    }
  };

  const restart = () => {
    setDeck(buildDeck(progress));
    setIndex(0);
    setFlipped(false);
  };

  if (deck.length === 0) {
    return (
      <div className="space-y-6">
        <Header reviewed={reviewed} total={flashcards.length} />
        <div className="card p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <Icon name="Layers" className="h-7 w-7" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-700">
            No flashcards available yet.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Your study deck will appear here.
          </p>
        </div>
      </div>
    );
  }

  const status = card
    ? progress.state.flashcards.status[card.id] ?? 'unseen'
    : 'unseen';
  const topic = card ? topicMap[card.topicId] : null;

  return (
    <div className="space-y-6">
      <Header reviewed={reviewed} total={flashcards.length} />

      {reviewCount > 0 && (
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
          <Icon name="Sparkles" className="h-4 w-4" />
          {reviewCount} card{reviewCount === 1 ? '' : 's'} marked for review
          appear first this session.
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          Card {index + 1} of {deck.length}
        </p>
        <button
          onClick={restart}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <Icon name="RefreshCw" className="h-4 w-4" />
          Shuffle deck
        </button>
      </div>

      {/* Card */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full text-left"
        style={{ minHeight: '320px' }}
        aria-label="Flip flashcard"
      >
        <div
          className={`relative card transition-all duration-300 ${
            flipped ? 'shadow-card-hover' : ''
          }`}
          style={{ minHeight: '320px' }}
        >
          <div className="flex h-full flex-col p-6 sm:p-8" style={{ minHeight: '320px' }}>
            {card && topic && (
              <>
                <div className="flex items-center justify-between">
                  <span className="chip bg-brand-50 text-brand-700">
                    <Icon name={topic.icon} className="h-3.5 w-3.5" />
                    {topic.title}
                  </span>
                  <StatusBadge status={status} />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center text-center py-6">
                  {!flipped ? (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Term
                      </p>
                      <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
                        {card.front}
                      </p>
                      <p className="mt-6 text-xs text-slate-400">
                        Tap to reveal the answer
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                        Answer
                      </p>
                      <p className="mt-3 text-lg sm:text-xl font-medium text-slate-700 leading-relaxed">
                        {card.back}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Icon name="RotateCcw" className="h-3.5 w-3.5" />
                  Flip card
                </div>
              </>
            )}
          </div>
        </div>
      </button>

      {/* Mark buttons */}
      <div className="grid grid-cols-3 gap-3">
        <MarkButton
          onClick={() => mark('know')}
          color="emerald"
          icon="CheckCircle2"
          label="Know it"
        />
        <MarkButton
          onClick={() => mark('practice')}
          color="amber"
          icon="Target"
          label="Need practice"
        />
        <MarkButton
          onClick={() => mark('review')}
          color="rose"
          icon="RotateCcw"
          label="Review again"
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => {
            setFlipped(false);
            setIndex((i) => Math.max(0, i - 1));
          }}
          disabled={index === 0}
          className="btn-ghost disabled:opacity-50"
        >
          <Icon name="ArrowLeft" className="h-4 w-4" />
          Previous
        </button>
        <button
          onClick={() => {
            setFlipped(false);
            setIndex((i) => Math.min(deck.length - 1, i + 1));
          }}
          disabled={index === deck.length - 1}
          className="btn-ghost disabled:opacity-50"
        >
          Next
          <Icon name="ArrowRight" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Header({ reviewed, total }: { reviewed: number; total: number }) {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Flashcards
        </h1>
        <p className="mt-2 text-slate-500 max-w-2xl">
          Review key Azure terms and services. Flip a card, then mark how well
          you knew it. Cards you mark for review appear first next time.
        </p>
      </div>
      <div className="card px-4 py-3 shrink-0">
        <p className="text-xs font-medium text-slate-500">Reviewed</p>
        <p className="text-lg font-bold text-slate-900">
          {reviewed}
          <span className="text-sm font-normal text-slate-400">/{total}</span>
        </p>
      </div>
    </header>
  );
}

function StatusBadge({ status }: { status: FlashcardStatus }) {
  if (status === 'unseen')
    return (
      <span className="chip bg-slate-100 text-slate-500">Not seen yet</span>
    );
  if (status === 'know')
    return (
      <span className="chip bg-emerald-50 text-emerald-600">
        <Icon name="CheckCircle2" className="h-3.5 w-3.5" />
        Know it
      </span>
    );
  if (status === 'practice')
    return (
      <span className="chip bg-amber-50 text-amber-600">
        <Icon name="Target" className="h-3.5 w-3.5" />
        Needs practice
      </span>
    );
  return (
    <span className="chip bg-rose-50 text-rose-600">
      <Icon name="RotateCcw" className="h-3.5 w-3.5" />
      Review again
    </span>
  );
}

function MarkButton({
  onClick,
  color,
  icon,
  label,
}: {
  onClick: () => void;
  color: 'emerald' | 'amber' | 'rose';
  icon: string;
  label: string;
}) {
  const styles = {
    emerald:
      'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300',
    amber:
      'border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300',
    rose: 'border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300',
  }[color];
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border bg-white px-3 py-3 text-sm font-medium transition ${styles}`}
    >
      <Icon name={icon} className="h-4 w-4" />
      {label}
    </button>
  );
}

function buildDeck(progress: Progress): Flashcard[] {
  const reviewIds = flashcards
    .filter((c) => progress.state.flashcards.status[c.id] === 'review')
    .map((c) => c.id);
  const practiceIds = flashcards
    .filter((c) => progress.state.flashcards.status[c.id] === 'practice')
    .map((c) => c.id);
  const unseenIds = flashcards
    .filter((c) => {
      const s = progress.state.flashcards.status[c.id];
      return s === undefined || s === 'unseen';
    })
    .map((c) => c.id);
  const knowIds = flashcards
    .filter((c) => progress.state.flashcards.status[c.id] === 'know')
    .map((c) => c.id);

  // priority: review > practice > unseen > know
  const ordered = [
    ...reviewIds,
    ...practiceIds,
    ...unseenIds,
    ...knowIds,
  ];
  const map = Object.fromEntries(flashcards.map((c) => [c.id, c]));
  return ordered.map((id) => map[id]).filter(Boolean);
}

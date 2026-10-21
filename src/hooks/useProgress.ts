import { useCallback, useEffect, useState } from 'react';
import type { FlashcardStatus, TopicId } from '../types';

const STORAGE_KEY = 'azure-ace-progress-v1';

export interface TopicStat {
  total: number;
  correct: number;
}

export interface ProgressState {
  lessonsCompleted: string[]; // lesson ids
  quiz: {
    answered: number;
    correct: number;
    byTopic: Record<string, TopicStat>;
    questionIdsSeen: string[];
    incorrectQuestionIds: string[];
  };
  flashcards: {
    reviewed: number;
    status: Record<string, FlashcardStatus>;
    lastReviewedIds: string[];
  };
  lastView: string | null;
  lastTopicId: TopicId | null;
}

const initialState: ProgressState = {
  lessonsCompleted: [],
  quiz: {
    answered: 0,
    correct: 0,
    byTopic: {},
    questionIdsSeen: [],
    incorrectQuestionIds: [],
  },
  flashcards: {
    reviewed: 0,
    status: {},
    lastReviewedIds: [],
  },
  lastView: null,
  lastTopicId: null,
};

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    // shallow merge to tolerate new fields
    return {
      ...initialState,
      ...parsed,
      quiz: { ...initialState.quiz, ...(parsed.quiz ?? {}) },
      flashcards: { ...initialState.flashcards, ...(parsed.flashcards ?? {}) },
    };
  } catch {
    return initialState;
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() =>
    typeof window === 'undefined' ? initialState : load()
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  const completeLesson = useCallback((lessonId: string) => {
    setState((s) =>
      s.lessonsCompleted.includes(lessonId)
        ? s
        : { ...s, lessonsCompleted: [...s.lessonsCompleted, lessonId] }
    );
  }, []);

  const recordQuizAnswer = useCallback(
    (
      questionId: string,
      topicId: TopicId,
      isCorrect: boolean,
      seenBefore: boolean
    ) => {
      setState((s) => {
        const byTopic = { ...s.quiz.byTopic };
        const cur = byTopic[topicId] ?? { total: 0, correct: 0 };
        // only increment counts if this question hasn't been answered before
        const firstTime = !s.quiz.questionIdsSeen.includes(questionId);
        const newByTopic = firstTime
          ? {
              ...byTopic,
              [topicId]: {
                total: cur.total + 1,
                correct: cur.correct + (isCorrect ? 1 : 0),
              },
            }
          : byTopic;

        const seen = firstTime
          ? [...s.quiz.questionIdsSeen, questionId]
          : s.quiz.questionIdsSeen;

        const incorrect = s.quiz.incorrectQuestionIds.filter(
          (id) => id !== questionId
        );
        if (!isCorrect) incorrect.push(questionId);

        return {
          ...s,
          quiz: {
            answered: s.quiz.answered + (seenBefore ? 0 : 1),
            correct: s.quiz.correct + (seenBefore || !isCorrect ? 0 : isCorrect ? 1 : 0),
            byTopic: newByTopic,
            questionIdsSeen: seen,
            incorrectQuestionIds: incorrect,
          },
        };
      });
    },
    []
  );

  const setFlashcardStatus = useCallback(
    (cardId: string, status: FlashcardStatus) => {
      setState((s) => {
        const prevStatus = s.flashcards.status[cardId];
        const reviewedDelta =
          prevStatus === undefined || prevStatus === 'unseen' ? 1 : 0;
        return {
          ...s,
          flashcards: {
            reviewed: s.flashcards.reviewed + reviewedDelta,
            status: { ...s.flashcards.status, [cardId]: status },
            lastReviewedIds: [...s.flashcards.lastReviewedIds, cardId].slice(-50),
          },
        };
      });
    },
    []
  );

  const setLastView = useCallback((view: string, topicId?: TopicId | null) => {
    setState((s) => ({
      ...s,
      lastView: view,
      lastTopicId: topicId ?? s.lastTopicId,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    completeLesson,
    recordQuizAnswer,
    setFlashcardStatus,
    setLastView,
    reset,
  };
}

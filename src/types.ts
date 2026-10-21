export type TopicId =
  | 'cloud-concepts'
  | 'azure-architecture'
  | 'azure-management';

export interface Topic {
  id: TopicId;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

export interface Lesson {
  id: string;
  topicId: TopicId;
  title: string;
  summary: string;
  explanation: string;
  analogy: string;
  businessExample: string;
  keyTakeaways: string[];
  knowledgeCheck: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: string;
  topicId: TopicId;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  topicId: TopicId;
  front: string;
  back: string;
}

export type FlashcardStatus = 'know' | 'practice' | 'review' | 'unseen';

export type View =
  | 'dashboard'
  | 'learn'
  | 'practice'
  | 'flashcards'
  | 'progress';

export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface Question {
  id: string;
  quizId: string;
  type: QuestionType;
  text: string;
  options: string[] | null;
  answers: string | string[] | boolean | null;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

export interface QuizListItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    questions: number;
  };
}

type BooleanQuestionInput = {
  type: 'BOOLEAN';
  text: string;
  options?: string[] | null;
  answers?: boolean | null;
};

type InputQuestionInput = {
  type: 'INPUT';
  text: string;
  options?: string[] | null;
  answers?: string | null;
};

type CheckboxQuestionInput = {
  type: 'CHECKBOX';
  text: string;
  options: string[];
  answers?: string[] | null;
};

export type CreateQuestionPayload =
  BooleanQuestionInput | InputQuestionInput | CheckboxQuestionInput;

export type CreateQuizPayload = {
  title: string;
  questions: CreateQuestionPayload[];
};

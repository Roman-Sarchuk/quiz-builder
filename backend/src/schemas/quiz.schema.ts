import { z } from 'zod';

const booleanQuestionSchema = z.object({
  type: z.literal('BOOLEAN'),
  text: z.string().trim().min(1, 'Question text is required'),
  answers: z.boolean().optional(),
});

const inputQuestionSchema = z.object({
  type: z.literal('INPUT'),
  text: z.string().trim().min(1, 'Question text is required'),
  answers: z.string().trim().min(1).optional(),
});

const checkboxQuestionSchema = z.object({
  type: z.literal('CHECKBOX'),
  text: z.string().trim().min(1, 'Question text is required'),
  options: z
    .array(z.string().trim().min(1))
    .min(2, 'Checkbox questions require at least 2 options'),
  answers: z.array(z.string().trim().min(1)).optional(),
});

export const quizQuestionSchema = z.discriminatedUnion('type', [
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema,
]);

export const createQuizSchema = z.object({
  title: z.string().trim().min(1, 'Quiz title is required'),
  questions: z.array(quizQuestionSchema).min(1, 'At least one question is required'),
});

export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type CreateQuizInput = z.infer<typeof createQuizSchema>;

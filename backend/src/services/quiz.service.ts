import prisma from '../prisma.js';
import { AppError } from '../middlewares/error.middleware.js';
import type { CreateQuizInput, QuizQuestion } from '../schemas/quiz.schema.js';

export class QuizService {
  async createQuiz(data: CreateQuizInput) {
    const mappedQuestions = data.questions.map((question: QuizQuestion, index: number) => {
      const baseQuestion = {
        type: question.type,
        text: question.text,
        order: index,
      };

      if (question.type === 'CHECKBOX') {
        return {
          ...baseQuestion,
          options: question.options,
          ...(question.answers !== undefined ? { answers: question.answers } : {}),
        };
      }

      if (question.answers !== undefined) {
        return {
          ...baseQuestion,
          answers: question.answers,
        };
      }

      return baseQuestion;
    });

    return prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: mappedQuestions,
        },
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async getQuizzes() {
    return prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getQuizById(id: string) {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!quiz) {
      throw new AppError(404, 'Quiz not found');
    }

    return quiz;
  }

  async deleteQuiz(id: string) {
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!existingQuiz) {
      throw new AppError(404, 'Quiz not found');
    }

    return prisma.quiz.delete({
      where: { id },
    });
  }
}

export const quizService = new QuizService();

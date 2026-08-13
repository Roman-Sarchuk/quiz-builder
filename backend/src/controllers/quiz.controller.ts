import type { Request, Response } from 'express';
import { AppError, errorMiddleware } from '../middlewares/error.middleware.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { createQuizSchema } from '../schemas/quiz.schema.js';
import { QuizService } from '../services/quiz.service.js';

const getRequestId = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  if (!value) {
    throw new AppError(400, 'Quiz id is required');
  }

  return value;
};

export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  createQuiz = asyncHandler(async (req: Request, res: Response) => {
    const payload = createQuizSchema.parse(req.body);
    const quiz = await this.quizService.createQuiz(payload);

    res.status(201).json({
      success: true,
      data: quiz,
    });
  });

  getQuizzes = asyncHandler(async (_req: Request, res: Response) => {
    const quizzes = await this.quizService.getQuizzes();

    res.status(200).json({
      success: true,
      data: quizzes,
    });
  });

  getQuizById = asyncHandler(async (req: Request, res: Response) => {
    const id = getRequestId(req.params.id);
    const quiz = await this.quizService.getQuizById(id);

    res.status(200).json({
      success: true,
      data: quiz,
    });
  });

  deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
    const id = getRequestId(req.params.id);
    const deletedQuiz = await this.quizService.deleteQuiz(id);

    res.status(200).json({
      success: true,
      data: deletedQuiz,
    });
  });
}

export { errorMiddleware };

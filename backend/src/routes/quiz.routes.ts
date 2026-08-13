import { Router } from 'express';
import { QuizController } from '../controllers/quiz.controller.js';
import { quizService } from '../services/quiz.service.js';

const router = Router();
const quizController = new QuizController(quizService);

router.post('/', quizController.createQuiz);
router.get('/', quizController.getQuizzes);
router.get('/:id', quizController.getQuizById);
router.delete('/:id', quizController.deleteQuiz);

export default router;

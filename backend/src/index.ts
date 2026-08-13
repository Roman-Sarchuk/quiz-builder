import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import quizRoutes from './routes/quiz.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Backend is running!');
});

app.use('/quizzes', quizRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
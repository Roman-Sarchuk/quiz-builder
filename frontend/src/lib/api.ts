import type { CreateQuizPayload, Quiz, QuizListItem } from '@/types/quiz';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000').replace(/\/$/, '');

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiError = {
  success: false;
  message: string;
  details?: unknown;
};

async function parseApiResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiSuccess<T> | ApiError;

  if (!response.ok || payload.success === false) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'message' in payload &&
      typeof payload.message === 'string'
        ? payload.message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  if (!payload || typeof payload !== 'object' || !('data' in payload)) {
    throw new Error('Invalid API response');
  }

  return payload.data;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers ?? {});

  if (!headers.has('Content-Type') && init?.body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
    ...init,
    headers,
  });

  return parseApiResponse<T>(response);
}

export async function getQuizzes(): Promise<QuizListItem[]> {
  return request<QuizListItem[]>('/quizzes');
}

export async function getQuizById(id: string): Promise<Quiz> {
  return request<Quiz>(`/quizzes/${id}`);
}

export async function createQuiz(payload: CreateQuizPayload): Promise<Quiz> {
  return request<Quiz>('/quizzes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteQuiz(id: string): Promise<void> {
  await request<unknown>(`/quizzes/${id}`, {
    method: 'DELETE',
  });
}

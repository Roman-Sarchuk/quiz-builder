"use client";

import { useEffect, useState } from "react";

import { QuizListItem } from "@/components/QuizListItem";
import { deleteQuiz, getQuizzes } from "@/lib/api";
import type { QuizListItem as QuizListItemType } from "@/types/quiz";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizListItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuizzes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load quizzes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadQuizzes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteQuiz(id);
      setQuizzes((current) => current.filter((quiz) => quiz.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete quiz.");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600">Quiz</p>
            <h1 className="mt-2 text-3xl font-bold">All quizzes</h1>
          </div>

          <a
            href="/create"
            className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500"
          >
            Create quiz
          </a>
        </div>

        {error && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        {isLoading ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">Loading quizzes...</p>
        ) : quizzes.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">No quizzes yet. Create the first one.</p>
        ) : (
          <ul className="space-y-4">
            {quizzes.map((quiz) => (
              <QuizListItem key={quiz.id} quiz={quiz} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

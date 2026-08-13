import Link from 'next/link';

import type { QuizListItem as QuizListItemType } from '@/types/quiz';

type QuizListItemProps = {
  quiz: QuizListItemType;
  onDelete: (id: string) => void;
};

export function QuizListItem({ quiz, onDelete }: QuizListItemProps) {
  return (
    <li className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/quizzes/${quiz.id}`}
            className="text-lg font-semibold text-zinc-900 hover:text-violet-700"
          >
            {quiz.title}
          </Link>
          <p className="mt-1 text-sm text-zinc-500">
            {new Date(quiz.createdAt).toLocaleDateString()} · {quiz._count.questions} question
            {quiz._count.questions === 1 ? '' : 's'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onDelete(quiz.id)}
          className="rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

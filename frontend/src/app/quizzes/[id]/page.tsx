import { notFound } from "next/navigation";

import { QuestionPreview } from "@/components/QuestionPreview";
import { getQuizById } from "@/lib/api";

export default async function QuizDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const quiz = await getQuizById(id);

    return (
      <main className="min-h-screen bg-zinc-100 px-6 py-10 text-zinc-900">
        <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600">Quiz</p>
              <h1 className="mt-2 text-3xl font-bold">{quiz.title}</h1>
            </div>

            <a
              href="/quizzes"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Back to list
            </a>
          </div>

          <div className="space-y-4">
            {quiz.questions.map((question, index) => (
              <QuestionPreview key={question.id} question={question} index={index} />
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      notFound();
    }

    throw error;
  }
}

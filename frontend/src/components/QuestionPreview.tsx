import type { Question } from '@/types/quiz';

type QuestionPreviewProps = {
  question: Question;
  index: number;
};

export function QuestionPreview({ question, index }: QuestionPreviewProps) {
  if (question.type === 'BOOLEAN') {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase">
          Question {index + 1}
        </p>
        <p className="mb-4 text-base font-medium text-zinc-900">{question.text}</p>

        <div className="space-y-2">
          <label className="flex items-center gap-3 text-sm text-zinc-700">
            <input type="radio" checked={Boolean(question.answers) === true} disabled readOnly />
            True
          </label>
          <label className="flex items-center gap-3 text-sm text-zinc-700">
            <input type="radio" checked={Boolean(question.answers) === false} disabled readOnly />
            False
          </label>
        </div>
      </div>
    );
  }

  if (question.type === 'INPUT') {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase">
          Question {index + 1}
        </p>
        <p className="mb-3 text-base font-medium text-zinc-900">{question.text}</p>
        <input
          value={typeof question.answers === 'string' ? question.answers : ''}
          disabled
          readOnly
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-zinc-700"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase">
        Question {index + 1}
      </p>
      <p className="mb-4 text-base font-medium text-zinc-900">{question.text}</p>

      <div className="space-y-2">
        {(question.options ?? []).map((option, optionIndex) => {
          const checked = Array.isArray(question.answers)
            ? question.answers.includes(option)
            : false;

          return (
            <label
              key={`${question.id}-${optionIndex}`}
              className="flex items-center gap-3 text-sm text-zinc-700"
            >
              <input type="checkbox" checked={checked} disabled readOnly />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}

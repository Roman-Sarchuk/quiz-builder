'use client';

import type {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import type { CreateQuizFormValues } from '@/schemas/quiz.schema';

type QuestionFieldsetProps = {
  field: FieldArrayWithId<CreateQuizFormValues, 'questions'>;
  index: number;
  register: UseFormRegister<CreateQuizFormValues>;
  control: Control<CreateQuizFormValues>;
  watch: UseFormWatch<CreateQuizFormValues>;
  setValue: UseFormSetValue<CreateQuizFormValues>;
  removeQuestion: (index: number) => void;
  canRemove: boolean;
};

export function QuestionFieldset({
  field,
  index,
  register,
  watch,
  setValue,
  removeQuestion,
  canRemove,
}: QuestionFieldsetProps) {
  const questionType = watch(`questions.${index}.type`);
  const checkboxOptions = watch(`questions.${index}.options`) ?? [];
  const checkboxAnswers = watch(`questions.${index}.answers`) ?? [];

  const updateOption = (optionIndex: number, value: string) => {
    const nextOptions = [...checkboxOptions];
    nextOptions[optionIndex] = value;
    setValue(`questions.${index}.options`, nextOptions, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const answerSet = new Set(checkboxAnswers);
    if (!value.trim()) {
      answerSet.delete(nextOptions[optionIndex]);
    }
    setValue(`questions.${index}.answers`, Array.from(answerSet), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const addOption = () => {
    const nextOptions = [...checkboxOptions, ''];
    setValue(`questions.${index}.options`, nextOptions, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeOption = (optionIndex: number) => {
    const nextOptions = checkboxOptions.filter((_, currentIndex) => currentIndex !== optionIndex);
    const nextAnswers = checkboxAnswers.filter((answer) => answer !== checkboxOptions[optionIndex]);

    setValue(`questions.${index}.options`, nextOptions, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(`questions.${index}.answers`, nextAnswers, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const toggleCheckboxAnswer = (option: string) => {
    if (!option.trim()) {
      return;
    }

    const nextAnswers = new Set(checkboxAnswers);

    if (nextAnswers.has(option)) {
      nextAnswers.delete(option);
    } else {
      nextAnswers.add(option);
    }

    setValue(`questions.${index}.answers`, Array.from(nextAnswers), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div key={field.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase">
          Question {index + 1}
        </p>

        {canRemove && (
          <button
            type="button"
            onClick={() => removeQuestion(index)}
            className="rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
          >
            Remove
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Question type</label>
          <select
            {...register(`questions.${index}.type`)}
            onChange={(event) => {
              register(`questions.${index}.type`).onChange(event);
              setValue(`questions.${index}.answers`, undefined, {
                shouldDirty: true,
                shouldValidate: true,
              });
              setValue(`questions.${index}.options`, undefined, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 transition outline-none focus:border-violet-500"
          >
            <option value="BOOLEAN">BOOLEAN</option>
            <option value="INPUT">INPUT</option>
            <option value="CHECKBOX">CHECKBOX</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Question text</label>
          <input
            {...register(`questions.${index}.text`)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 transition outline-none focus:border-violet-500"
            placeholder="Type your question here"
          />
        </div>

        {questionType === 'BOOLEAN' && (
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">Answer</label>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-300 bg-white p-3">
              <input
                type="checkbox"
                checked={Boolean(watch(`questions.${index}.answers`))}
                onChange={(event) =>
                  setValue(`questions.${index}.answers`, event.target.checked, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
              <span className="text-sm text-zinc-700">Correct answer is true</span>
            </div>
          </div>
        )}

        {questionType === 'INPUT' && (
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">Expected answer</label>
            <input
              {...register(`questions.${index}.answers`)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 transition outline-none focus:border-violet-500"
              placeholder="e.g. Paris"
            />
          </div>
        )}

        {questionType === 'CHECKBOX' && (
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-zinc-700">Options</label>
              <button
                type="button"
                onClick={addOption}
                className="rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-100"
              >
                Add option
              </button>
            </div>

            <div className="space-y-2">
              {checkboxOptions.map((option, optionIndex) => (
                <div key={`${field.id}-option-${optionIndex}`} className="flex items-center gap-2">
                  <input
                    value={option}
                    onChange={(event) => updateOption(optionIndex, event.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 transition outline-none focus:border-violet-500"
                    placeholder={`Option ${optionIndex + 1}`}
                  />

                  {checkboxOptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(optionIndex)}
                      className="rounded-lg border border-zinc-200 bg-white px-2.5 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {checkboxOptions.length > 0 && (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Correct answers
                </label>
                <div className="space-y-2">
                  {checkboxOptions.map((option, optionIndex) => (
                    <label
                      key={`${field.id}-answer-${optionIndex}`}
                      className="flex items-center gap-3 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(option.trim()) && checkboxAnswers.includes(option)}
                        disabled={!option.trim()}
                        onChange={() => toggleCheckboxAnswer(option)}
                      />
                      <span>{option.trim() || `Option ${optionIndex + 1}`}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

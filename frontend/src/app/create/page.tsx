"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

import { QuestionFieldset } from "@/components/QuestionFieldset";
import { createQuiz } from "@/lib/api";
import { createQuizSchema } from "@/schemas/quiz.schema";
import type { CreateQuizFormValues } from "@/schemas/quiz.schema";

const createDefaultQuestion = () => ({
  type: "BOOLEAN" as const,
  text: "",
  answers: true,
});

export default function CreateQuizPage() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuizFormValues>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: "",
      questions: [createDefaultQuestion()],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (values: CreateQuizFormValues) => {
    try {
      await createQuiz(values);
      router.push("/quizzes");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600">Quiz</p>
            <h1 className="mt-2 text-3xl font-bold">Create a new quiz</h1>
          </div>

          <button
            type="button"
            onClick={() => router.push("/quizzes")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Back to list
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-zinc-700">
              Quiz title
            </label>
            <input
              id="title"
              {...register("title")}
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2.5 outline-none transition focus:border-violet-500 focus:bg-white"
              placeholder="Enter quiz title"
            />
            {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <QuestionFieldset
                key={field.id}
                field={field}
                index={index}
                register={register}
                control={control}
                watch={watch}
                setValue={setValue}
                removeQuestion={remove}
                canRemove={fields.length > 1}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => append(createDefaultQuestion())}
              className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 font-medium text-violet-700 hover:bg-violet-100"
            >
              Add question
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-violet-400"
          >
            {isSubmitting ? "Creating..." : "Create quiz"}
          </button>
        </form>
      </div>
    </main>
  );
}

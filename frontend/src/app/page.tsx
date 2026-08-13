import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 py-10 text-zinc-900">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600">Event Platform</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Quiz Builder</h1>
        <p className="mt-4 text-zinc-600">
          Create new quizzes or explore the existing set for your event.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/create"
            className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
          >
            Create quiz
          </Link>
          <Link
            href="/quizzes"
            className="rounded-xl border border-zinc-200 bg-white px-5 py-3 font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            View quizzes
          </Link>
        </div>
      </div>
    </main>
  );
}

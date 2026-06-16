import { prisma } from "@/libs/prisma";
import Link from "next/link";

export default async function Home() {
  const quizzes = await prisma.quiz.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex flex-col p-4 m-4 card">
      <h1 className="text-2xl font-bold mb-5">Daftar Kuis</h1>

      {quizzes.length === 0 && (
        <p>
          Belum ada kuis. Buat kuis baru lewat menu{" "}
          <Link href="/create">Create</Link>.
        </p>
      )}

      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="card">
            <div className="card-header bg-green-500">
              <h3 className="card-title text-white">{quiz.title}</h3>
            </div>
            <div className="card-body">
              {quiz.description && <p className="mb-5">{quiz.description}</p>}
              <p className="mb-5 text-2xl font-semibold">{quiz._count.questions} soal</p>
              <Link href={`/quiz/${quiz.id}`} className="btn-primary">
                Mulai Kuis
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

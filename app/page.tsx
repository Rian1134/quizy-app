import { prisma } from "@/libs/prisma";
import Link from "next/link";

export default async function Home() {
  const quizzes = await prisma.quiz.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Daftar Kuis</h1>

      {quizzes.length === 0 && (
        <p>
          Belum ada kuis. Buat kuis baru lewat menu{" "}
          <Link href="/create">Create</Link>.
        </p>
      )}

      <ul>
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
          >
            <h3>{quiz.title}</h3>
            {quiz.description && (
              <p>
                {quiz.description}
              </p>
            )}
            <p>
              {quiz._count.questions} soal
            </p>
            <Link href={`/quiz/${quiz.id}`}>Mulai Kuis →</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

import { prisma } from '@/libs/prisma';

export async function POST(request, { params }) {
  const { answers } = await request.json();

  const questions = await prisma.question.findMany({
    where: { quizId: Number(params.id) },
    include: { options: true },
  });

  let score = 0;
  questions.forEach((q) => {
    const correctOption = q.options.find((o) => o.isCorrect);
    if (correctOption && answers[q.id] === correctOption.id) {
      score++;
    }
  });

  const attempt = await prisma.attempt.create({
    data: {
      quizId: Number(params.id),
      score,
      total: questions.length,
    },
  });

  return Response.json({ score, total: questions.length, attemptId: attempt.id });
}
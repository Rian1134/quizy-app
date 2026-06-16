import { prisma } from '@/libs/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface SubmitBody {
  answers: Record<number, number>;
}

export async function POST(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body: SubmitBody = await request.json();
  const { answers } = body;

  const questions = await prisma.question.findMany({
    where: { quizId: Number(id) },
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
      quizId: Number(id),
      score,
      total: questions.length,
    },
  });

  return Response.json({ score, total: questions.length, attemptId: attempt.id });
}
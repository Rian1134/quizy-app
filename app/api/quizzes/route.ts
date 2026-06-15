import { prisma } from '@/libs/prisma';

export async function GET() {
  const quizzes = await prisma.quiz.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return Response.json(quizzes);
}

export async function POST(request) {
  const { title, description, questions } = await request.json();

  const quiz = await prisma.quiz.create({
    data: {
      title,
      description,
      questions: {
        create: questions.map((q) => ({
          text: q.text,
          options: {
            create: q.options.map((o) => ({
              text: o.text,
              isCorrect: o.isCorrect,
            })),
          },
        })),
      },
    },
  });

  return Response.json(quiz);
}
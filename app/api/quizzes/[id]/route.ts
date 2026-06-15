import { prisma } from '@/libs/prisma';

export async function GET(request, { params }) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(params.id) },
    include: {
      questions: {
        include: {
          options: { select: { id: true, text: true } },
        },
      },
    },
  });

  if (!quiz) {
    return Response.json({ error: 'Kuis tidak ditemukan' }, { status: 404 });
  }
  return Response.json(quiz);
}
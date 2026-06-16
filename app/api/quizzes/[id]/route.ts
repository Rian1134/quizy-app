import { prisma } from '@/libs/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(id) },
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
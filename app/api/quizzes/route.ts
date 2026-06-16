import { prisma } from '@/libs/prisma';
import { NextRequest } from 'next/server';

interface OptionInput {
  text: string;
  isCorrect: boolean;
}

interface QuestionInput {
  text: string;
  options: OptionInput[];
}

interface CreateQuizBody {
  title: string;
  description?: string;
  questions: QuestionInput[];
}

export async function GET() {
  const quizzes = await prisma.quiz.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return Response.json(quizzes);
}

export async function POST(request: NextRequest) {
  const body: CreateQuizBody = await request.json();
  const { title, description, questions } = body;

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
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

interface SubmitResult {
  score: number;
  total: number;
  attemptId: number;
}

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    fetch(`/api/quizzes/${id}`)
      .then((res) => res.json())
      .then((data: Quiz) => setQuiz(data));
  }, [id]);

  const handleSelect = (questionId: number, optionId: number) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = async () => {
    const res = await fetch(`/api/quizzes/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    const data: SubmitResult = await res.json();
    setResult(data);
  };

  if (!quiz) {
    return (
      <main className="flex justify-center items-center mt-3 md:mt-7">
        <h1 className="text-4xl mb-4 text-white">Memuat...</h1>
      </main>
    );
  }

  if (result) {
    return (
      <main className="flex justify-center items-center mt-3 md:mt-7">
        <div className="card w-4/5 ">
          <div className="card-header">
            <h1 className="">Hasil Kuis</h1>
          </div>
          <div className="card-body flex flex-col justify-center items-center">
            <p className="text-2xl mb-4">
              Skor kamu: {result.score} dari {result.total}
            </p>
            <div>
              <Link href={"/"} className="btn-primary">
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center p-3">
      <h1 className="text-white text-2xl md:text-4xl mb-3">{quiz.title}</h1>
      {quiz.questions.map((q) => (
        <div key={q.id} className="card mb-5 w-full p-5">
          <p className="text-lg md:text-2xl mb-5">{q.text}</p>
          <div className="flex flex-col justify-center">
            {q.options.map((opt) => (
              <label key={opt.id} className="text-2xl">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  checked={answers[q.id] === opt.id}
                  onChange={() => handleSelect(q.id, opt.id)}
                  className="me-4 scale-150"
                />
                {opt.text}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="btn-success">
        Submit Jawaban
      </button>
    </main>
  );
}

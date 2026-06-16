"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface OptionForm {
  text: string;
  isCorrect: boolean;
}

interface QuestionForm {
  text: string;
  options: OptionForm[];
}

const emptyQuestion = (): QuestionForm => ({
  text: "",
  options: [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],
});

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionForm[]>([emptyQuestion()]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const updateQuestionText = (qIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].text = value;
    setQuestions(updated);
  };

  const updateOptionText = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].text = value;
    setQuestions(updated);
  };

  const updateOptionCorrect = (
    qIndex: number,
    oIndex: number,
    value: boolean,
  ) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].isCorrect = value;
    setQuestions(updated);
  };

  const addQuestion = () => setQuestions([...questions, emptyQuestion()]);

  const removeQuestion = (qIndex: number) =>
    setQuestions(questions.filter((_, i) => i !== qIndex));

  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push({ text: "", isCorrect: false });
    setQuestions(updated);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.filter(
      (_, i) => i !== oIndex,
    );
    setQuestions(updated);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const q of questions) {
      if (!q.options.some((o) => o.isCorrect)) {
        alert(
          `Soal "${q.text || "(tanpa judul)"}" belum punya jawaban yang benar.`,
        );
        return;
      }
    }

    setSubmitting(true);
    const res = await fetch("/api/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, questions }),
    });
    setSubmitting(false);

    if (res.ok) {
      router.push("/");
    } else {
      alert("Gagal menyimpan kuis. Coba lagi.");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="card w-[90vw] mt-5 md:mt-1">
        <div className="card-header bg-blue-600 text-white">
          <h1>Buat Kuis Baru</h1>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>Judul Kuis</label>
              <br />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-5 md:mb-10">
              <label>Deskripsi (opsional)</label>
              <br />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </div>

            <h2>Soal-soal</h2>

            {questions.map((q, qIndex) => (
              <div key={qIndex} className="card mb-5">
                <div className="card-body">
                  <div className="flex flex-col mb-4">
                    <label>Pertanyaan {qIndex + 1}</label>
                    <input
                      value={q.text}
                      onChange={(e) =>
                        updateQuestionText(qIndex, e.target.value)
                      }
                      required
                      className="border-b w-6/6 h-8 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4 flex flex-col">
                    {q.options.map((opt, oIndex) => (
                      <div key={oIndex} className="mb-4">
                        <input
                          placeholder={`Pilihan ${oIndex + 1}`}
                          value={opt.text}
                          onChange={(e) =>
                            updateOptionText(qIndex, oIndex, e.target.value)
                          }
                          required
                          className="border-b focus:outline-none mb-3 sm:me-3"
                        />
                        <label className={`me-3 ${opt.isCorrect ? "btn-success":"btn-secondary"}`}>
                          <input
                            type="checkbox"
                            checked={opt.isCorrect}
                            onChange={(e) =>
                              updateOptionCorrect(
                                qIndex,
                                oIndex,
                                e.target.checked,
                              )
                            }
                          />
                        </label>

                        {q.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(qIndex, oIndex)}
                            className="btn-danger"
                          >
                            <i className="bi bi-dash-circle-fill"></i>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => addOption(qIndex)}
                    className="btn-success me-2"
                  >
                    <i className="bi bi-plus-circle-fill me-2"></i>Pilihan
                  </button>

                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="btn-danger"
                    >
                     <i className="bi bi-dash-circle-fill me-2"></i> Hapus
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button type="button" onClick={addQuestion} className="btn-success">
              <i className="bi bi-plus-circle-fill me-2"></i>Soal
            </button>

            <br />
            <br />
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? "Menyimpan..." : "Simpan Kuis"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

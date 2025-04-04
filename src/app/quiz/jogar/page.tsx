"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../components/ProtecaoRota";
import Sidebar from "../../components/Sidebar";

interface Option {
  id: number;
  text: string;
  correctAnswer: boolean;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

export default function JogarQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIndex = Number(localStorage.getItem("currentQuestionIndex")) || 0;
      const savedScore = Number(localStorage.getItem("score")) || 0;
      const savedTime = Number(localStorage.getItem("timeLeft")) || 30;

      setCurrentQuestionIndex(savedIndex);
      setScore(savedScore);
      setTimeLeft(savedTime);
    }
  }, []);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(`${API_URL}/quiz/questions`);
        if (!response.ok) throw new Error("Erro na requisição");

        const data = await response.json();

        const formattedData = data.slice(0, 10).map((question: any) => ({
          id: question.id,
          text: question.text,
          options: question.options.map((optionText: string, index: number) => ({
            id: index,
            text: optionText,
            correctAnswer: index === question.correctAnswer,
          })),
        }));

        setQuestions(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar questões:", error);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !quizFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        if (typeof window !== "undefined") {
          localStorage.setItem("timeLeft", String(timeLeft - 1));
        }
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion(0);
    }
  }, [timeLeft, quizFinished]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentQuestionIndex", String(currentQuestionIndex));
      localStorage.setItem("score", String(score));
    }
  }, [currentQuestionIndex, score]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Você perderá seu progresso se sair agora!";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const calculateScore = (timeRemaining: number): number => {
    return Math.round((timeRemaining / 30) * 100);
  };

  const handleAnswer = (selectedOption: Option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options.find(
      (op) => op.id === selectedOption.id
    )?.correctAnswer;

    const points = isCorrect ? calculateScore(timeLeft) : 0;
    if (isCorrect) {
      setScore((prev) => prev + points);
    }
    handleNextQuestion(points);
  };

  const handleNextQuestion = (points: number) => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
      if (typeof window !== "undefined") {
        localStorage.setItem("timeLeft", "30");
      }
    } else {
      setQuizFinished(true);
      const finalScore = score + points;
      saveScoreToBackend(finalScore);
      if (typeof window !== "undefined") {
        localStorage.removeItem("currentQuestionIndex");
        localStorage.removeItem("timeLeft");
        localStorage.removeItem("score");
      }
    }
  };

  const saveScoreToBackend = async (finalScore: number) => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (!token) {
      console.error("Token não encontrado! Usuário precisa estar autenticado.");
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/quiz/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ score: finalScore }),
      });
  
      if (!response.ok) {
        console.log("Erro ao salvar pontuação");
      }
    } catch (error) {
      console.error("Erro ao salvar pontuação:", error);
    }
  };
  

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (quizFinished) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen bg-[#E6F4EA]">
          <Sidebar />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Quiz Finalizado!
              </h1>
              <p className="text-gray-600 mb-6">Sua pontuação: {score}</p>
              <a
                href="/quiz"
                className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Voltar ao Ranking
              </a>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#E6F4EA]">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
              <p className="text-gray-600">
                Questão {currentQuestionIndex + 1} de {questions.length}
              </p>
              <p className="text-gray-600">Tempo: {timeLeft}s</p>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.text}
            </h2>
            <div className="space-y-4">
              {currentQuestion.options.map((options, index) => (
                <button
                  key={`${currentQuestion.id}-${index}`}
                  onClick={() => handleAnswer(options)}
                  className="w-full bg-gray-100 text-black py-3 rounded-lg hover:bg-gray-200 transition"
                >
                  {options.text}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

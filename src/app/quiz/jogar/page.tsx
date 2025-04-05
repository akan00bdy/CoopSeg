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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [streakCounter, setStreakCounter] = useState(0);
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
    if (!quizFinished) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = "Você perderá seu progresso se sair agora!";
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [quizFinished]);

  const calculateScore = (timeRemaining: number, streak: number): number => {
    let baseScore = Math.round((timeRemaining / 30) * 100);
    let multiplier = 1;

    if (timeRemaining > 20) {
      multiplier = 1.5;
    } else if (timeRemaining > 10) {
      multiplier = 1.25;
    }

    const streakBonus = streak >= 3 ? 10 : streak >= 5 ? 30 : 0;

    return Math.round(baseScore * multiplier) + streakBonus;
  };

  const handleAnswer = (selectedOption: Option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options.find(
      (op) => op.id === selectedOption.id
    )?.correctAnswer;

    let streak = isCorrect ? streakCounter + 1 : 0;
    const points = isCorrect ? calculateScore(timeLeft, streak) : 0;

    if (isCorrect) {
      setScore((prev) => prev + points);
      setStreakCounter(streak);
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
    if (!token) {
      console.error("Token não encontrado! Usuário precisa estar autenticado.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/quiz/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <span className="animate-spin h-10 w-10 border-4 border-t-blue-500 border-gray-300 rounded-full"></span>
        <p className="ml-4 text-gray-700 text-lg">Carregando...</p>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen bg-[#E6F4EA]">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-gradient-to-br from-green-400 to-green-500 p-8 rounded-lg shadow-md text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Quiz Finalizado!</h1>
              <p className="text-lg mb-6">Sua pontuação: <span className="text-4xl font-extrabold">{score}</span></p>
              <a
                href="/quiz"
                className="bg-green-700 py-3 px-6 rounded-lg font-semibold hover:bg-green-800 transition text-white"
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
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
            <div className="relative mb-4">
              <div className="h-2 bg-gray-300 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">
                Questão {currentQuestionIndex + 1} de {questions.length}
              </p>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">{currentQuestion.text}</h2>
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option)}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105 focus:outline-none shadow-md"
                >
                  {option.text}
                </button>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6">Tempo restante: {timeLeft}s</p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

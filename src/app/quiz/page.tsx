"use client";

import ProtectedRoute from '../components/ProtecaoRota';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';

interface RankingEntry {
  position: number;
  name: string;
  score: number;
}

export default function Quiz() {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch(`${API_URL}/quiz/ranking`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch ranking');
        }
        const data: RankingEntry[] = await response.json();
        setRanking(data);
      } catch (error) {
        console.error('Error fetching ranking:', error);
      }
    };

    fetchRanking();
  }, [API_URL]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#E6F4EA]">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Desafio Quiz de segurança
            </h1>
            <p className="text-gray-600 mb-6">
              Teste seus conhecimentos sobre segurança cibernética e melhores práticas
            </p>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center mb-4">
                <span className="mr-2 text-orange-500">🏆</span> Ranking
              </h2>
              <div className="space-y-4">
                {ranking.length > 0 ? (
                  ranking.map((entry, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-lg ${
                        index === 0
                          ? 'bg-green-50'
                          : index === 1
                          ? 'bg-gray-50'
                          : 'bg-gray-50'
                      }`}
                    >
                      <span
                        className={`mr-3 ${
                          index === 0
                            ? 'text-yellow-500'
                            : index === 1
                            ? 'text-gray-500'
                            : 'text-orange-500'
                        }`}
                      >
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{entry.name}</p>
                        <p className="text-gray-600 text-sm">Score: {entry.score}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Carregando ranking...</p>
                )}
              </div>
            </div>

            <button
              onClick={() => (window.location.href = '/quiz/jogar/')}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Começar
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Desafie-se com nosso teste de segurança e suba no ranking!
            </p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
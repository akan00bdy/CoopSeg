"use client";

import ProtectedRoute from '../components/ProtecaoRota';
import Sidebar from '../components/Sidebar';

export default function Quiz() {
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
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-yellow-500 mr-3">🥇</span>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">UserName</p>
                    <p className="text-gray-600 text-sm">Score: 800</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 mr-3">🥈</span>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">UserName</p>
                    <p className="text-gray-600 text-sm">Score: 700</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-orange-500 mr-3">🥉</span>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">UserName</p>
                    <p className="text-gray-600 text-sm">Score: 500</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
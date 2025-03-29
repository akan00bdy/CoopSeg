"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-gray-900">
        Bem Vindo ao <span className="text-green-600">CoopSeg</span>
      </h1>
      <p className="text-gray-600 mt-2 text-center">
        Segurança digital começa com conhecimento. Aprenda e se proteja!
      </p>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/register")}
          className="border-2 border-green-600 text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-white transition"
        >
          Faça uma conta
        </button>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-900">Chat Interativo</h3>
          <p className="text-gray-500 mt-2">
            Participe de conversas e compartilhe experiências sobre golpes com nossa comunidade.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-900">Notícias Recentes</h3>
          <p className="text-gray-500 mt-2">
            Mantenha-se informado com conteúdos selecionados de fontes confiáveis.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-900">Quiz Dinâmico</h3>
          <p className="text-gray-500 mt-2">
            Teste seus conhecimentos e aprenda algo novo todos os dias.
          </p>
        </div>
      </div>
    </div>
  );
}

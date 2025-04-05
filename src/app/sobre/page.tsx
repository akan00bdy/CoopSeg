// app/sobre/page.tsx

"use client";

import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl max-w-3xl w-full p-8 space-y-6 text-gray-800">
        <h1 className="text-3xl font-extrabold text-green-700 text-center">
          Sobre o Projeto
        </h1>

        <p className="text-lg leading-relaxed text-justify">
          Em um mundo cada vez mais conectado, o cooperativismo se apresenta
          como uma forma de resistência e solidariedade — onde o coletivo
          fortalece o indivíduo. Este projeto nasce da união entre educação e
          segurança, com o objetivo de entender como golpes financeiros afetam a
          vida das pessoas e como podemos nos proteger juntos.
        </p>

        <p className="text-lg leading-relaxed text-justify">
          Através de dados reais e análise colaborativa, buscamos construir uma
          comunidade mais informada, consciente e preparada para enfrentar os
          riscos do mundo digital. Ao entender melhor o problema, conseguimos
          pensar soluções mais humanas e eficazes.
        </p>

        <p className="text-lg leading-relaxed text-justify">
          Esse painel não é apenas uma ferramenta estatística. É um reflexo das
          histórias de quem passou por situações difíceis — e uma oportunidade
          para transformar dor em prevenção.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLScM1cp3xwoiikvepcxRNn16DlzlwNIXfcRfpwTz5kB1T-VxjQ/viewform?usp=sharing"
            target="_blank"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition duration-300"
          >
            Contribua com a Pesquisa
          </Link>

          <Link
            href="/dashboard"
            className="inline-block text-green-600 hover:underline font-medium"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

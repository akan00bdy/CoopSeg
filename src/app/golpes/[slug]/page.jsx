"use client";

import { useParams } from "next/navigation";

const golpesDetalhes = {
  "golpe-do-pix-errado": {
    title: "Golpe do Pix errado",
    description: "Esse golpe ocorre quando alguém pede para você devolver um Pix que foi enviado por engano. Na verdade, foi um golpe e o valor não poderá ser estornado depois.",
    date: "20/01/2025",
  },
  "golpe-da-falsa-central": {
    title: "Golpe da falsa central de atendimento",
    description: "Criminosos ligam se passando pelo banco e pedem suas informações. Nunca passe seus dados por telefone!",
    date: "20/01/2025",
  },
  "golpe-do-falso-motoboy": {
    title: "Golpe do falso motoboy",
    description: "Recebeu uma ligação dizendo que um motoboy do banco vai buscar seu cartão? É golpe!",
    date: "20/01/2025",
  },
  "golpe-da-troca-de-cartao": {
    title: "Golpe da troca de cartão",
    description: "Ao fazer um pagamento, confira se o cartão devolvido é realmente o seu. Golpistas trocam seu cartão sem que você perceba.",
    date: "20/01/2025",
  },
};

export default function GolpeDetalhes() {
  const { slug } = useParams();
  const golpe = golpesDetalhes[slug];

  if (!golpe) {
    return <p className="text-center text-gray-600">Golpe não encontrado.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">{golpe.title}</h1>
        <p className="text-gray-600 text-center">{golpe.date}</p>
        <p className="text-lg text-gray-800 mt-4 text-center">{golpe.description}</p>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition-all"
          >
            Voltar
          </button>
          <button
          onClick={() => window.history.back()}
          className="bg-green-500 ml-2 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition-all"
          >
            Simular
          </button>
        </div>
      </div>
    </div>
  );
}

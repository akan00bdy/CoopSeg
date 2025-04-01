"use client";

import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtecaoRota';
import Sidebar from '../components/Sidebar';

export default function Aprender() {
  const router = useRouter();

  const golpes = [
    {
      title: 'Golpe do Pix errado',
      description: 'Pediram pra devolver um pix que mandaram errado? Pode ser golpe!',
      date: '20/01/2025',
      category: 'Golpe do Pix errado',
      slug: 'golpe-do-pix-errado',
    },
    {
      title: 'Golpe da falsa central de atendimento',
      description: 'Ligaram dizendo que são do banco e pediram sua senha? Desliga, é golpe!',
      date: '20/01/2025',
      category: 'Golpe da falsa central de atendimento',
      slug: 'golpe-da-falsa-central',
    },
    {
      title: 'Golpe do falso motoboy',
      description: 'Falaram que o motoboy do banco vai buscar seu cartão? Xi, é golpe!',
      date: '20/01/2025',
      category: 'Golpe do falso motoboy',
      slug: 'golpe-do-falso-motoboy',
    },
    {
      title: 'Golpe da troca de cartão',
      description: 'Confira se o cartão que o lojista devolveu é mesmo o seu. Não caia em golpe!',
      date: '20/01/2025',
      category: 'Golpe da troca de cartão',
      slug: 'golpe-da-troca-de-cartao',
    },
  ];

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 ml-64 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold text-green-700 mb-10">Golpes mais comuns</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {golpes.map((golpe, index) => (
            <div
              key={index}
              className="bg-gray-100 text-black rounded-lg shadow-lg p-6 flex flex-col items-start"
            >
              <p className="text-sm text-gray-600">{golpe.date}</p>
              <h3 className="text-lg font-semibold mt-2">{golpe.title}</h3>
              <p className="text-md text-gray-800 mt-2">{golpe.description}</p>
              <button 
                className="mt-4 bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
                onClick={() => router.push(`/golpes/${golpe.slug}`)}
                >
                Leia mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}

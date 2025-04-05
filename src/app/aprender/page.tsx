"use client";

import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtecaoRota';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

export default function Aprender() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const golpes = [
    {
      title: 'Golpe do Link Falso',
      description: "Recebeu um link pedindo pra devolver um PIX enviado por engano? Cuidado! Golpistas usam mensagens falsas pra enganar e roubar seu dinheiro.",
      category: 'Golpe do Pix errado',
      slug: 'golpe-do-link-falso',
    },
    {
      title: 'Golpe de falsos anuncios',
      description: 'Golpistas criam anúncios falsos em sites ou redes sociais oferecendo produtos irresistíveis a preços baixos. Após o pagamento, o produto nunca é entregue.',
      category: 'Golpe do falso motoboy',
      slug: 'golpe-do-falso-anuncios',
    },
    {
      title: 'Golpe do WhatsApp Clonado',
      description: 'Golpistas clonam seu número de WhatsApp e pedem dinheiro aos seus contatos, fingindo ser você em uma emergência.',
      category: 'Golpe do WhatsApp Clonado',
      slug: 'golpe-do-whatsapp-clonado',
    },
    {
      title: 'Golpe do Falso Boleto',
      description: 'Criminosos enviam boletos falsos por e-mail ou WhatsApp, simulando dívidas ou compras que você nunca fez. O pagamento vai direto para a conta dos golpistas.',
      category: 'Golpe do Falso Boleto',
      slug: 'golpe-do-falso-boleto',
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#E6F4EA]">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 p-6 overflow-y-auto h-screen transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <h1
            className={`text-2xl font-bold text-green-700 mb-10 transition-all duration-300 ease-in-out ${
              isSidebarOpen ? 'ml-0' : 'ml-10'
            }`}
          >
            Golpes mais comuns
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {golpes.map((golpe, index) => (
              <div
                key={index}
                className="bg-gray-100 text-black rounded-lg shadow-lg p-6 flex flex-col items-start"
              >
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
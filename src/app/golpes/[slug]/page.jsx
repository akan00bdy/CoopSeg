"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import PhishingModule from "./simulacao/phishing";
import FakeAdsModule from "./simulacao/fakead";
import FakeBoletoModule from "./simulacao/fakeboleto";
import WhatsAppCloneModule from "./simulacao/whatsappclone";

const golpesDetalhes = {
  "golpe-do-link-falso": {
    title: "Golpe do Link Falso",
    description: "Esse golpe ocorre quando alguém pede para você devolver um Pix que foi enviado por engano. Na verdade, foi um golpe e o valor não poderá ser estornado depois.",
    date: "20/01/2025",
  },
  "golpe-do-falso-anuncios": {
    title: "Golpe dos Falsos Anúncios",
    description: "Golpistas criam anúncios falsos em sites ou redes sociais oferecendo produtos irresistíveis a preços baixos. Após o pagamento, o produto nunca é entregue.",
    date: "20/01/2025",
  },
  "golpe-do-falso-boleto": {
    title: "Golpe do Falso Boleto",
    description: "Criminosos enviam boletos falsos por e-mail ou WhatsApp, simulando dívidas ou compras que você nunca fez. O pagamento vai direto para a conta dos golpistas.",
    date: "20/01/2025",
  },
  "golpe-do-whatsapp-clonado": {
    title: "Golpe do WhatsApp Clonado",
    description: "Golpistas clonam seu número de WhatsApp e pedem dinheiro aos seus contatos, fingindo ser você em uma emergência.",
    date: "20/01/2025",
  },
};

export default function GolpeDetalhes() {
  const { slug } = useParams();
  console.log("Slug atual:", slug);
  const golpe = golpesDetalhes[slug];
  const [showSimulation, setShowSimulation] = useState(false);

  if (!golpe) {
    return <p className="text-center text-gray-600">Golpe não encontrado.</p>;
  }

  const isPhishingSimulationAvailable = slug === "golpe-do-link-falso";
  const isFakeAdsSimulationAvailable = slug === "golpe-do-falso-anuncios";
  const isFakeBoletoSimulationAvailable = slug === "golpe-do-falso-boleto";
  const isWhatsAppCloneSimulationAvailable = slug === "golpe-do-whatsapp-clonado";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-lg w-full">
        {!showSimulation ? (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 text-center">
              {golpe.title}
            </h1>
            <p className="text-gray-600 text-center text-sm sm:text-base">{golpe.date}</p>
            <p className="text-lg text-gray-800 mt-4 text-center">{golpe.description}</p>
            <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4">
              <button
                onClick={() => window.history.back()}
                className="bg-gray-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-600 transition-all"
              >
                Voltar
              </button>
              {isPhishingSimulationAvailable && (
                <button
                  onClick={() => setShowSimulation(true)}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-medium py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105"
                >
                  Simular Phishing
                </button>
              )}
              {isFakeAdsSimulationAvailable && (
                <button
                  onClick={() => setShowSimulation(true)}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-medium py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105"
                >
                  Simular Anúncio Falso
                </button>
              )}
              {isFakeBoletoSimulationAvailable && (
                <button
                  onClick={() => setShowSimulation(true)}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-medium py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105"
                >
                  Simular Boleto Falso
                </button>
              )}
              {isWhatsAppCloneSimulationAvailable && (
                <button
                  onClick={() => setShowSimulation(true)}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-medium py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105"
                >
                  Simular WhatsApp Clonado
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {isPhishingSimulationAvailable && <PhishingModule />}
            {isFakeAdsSimulationAvailable && <FakeAdsModule />}
            {isFakeBoletoSimulationAvailable && <FakeBoletoModule />}
            {isWhatsAppCloneSimulationAvailable && <WhatsAppCloneModule />}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowSimulation(false)}
                className="bg-red-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-red-600 transition-all"
              >
                Fechar Simulação
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';

const FakeAdsModule = () => {
  const [simulationState, setSimulationState] = useState<'ad' | 'warning' | 'result'>('ad');
  const [simulationResult, setSimulationResult] = useState<'clicked' | 'ignore' | 'report' | null>(null);

  const handleAdClick = () => {
    setSimulationState('warning');
    setSimulationResult('clicked');
  };

  const handleIgnore = () => {
    setSimulationState('result');
    setSimulationResult('ignore');
  };

  const handleReport = () => {
    setSimulationState('result');
    setSimulationResult('report');
  };

  const renderSimulation = () => {
    if (simulationState === 'ad') {
      return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-lg w-full mx-auto transition-all duration-300 transform hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center tracking-tight">
            Simulação: Golpe dos Falsos Anúncios
          </h2>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base font-medium">
            Você viu este anúncio em uma rede social. Preste atenção!
          </p>

          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 shadow-inner">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                Smartphone Ultra X - 80% OFF!
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                De: <span className="line-through">R$ 5.000,00</span> <br />
                Por: <span className="font-bold text-green-700">R$ 999,00</span>
              </p>
              <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                Estoque limitado! Garanta já o seu antes que acabe. Entrega em 2 dias úteis.
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Vendido por: <span className="font-semibold">LojaSuperBarata</span>
              </p>
              <div className="flex justify-center my-6">
                <button
                  onClick={handleAdClick}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 animate-pulse font-semibold"
                >
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleIgnore}
              className="text-gray-600 hover:text-gray-800 text-sm sm:text-base font-medium transition-colors duration-200"
            >
              Ignorar
            </button>
            <button
              onClick={handleReport}
              className="text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium transition-colors duration-200"
            >
              Denunciar
            </button>
          </div>
        </div>
      );
    } else if (simulationState === 'warning') {
      return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-lg w-full mx-auto transition-all duration-300 transform hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-6 text-center tracking-tight">
            Atenção! Você clicou no anúncio!
          </h2>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base font-medium">
            Esse era um golpe de falso anúncio. Veja como se proteger:
          </p>
          <ul className="list-disc list-inside text-gray-800 text-sm sm:text-base mb-6 space-y-2">
            <li className="leading-relaxed">
              Desconfie de preços muito abaixo do mercado, como um celular de R$ 5.000 por R$ 999.
            </li>
            <li className="leading-relaxed">
              Verifique o vendedor: <span className="font-semibold">"LojaSuperBarata"</span> não é conhecida.
            </li>
            <li className="leading-relaxed">Pesquise o site ou loja antes de comprar.</li>
            <li className="leading-relaxed">Evite pagar por Pix ou boleto em sites suspeitos.</li>
          </ul>
          <div className="flex justify-center">
            <button
              onClick={() => setSimulationState('result')}
              className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              Entendido
            </button>
          </div>
        </div>
      );
    } else if (simulationState === 'result') {
      return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-lg w-full mx-auto transition-all duration-300 transform hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center tracking-tight">
            Resultado da Simulação
          </h2>
          {simulationResult === 'clicked' && (
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6 font-medium leading-relaxed">
              Você caiu no golpe ao clicar no anúncio. Desconfie de ofertas boas demais para ser verdade!
            </p>
          )}
          {simulationResult === 'ignore' && (
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6 font-medium leading-relaxed">
              Boa decisão! Ignorar anúncios suspeitos evita problemas.
            </p>
          )}
          {simulationResult === 'report' && (
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6 font-medium leading-relaxed">
              Ótimo! Denunciar ajuda a proteger outros usuários.
            </p>
          )}
          <div className="text-sm sm:text-base text-gray-800">
            <p className="font-semibold text-green-700 mb-2">Dica Extra:</p>
            <p className="leading-relaxed">
              Compre apenas em sites confiáveis e verifique avaliações de outros clientes.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6">
      {renderSimulation()}
    </div>
  );
};

export default FakeAdsModule;
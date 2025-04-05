import React, { useState } from 'react';

const WhatsAppCloneModule = () => {
  const [simulationState, setSimulationState] = useState<'message' | 'warning' | 'result'>('message');
  const [simulationResult, setSimulationResult] = useState<'clicked' | 'ignore' | 'report' | null>(null);

  const handleMessageClick = () => {
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
    if (simulationState === 'message') {
      return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-lg w-full mx-auto transition-all duration-300 transform hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center tracking-tight">
            Simulação: Golpe do WhatsApp Clonado
          </h2>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base font-medium">
            Você recebeu esta mensagem no WhatsApp. Fique atento!
          </p>

          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 shadow-inner">
            <div className="text-left">
              <p className="text-sm text-gray-500 mb-2">
                De: <span className="font-semibold">Amigo (11) 98765-4321</span>
              </p>
              <p className="text-gray-800 text-sm sm:text-base mb-4 leading-relaxed">
                Oi, tudo bem? Tô numa emergência, meu carro quebrou e preciso de R$ 800 pra consertar. Pode me ajudar com um Pix agora? Te pago amanhã!
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Chave Pix: <span className="font-semibold">pix.amigo@gmail.com</span>
              </p>
              <div className="flex justify-center my-6">
                <button
                  onClick={handleMessageClick}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 animate-pulse font-semibold"
                >
                  Enviar Pix
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
            Cuidado! Isso pode ser um golpe!
          </h2>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base font-medium">
            Esse era um golpe de WhatsApp clonado. Veja como se proteger:
          </p>
          <ul className="list-disc list-inside text-gray-800 text-sm sm:text-base mb-6 space-y-2">
            <li className="leading-relaxed">
              Confirme com o contato por ligação ou pessoalmente antes de enviar dinheiro.
            </li>
            <li className="leading-relaxed">
              Desconfie de pedidos urgentes de dinheiro, mesmo de "amigos".
            </li>
            <li className="leading-relaxed">Nunca envie Pix sem verificar a identidade.</li>
            <li className="leading-relaxed">Ative a verificação em duas etapas no WhatsApp.</li>
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
              Você caiu no golpe ao tentar enviar o Pix. Sempre confirme a identidade do contato!
            </p>
          )}
          {simulationResult === 'ignore' && (
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6 font-medium leading-relaxed">
              Boa escolha! Ignorar mensagens suspeitas evita prejuízos.
            </p>
          )}
          {simulationResult === 'report' && (
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6 font-medium leading-relaxed">
              Excelente! Denunciar ajuda a proteger você e seus contatos.
            </p>
          )}
          <div className="text-sm sm:text-base text-gray-800">
            <p className="font-semibold text-green-700 mb-2">Dica Extra:</p>
            <p className="leading-relaxed">
              Se seu WhatsApp for clonado, avise seus contatos imediatamente.
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

export default WhatsAppCloneModule;
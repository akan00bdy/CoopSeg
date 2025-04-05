import React, { useState } from 'react';

const PhishingModule = () => {
  const [simulationState, setSimulationState] = useState<'email' | 'warning' | 'result'>('email');
  const [simulationResult, setSimulationResult] = useState<'clicked' | 'ignore' | 'report' | null>(null);

  const handleEmailClick = () => {
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
    if (simulationState === 'email') {
      return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-lg w-full mx-auto transition-all duration-300 transform hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center tracking-tight">
            Simulação: Phishing Bancário
          </h2>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base font-medium">
            Você recebeu este e-mail. Observe os detalhes com atenção!
          </p>

          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 shadow-inner">
            <div className="mb-4 border-b border-gray-200 pb-3">
              <p className="text-sm text-gray-700 font-semibold">
                De: <span className="text-gray-500">seguranca@banc0Brasil.net</span>
              </p>
              <p className="text-sm text-gray-700 font-semibold">
                Para: <span className="text-gray-500">voce@email.com</span>
              </p>
              <p className="text-sm text-gray-700 font-semibold">
                Assunto: <span className="text-gray-500">🚨 ATUALIZAÇÃO URGENTE: Seu cartão expira em 24h!</span>
              </p>
            </div>

            <div className="text-base text-gray-800">
              <p className="mb-4 leading-relaxed">Prezado(a) cliente,</p>
              <p className="mb-4 leading-relaxed">
                Detectamos uma falha no seu cadastro. Para evitar o bloqueio imediato do seu cartão e conta, atualize seus dados agora mesmo.
              </p>
              <p className="mb-4 font-bold text-red-600 tracking-wide">
                Prazo: 24 horas. Não perca o acesso ao seu dinheiro!
              </p>
              <div className="flex justify-center my-6">
                <button
                  onClick={handleEmailClick}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 animate-pulse font-semibold"
                >
                  Atualizar Dados Agora
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-6 leading-relaxed">
                Atenciosamente,
                <br />
                <span className="font-semibold text-gray-700">Equipe de Segurança</span>
                <br />
                Banc0 Brasil S.A.
              </p>
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
              Comunicar ao Banco
            </button>
          </div>
        </div>
      );
    } else if (simulationState === 'warning') {
      return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-lg w-full mx-auto transition-all duration-300 transform hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-6 text-center tracking-tight">
            Cuidado! Você clicou no link!
          </h2>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base font-medium">
            Isso era um golpe de phishing. Veja como se proteger:
          </p>
          <ul className="list-disc list-inside text-gray-800 text-sm sm:text-base mb-6 space-y-2">
            <li className="leading-relaxed">
              Verifique o remetente: <span className="font-semibold">"banc0Brasil.net"</span> não é oficial (o correto é <span className="font-semibold">www.bb.com.br</span>).
            </li>
            <li className="leading-relaxed">Nunca clique em links de e-mails suspeitos.</li>
            <li className="leading-relaxed">Bancos não enviam pedidos urgentes por e-mail.</li>
            <li className="leading-relaxed">Fique atento a erros de escrita ou tom alarmista.</li>
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
              Você caiu no golpe ao clicar no link. Desconfie de e-mails urgentes e remetentes estranhos!
            </p>
          )}
          {simulationResult === 'ignore' && (
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6 font-medium leading-relaxed">
              Boa escolha! Ignorar e-mails suspeitos é uma ótima forma de se proteger.
            </p>
          )}
          {simulationResult === 'report' && (
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6 font-medium leading-relaxed">
              Excelente! Comunicar ao banco ajuda a combater golpes.
            </p>
          )}
          <div className="text-sm sm:text-base text-gray-800">
            <p className="font-semibold text-green-700 mb-2">Dica Extra:</p>
            <p className="leading-relaxed">Acesse o site do banco digitando o endereço oficial no navegador, nunca por links de e-mails.</p>
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

export default PhishingModule;
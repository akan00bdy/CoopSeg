import React, { useState } from 'react';

const FakeBoletoModule = () => {
  const [simulationState, setSimulationState] = useState<'boleto' | 'warning' | 'result'>('boleto');
  const [simulationResult, setSimulationResult] = useState<'clicked' | 'ignore' | 'report' | null>(null);

  const handleBoletoClick = () => {
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
    if (simulationState === 'boleto') {
      return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-lg w-full mx-auto transition-all duration-300 transform hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center tracking-tight">
            Simulação: Golpe do Falso Boleto
          </h2>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base font-medium">
            Você recebeu este boleto por e-mail. Analise com cuidado!
          </p>

          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 shadow-inner">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                Fatura de Energia Elétrica - Vencimento Urgente
              </h3>
              <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                Valor: <span className="font-bold text-red-600">R$ 1.245,89</span>
                <br />
                Vencimento: <span className="font-semibold">Amanhã</span>
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Emitido por: <span className="font-semibold">EnergiaBR</span>
                <br />
                Código de Barras: 1234.5678.9012.3456...
              </p>
              <div className="flex justify-center my-6">
                <button
                  onClick={handleBoletoClick}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 animate-pulse font-semibold"
                >
                  Pagar Agora
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
            Cuidado! Você quase pagou um boleto falso!
          </h2>
          <p className="text-gray-600 mb-6 text-center text-sm sm:text-base font-medium">
            Esse era um golpe. Veja como identificar boletos falsos:
          </p>
          <ul className="list-disc list-inside text-gray-800 text-sm sm:text-base mb-6 space-y-2">
            <li className="leading-relaxed">
              Verifique o remetente: e-mails oficiais vêm de domínios como <span className="font-semibold">"@energisa.com.br"</span>, não genéricos.
            </li>
            <li className="leading-relaxed">
              Confirme o valor: R$ 1.245,89 é muito alto para uma fatura comum.
            </li>
            <li className="leading-relaxed">Cheque o código de barras no app do banco.</li>
            <li className="leading-relaxed">Desconfie de prazos urgentes e ameaças.</li>
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
              Você caiu no golpe ao tentar pagar. Sempre confirme boletos com a empresa oficial!
            </p>
          )}
          {simulationResult === 'ignore' && (
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6 font-medium leading-relaxed">
              Boa escolha! Ignorar boletos suspeitos evita prejuízos.
            </p>
          )}
          {simulationResult === 'report' && (
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6 font-medium leading-relaxed">
              Excelente! Denunciar ajuda a combater esse tipo de golpe.
            </p>
          )}
          <div className="text-sm sm:text-base text-gray-800">
            <p className="font-semibold text-green-700 mb-2">Dica Extra:</p>
            <p className="leading-relaxed">
              Consulte suas faturas diretamente no site ou app oficial da empresa.
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

export default FakeBoletoModule;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [ShowTermosModal, setShowTermosModal] = useState(false);
  const [ShowPrivadoModal, setShowPrivadoModal] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!acceptedTerms) {
      alert("Você precisa aceitar os Termos de Uso para continuar!");
      return;
    }

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
      router.push("/login");
    } else {
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-green-700 text-center">CoopSeg</h2>
        <p className="text-gray-600 text-center mb-6">Crie sua conta</p>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full pl-10 p-2 border border-gray-300 rounded placeholder-gray-500 text-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full pl-10 p-2 border border-gray-300 rounded placeholder-gray-500 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="*******"
              className="w-full pl-10 p-2 border border-gray-300 rounded placeholder-gray-500 text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="*******"
              className="w-full pl-10 p-2 border border-gray-300 rounded placeholder-gray-500 text-gray-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="aceito"
              name="aceito"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mr-2"
              required
            />
            <label htmlFor="aceito" className="text-gray-500">
              Li e concordo com os{" "}
              <button
                type="button"
                onClick={() => setShowTermosModal(true)}
                className="text-blue-500 underline"
              >
                Termos de Uso
              </button>
              <br/>e a 
              <button 
                type="button"
                onClick={() => setShowPrivadoModal(true)}
                className="text-blue-500 underline p-1"
              >
                Politicas de Privacidade.
              </button>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Criar Conta
          </button>
        </form>

        {ShowTermosModal && (
          <div className="fixed inset-0 bg-green-50 bg-opacity-50 flex items-center justify-center flex-col">
            <div className="max-h-[80vh] max-w-[90vw] md:max-w-[600px] overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-100">
              <h3 className="text-lg font-bold text-gray-600">Termos de Uso</h3>
              <p className="mt-2 text-gray-600">
                Última atualização: [29 de março de 2025] <br />
                Bem-vindo ao CoopSeg! Nosso site tem como objetivo educar pessoas sobre golpes financeiros, promover discussões sobre segurança financeira e permitir que os usuários compartilhem experiências e aprendam sobre golpes de forma interativa. <br />
                Ao acessar e utilizar o CoopSeg, você concorda com os seguintes Termos de Uso. Caso não concorde com alguma condição, recomendamos que não utilize a plataforma.<br />
                1. Cadastro e Conta de Usuário<br />
                1.1. Para fazer postagens no fórum, o usuário deve se cadastrar, fornecendo nome, e-mail e senha.<br />
                1.2. O usuário é responsável por manter suas credenciais seguras e não compartilhá-las com terceiros.<br />
                1.3. O CoopSeg pode suspender ou excluir contas que violem estes Termos de Uso.<br />
                2. Regras do Fórum<br />
                2.1. O fórum do CoopSeg é um espaço para compartilhar informações e experiências sobre golpes financeiros de maneira segura e respeitosa.<br />
                2.2. É proibido publicar conteúdos que incluam:<br />
                Dados pessoais ou bancários de qualquer pessoa;<br />
                Discurso de ódio, fake news ou conteúdo ofensivo;<br />
                Propaganda de produtos ou serviços;<br />
                Qualquer tipo de conteúdo ilegal ou que incentive fraudes.<br />
                2.3. O CoopSeg não se responsabiliza por informações publicadas pelos usuários e recomenda que cada postagem seja analisada com cuidado antes de ser seguida.<br />
                3. Moderação e Penalidades<br />
                3.1. O CoopSeg possui moderadores que monitoram as postagens e podem editar ou remover conteúdos que violem as regras.<br />
                3.2. As penalidades serão aplicadas de acordo com a gravidade da infração e podem incluir:<br />
                Advertência ao usuário;<br />
                Suspensão temporária da conta;<br />
                Banimento definitivo.<br />
                3.3. Os usuários podem denunciar postagens inadequadas para análise da moderação.<br />
                4. Direitos Autorais e Uso de Conteúdo<br />
                4.1. O CoopSeg pode armazenar e exibir os conteúdos publicados pelos usuários.<br />
                4.2. Os usuários são responsáveis pelo conteúdo que postam e garantem que não estão violando direitos autorais.<br />
                5. Alterações nos Termos de Uso<br />
                5.1. O CoopSeg pode atualizar estes Termos de Uso a qualquer momento. Os usuários serão notificados sobre mudanças significativas.<br />
                6. Contato<br />
                Se tiver dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail suporte@coopseg.com.br.<br />
              </p>
            </div>
            <button
              className="mt-4 bg-green-600 text-white p-2 rounded"
              onClick={() => setShowTermosModal(false)}
            >
              Fechar
            </button>
          </div>
        )}

        {ShowPrivadoModal && (
          <div className="fixed inset-0 bg-green-50 bg-opacity-50 flex items-center justify-center flex-col">
            <div className="max-h-[80vh] max-w-[90vw] md:max-w-[600px] overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-100">
              <h3 className="text-lg font-bold text-gray-600">Política de Privacidade</h3>
              <p className="mt-2 text-gray-600">
              Última atualização: [29 de março de 2025]<br />
              A sua privacidade é importante para nós! Esta Política de Privacidade explica como o CoopSeg coleta, usa e protege suas informações.<br />
              Ao utilizar o nosso site, você concorda com as práticas descritas abaixo.<br />
              1. Informações Coletadas<br />
              O CoopSeg coleta os seguintes dados dos usuários:<br />
              Nome, e-mail e senha (necessários para cadastro no fórum);<br />
              Dados de navegação, como endereço IP, tipo de navegador e tempo de uso;<br />
              Conteúdos postados no fórum.<br />
              2. Como Usamos Seus Dados<br />
              O CoopSeg utiliza os dados coletados para:<br />
              Estatísticas sobre o uso da plataforma;<br />
              Garantir a segurança e o bom funcionamento do site.<br />
              Importante: O CoopSeg não compartilha seus dados com terceiros.<br />
              3. Segurança das Informações<br />
              O CoopSeg adota medidas para proteger os dados dos usuários, incluindo:<br />
              Criptografia para proteger as informações armazenadas;<br />
              Restrição de acesso aos dados, garantindo que apenas pessoas autorizadas possam acessá-los.<br />
              4. Direitos do Usuário<br />
              4.1. O usuário pode solicitar a exclusão de sua conta e dos seus dados armazenados a qualquer momento.<br />
              4.2. Para fazer qualquer solicitação relacionada aos seus dados, entre em contato pelo e-mail suporte@coopseg.com.br.<br />
              5. Uso de Cookies<br />
              O CoopSeg não utiliza cookies para rastreamento ou personalização de conteúdo.<br />
              6. Alterações na Política de Privacidade<br />
              6.1. O CoopSeg pode atualizar esta política conforme necessário, e os usuários serão notificados em caso de mudanças importantes.<br />
              7. Contato<br />
              Se tiver dúvidas sobre esta Política de Privacidade, entre em contato pelo e-mail suporte@coopseg.com.br.<br />
              </p>
            </div>
            <button
              className="mt-4 bg-green-600 text-white p-2 rounded"
              onClick={() => setShowPrivadoModal(false)}
            >
              Fechar
            </button>
          </div>
        )}

        <p className="text-center text-gray-600 mt-4">
          Já tem uma conta?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}
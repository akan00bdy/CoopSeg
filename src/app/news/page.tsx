"use client";

import { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtecaoRota';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

interface News {
  id: number;
  title: string;
  content: string;
  fullContent?: string;
  source: string;
  url?: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API_URL}/news`, {
        params: { limit: 10 },
      });
      console.log('Resposta completa da API:', response);
      console.log('Dados recebidos da API:', response.data);
      const data = Array.isArray(response.data) ? response.data : [];
      setNews(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
      setError('Falha ao carregar notícias.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Data inválida'
      : date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-green-50">
        <Sidebar />
        <div className="flex-1 p-6 ml-64 overflow-y-auto h-screen">
          <h1 className="text-2xl font-bold text-green-700 mb-4">
            Notícias Recentes
          </h1>
          <p className="text-gray-600 mb-6">
            Mantenha-se informado sobre as últimas ameaças à segurança e medidas de proteção.
          </p>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : loading ? (
            <p className="text-gray-500">Carregando notícias...</p>
          ) : news.length === 0 ? (
            <p className="text-gray-500">Nenhuma notícia encontrada.</p>
          ) : (
            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">📢</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {item.fullContent || item.content}
                    </p>
                    <a
                      href={item.url || item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 font-medium mt-2 inline-block hover:underline"
                    >
                      Leia mais na fonte +
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
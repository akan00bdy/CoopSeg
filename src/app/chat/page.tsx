"use client";

import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtecaoRota';
import axios from 'axios';

interface Message {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('UsuarioName');
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/chat/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/chat/send`, {
        username,
        content: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <ProtectedRoute>
          <div className="flex min-h-screen bg-green-50">
            <Sidebar />
            <div className="flex-1 p-6 ml-64 overflow-y-auto h-screen">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Chat</h1>

          <div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <p className="text-gray-500">Nenhuma mensagem no chat.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="mb-2">
                  <p className="text-sm text-gray-500">
                    {msg.username} -{' '}
                    {new Date(msg.createdAt).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </p>
                  <p className="text-gray-800">{msg.content}</p>
                </div>
              ))
            )}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-gray-800"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400"
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
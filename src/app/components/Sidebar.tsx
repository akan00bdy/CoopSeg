"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, MessageSquare, BrainCircuit, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'


export default function Sidebar() {
  const pathname = usePathname();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

const Logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.removeItem('token');
      localStorage.clear();
      router.push('/login');

    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const [user, setUser] = useState({ name: 'name', id: 'id' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.log('ID do usuário não encontrado');
          return;
        }

        const response = await fetch(`${API_URL}/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }

        const data = await response.json();
        setUser({ name: data.name, id: data.id });
      } catch (error) {
        console.log('Erro ao buscar usuário:', error);
      }
    };

    fetchUserData();
  }, [API_URL]); 

  const menuItems = [
    { name: 'Aprender', path: '/aprender', icon: <GraduationCap className="w-5 h-5" /> },
    { name: 'Notícias', path: '/news', icon: <Newspaper className="w-5 h-5" /> },
    { name: 'Forum', path: '/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Quiz', path: '/quiz', icon: <BrainCircuit className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col">
      <div className="p-5 text-2xl">
        <Image 
        src="/logocoopseg.png" 
        alt="Logo CoopSeg"
        width={150} 
        height={50}></Image>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>
                <div
                  className={`flex items-center p-2 rounded-lg hover:bg-green-50 transition-colors ${
                    pathname === item.path ? 'bg-green-50 text-green-700' : 'text-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <p className="text-green-700 font-medium">{user.name}</p>
            <p className="text-green-600 text-sm">#{user.id}</p>
          </div>
          <button onClick={Logout} className='flex items-center p-2 ml-12 text-green-600 rounded-lg hover:bg-gray-200 transition-colors'>Sair</button>
        </div>
      </div>
    </div>
  );
}
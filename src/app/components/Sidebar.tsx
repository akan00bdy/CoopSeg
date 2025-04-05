"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, LayoutDashboard, MessageSquare, BrainCircuit, GraduationCap, Info, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
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
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Aprender', path: '/aprender', icon: <GraduationCap className="w-5 h-5" /> },
    { name: 'Notícias', path: '/news', icon: <Newspaper className="w-5 h-5" /> },
    { name: 'Chat', path: '/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Quiz', path: '/quiz', icon: <BrainCircuit className="w-5 h-5" /> },
    { name: 'Sobre', path: '/sobre', icon: <Info className='w-5 h-5'/> }
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 text-2xl flex justify-between items-center">
          <Image src="/logocoopseg.png" alt="Logo CoopSeg" width={150} height={50} />
          <button onClick={toggleSidebar} className="text-gray-700 hover:text-green-700">
            <X className="w-6 h-6" />
          </button>
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
          <div className="flex items-center space-x-3 w-full">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-green-700 font-medium truncate">
                {user.name}
              </span>
              <span className="text-green-600 text-sm truncate">#{user.id}</span>
            </div>
            <button
              onClick={Logout}
              className="ml-7 p-2 text-green-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-colors z-50"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
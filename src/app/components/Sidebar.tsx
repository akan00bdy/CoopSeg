"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Newspaper,
  LayoutDashboard,
  MessageSquare,
  BrainCircuit,
  GraduationCap,
  Info,
  X,
  Menu,
  LogOut,
} from 'lucide-react';
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

  const [user, setUser] = useState({ name: 'Usuário', id: '0000' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        const response = await fetch(`${API_URL}/user/${userId}`);
        const data = await response.json();
        setUser({ name: data.name, id: data.id });
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };
    fetchUserData();
  }, [API_URL]);

  const Logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.clear();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Aprender', path: '/aprender', icon: GraduationCap },
    { name: 'Notícias', path: '/news', icon: Newspaper },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Quiz', path: '/quiz', icon: BrainCircuit },
    { name: 'Sobre', path: '/sobre', icon: Info },
  ];

  return (
    <>
      {/* Sidebar Principal */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <Image src="/logocoopseg.png" alt="Logo CoopSeg" width={130} height={50} />
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-green-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex-1 px-4 py-6 overflow-auto">
          <ul className="space-y-1">
            {menuItems.map(({ name, path, icon: Icon }) => {
              const isActive = pathname === path;
              return (
                <li key={name}>
                  <Link href={path}>
                    <div
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer group ${
                        isActive
                          ? 'bg-green-100 text-green-700 font-semibold'
                          : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="truncate">{name}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-medium text-gray-700 truncate">{user.name}</span>
              <span className="text-green-600 text-xs truncate">#{user.id}</span>
            </div>
          </div>
          <button
            onClick={Logout}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-red-600 transition-colors"
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Botão de abrir sidebar (mobile) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-2 bg-green-600 text-white rounded-full shadow-lg z-50 hover:bg-green-700 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

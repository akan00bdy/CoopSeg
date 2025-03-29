"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, MessageSquare, BrainCircuit, GraduationCap } from 'lucide-react'; 
export default function Sidebar() {
  const pathname = usePathname(); 

  const menuItems = [
    { name: 'Aprender', path: '/aprender', icon: <GraduationCap className="w-5 h-5" /> },
    { name: 'Notícias', path: '/news', icon: <Newspaper className="w-5 h-5" /> },
    { name: 'Forum', path: '/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Quiz', path: '/quiz', icon: <BrainCircuit className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-green-700">CoopSeg</h1>
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
            U
          </div>
          <div>
            <p className="text-gray-700 font-medium">UsuarioName</p>
            <p className="text-green-600 text-sm">#pessoal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
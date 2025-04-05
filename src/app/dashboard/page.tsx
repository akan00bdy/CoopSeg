"use client";

import ProtectedRoute from '../components/ProtecaoRota';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-green-50 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <h1
              className={`text-2xl font-bold text-green-700 mb-10 transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'ml-0' : 'ml-10'
              }`}
            >
              Golpes em números
            </h1>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[1200px]">
              <iframe
                width="100%"
                height="920"
                src="https://lookerstudio.google.com/embed/reporting/a1e47f1a-1283-4fc1-9d23-ae529b7c780f/page/sKSEF"
                frameBorder="0"
                allowFullScreen
                className="rounded-xl"
                style={{ border: 0 }}
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

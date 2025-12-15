'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <Header onMenuClick={toggleSidebar} />
          
          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
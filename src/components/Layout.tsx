import Navbar from './Navbar';
import Footer from './Footer';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
  <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

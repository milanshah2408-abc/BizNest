import type { ReactNode } from 'react';

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <div className="py-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
}

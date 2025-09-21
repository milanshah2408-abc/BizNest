import type { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      {children}
    </div>
  );
}

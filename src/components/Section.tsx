import type { ReactNode } from 'react';

export default function Section({ children }: { children: ReactNode }) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {children}
    </section>
  );
}

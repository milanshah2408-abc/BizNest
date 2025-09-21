import type { ReactNode, ButtonHTMLAttributes } from 'react';

export default function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button {...props} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50" >
      {children}
    </button>
  );
}

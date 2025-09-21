"use client";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type UserWithAdmin = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  admin?: boolean;
};

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const user = session?.user as UserWithAdmin | undefined;
  const isAdmin = user?.admin;
  const inAdmin = pathname.startsWith('/admin');
  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl text-white">Business</Link>
          <Link href="/about" className="text-gray-300 hover:text-blue-400">About</Link>
          <Link href="/services" className="text-gray-300 hover:text-blue-400">Services</Link>
          <Link href="/blog" className="text-gray-300 hover:text-blue-400">Blog</Link>
          <Link href="/contact" className="text-gray-300 hover:text-blue-400">Contact</Link>
          {isAdmin && (
            inAdmin ? (
              <Link href="/admin" className="text-yellow-400 hover:text-yellow-500 font-bold">Admin</Link>
            ) : (
              <Link href="/admin" className="text-yellow-400 hover:text-yellow-500 font-bold">Admin</Link>
            )
          )}
        </div>
        {status === "loading" ? null : (
          session?.user ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold">{session.user.name || session.user.email}</span>
              <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700" onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">Login</Link>
              <Link href="/register" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700">Register</Link>
            </div>
          )
        )}
      </div>
    </nav>
  );
}

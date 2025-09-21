export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-900 border-t border-gray-800 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Business. All rights reserved.
      </div>
    </footer>
  );
}

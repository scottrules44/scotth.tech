import React from 'react';

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2017–2025 Scott Harrison
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-600">
          Built with React
        </p>
      </div>
    </footer>
  );
}

export default Footer;

'use client';

import Link from 'next/link';
import { Home, Play, Code, Github, ExternalLink } from 'lucide-react';

interface NavigationProps {
  currentPage?: 'home' | 'demo' | 'simple';
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage = 'home' }) => {
  const getLinkClasses = (page: string) => {
    const isActive = currentPage === page;
    return `flex items-center space-x-2 transition-colors ${
      isActive 
        ? 'text-blue-600 font-medium' 
        : 'text-gray-600 hover:text-gray-800'
    }`;
  };

  return (
    <nav className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className={getLinkClasses('home')}>
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link href="/demo" className={getLinkClasses('demo')}>
            <Play className="h-5 w-5" />
            <span>Full Demo</span>
          </Link>
          <Link href="/simple" className={getLinkClasses('simple')}>
            <Code className="h-5 w-5" />
            <span>Simple Example</span>
          </Link>
          <Link 
            href="https://github.com/Mp17082005/pearltech-recurring" 
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </Link>
        </div>
        <Link 
          href="https://pearltech-recurring-331d9l5u0-mp17082005s-projects.vercel.app"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Live Site</span>
        </Link>
      </div>
    </nav>
  );
};

'use client';

import Link from 'next/link';
import { Calendar, Github, ExternalLink, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">PearlTech Recurring</span>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced recurring date picker component for Next.js applications.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-semibold mb-4">Pages</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/demo" className="block text-gray-400 hover:text-white transition-colors">
                Interactive Demo
              </Link>
              <Link href="/simple" className="block text-gray-400 hover:text-white transition-colors">
                Simple Example
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <Link 
                href="https://github.com/Mp17082005/pearltech-recurring" 
                className="block text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </Link>
              <Link 
                href="https://github.com/Mp17082005/pearltech-recurring/issues" 
                className="block text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Issues & Support
              </Link>
              <Link 
                href="https://github.com/Mp17082005/pearltech-recurring/blob/master/README.md" 
                className="block text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com/Mp17082005/pearltech-recurring"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="https://pearltech-recurring-331d9l5u0-mp17082005s-projects.vercel.app"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-4">
              <Link 
                href="https://github.com/Mp17082005/pearltech-recurring"
                className="inline-flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="h-4 w-4" />
                <span className="text-sm">Star on GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 PearlTech Recurring. Built with Next.js and TypeScript.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">
              Made with ❤️ for developers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

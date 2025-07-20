'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Github, ExternalLink, Star, Code, Zap, Shield } from 'lucide-react';
import { RecurringDatePicker } from '@/components/RecurringDatePicker';
import ClientOnly from '@/components/ClientOnly';
import { clsx } from 'clsx';

// TypeScript interfaces for better type safety
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

interface StatsProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => (
  <div className={clsx(
    'bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20',
    'hover:bg-white/20 transition-all duration-300 hover:scale-105',
    className
  )}>
    <div className="text-blue-300 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
  </div>
);

// Stats Component
const StatCard: React.FC<StatsProps> = ({ label, value, icon }) => (
  <div className="text-center">
    <div className="text-blue-300 mb-2 flex justify-center">{icon}</div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

export default function HomePage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized callback for date selection
  const handleDateSelect = useCallback((dates: Date[]) => {
    setIsLoading(true);
    // Simulate processing time to show loading state
    setTimeout(() => {
      setSelectedDates(dates);
      setIsLoading(false);
    }, 300);
  }, []);

  // Format dates for display
  const formatSelectedDates = useCallback(() => {
    if (selectedDates.length === 0) return 'No dates selected';
    if (selectedDates.length <= 3) {
      return selectedDates.map(date => 
        date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      ).join(', ');
    }
    return `${selectedDates.length} dates selected (${selectedDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${selectedDates[selectedDates.length - 1].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
  }, [selectedDates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Image and Website Link */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        
        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">PearlTech Recurring</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="https://github.com/your-repo/pearltech-recurring" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">GitHub</span>
              </Link>
              <Link 
                href="https://pearltech-recurring.vercel.app" 
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="h-4 w-4" />
                  <span>Next.js 15 + TypeScript</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Advanced Recurring
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {' '}Date Picker
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  A powerful, enterprise-grade React component built with modern Next.js, 
                  TypeScript, and advanced state management. Perfect for scheduling, 
                  appointments, and recurring events.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-8">
                <StatCard 
                  icon={<Code className="h-6 w-6" />} 
                  value="100%" 
                  label="TypeScript" 
                />
                <StatCard 
                  icon={<Zap className="h-6 w-6" />} 
                  value="<100ms" 
                  label="Response Time" 
                />
                <StatCard 
                  icon={<Shield className="h-6 w-6" />} 
                  value="A11y" 
                  label="Accessible" 
                />
              </div>

              {/* Website Link Prominently Displayed */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Live Website</h3>
                    <p className="text-gray-300 text-sm">Experience the component in action</p>
                  </div>
                  <Link 
                    href="https://pearltech-recurring.vercel.app"
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span className="font-medium">Visit Site</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <Image
                  src="/hero-image.svg"
                  alt="Recurring Date Picker Component Preview"
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-xl"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Built with Modern Next.js
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing advanced Next.js patterns, TypeScript best practices, and enterprise-grade architecture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="h-8 w-8" />}
              title="TypeScript First"
              description="Fully typed with advanced TypeScript patterns, interfaces, and strict type checking for maximum developer experience."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Next.js 15 App Router"
              description="Built with the latest Next.js App Router, Server Components, and modern React patterns for optimal performance."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="State Management"
              description="Advanced state management with Zustand, custom hooks, and optimized re-rendering strategies."
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Interactive Demo
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Try the recurring date picker component with all its advanced features
            </p>
            
            {/* Selected Dates Display */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-2xl mx-auto mb-8">
              <h3 className="text-lg font-semibold text-white mb-2">Selected Dates</h3>
              <div className={clsx(
                'text-gray-300 transition-all duration-300',
                isLoading && 'opacity-50'
              )}>
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  formatSelectedDates()
                )}
              </div>
              {selectedDates.length > 0 && (
                <div className="text-sm text-blue-300 mt-2">
                  {selectedDates.length} date{selectedDates.length !== 1 ? 's' : ''} total
                </div>
              )}
            </div>
          </div>

          {/* Date Picker Component */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <ClientOnly fallback={
                <div className="flex items-center justify-center h-96 text-gray-400">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <p>Loading Date Picker...</p>
                  </div>
                </div>
              }>
                <RecurringDatePicker 
                  className="w-full"
                  onDateSelect={handleDateSelect}
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Calendar className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold text-white">PearlTech Recurring</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="https://github.com/your-repo/pearltech-recurring" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="https://pearltech-recurring.vercel.app" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              Built with Next.js 15, TypeScript, Tailwind CSS, and modern React patterns
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
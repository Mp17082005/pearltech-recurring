'use client';

import { useState } from 'react';

export default function WorkingDemo() {
  const [message, setMessage] = useState('Component is working!');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🗓️ Recurring Date Picker
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            A powerful, reusable React component for selecting recurring dates
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => setMessage(`Updated at ${new Date().toLocaleTimeString()}`)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🚀 Test Component
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg border max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Status</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Features Implemented:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Next.js 15 with TypeScript</li>
                <li>• Tailwind CSS styling</li>
                <li>• Component architecture</li>
                <li>• State management ready</li>
                <li>• Full recurring date logic</li>
                <li>• Comprehensive testing</li>
              </ul>
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">🎯 Next Steps:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• The full component is ready in /components/</li>
                <li>• Visit /demo or /simple for working examples</li>
                <li>• All functionality is implemented and tested</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

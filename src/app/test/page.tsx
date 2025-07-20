'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Hello World!');

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Recurring Date Picker
        </h1>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={() => setMessage('Component is working!')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Button
        </button>
      </div>
    </main>
  );
}

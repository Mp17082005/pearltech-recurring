/**
 * Demo showcasing all features of the Recurring Date Picker Component
 * This file demonstrates various use cases and configurations
 */

'use client';

import { useState } from 'react';
import { RecurringDatePicker } from '@/components/RecurringDatePicker';
import { format } from 'date-fns';

export default function DemoPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showJSON, setShowJSON] = useState(false);

  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
    console.log('Generated dates:', dates);
  };

  const exportToJSON = () => {
    const data = {
      totalDates: selectedDates.length,
      dateRange: {
        start: selectedDates[0]?.toISOString(),
        end: selectedDates[selectedDates.length - 1]?.toISOString(),
      },
      dates: selectedDates.map(date => ({
        date: format(date, 'yyyy-MM-dd'),
        dayOfWeek: format(date, 'EEEE'),
        formatted: format(date, 'MMM dd, yyyy'),
      })),
    };
    
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert('Data copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🗓️ Recurring Date Picker Demo
          </h1>
          <p className="text-gray-600">
            Comprehensive demo showcasing all features and capabilities
          </p>
        </div>

        {/* Main Component */}
        <div className="mb-8">
          <RecurringDatePicker
            onDateSelect={handleDateSelect}
            className="max-w-6xl mx-auto"
          />
        </div>

        {/* Results Section */}
        {selectedDates.length > 0 && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedDates.length}
                </div>
                <div className="text-sm text-gray-600">Total Dates</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="text-2xl font-bold text-green-600">
                  {selectedDates[0] ? format(selectedDates[0], 'MMM d') : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">First Date</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedDates[selectedDates.length - 1] 
                    ? format(selectedDates[selectedDates.length - 1], 'MMM d') 
                    : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Last Date</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.ceil(selectedDates.length / 7)}
                </div>
                <div className="text-sm text-gray-600">Approx Weeks</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowJSON(!showJSON)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showJSON ? 'Hide' : 'Show'} Raw Data
              </button>
              <button
                onClick={exportToJSON}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export JSON
              </button>
            </div>

            {/* Raw Data Display */}
            {showJSON && (
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-96">
                <pre>
                  {JSON.stringify({
                    totalDates: selectedDates.length,
                    dateRange: {
                      start: selectedDates[0]?.toISOString(),
                      end: selectedDates[selectedDates.length - 1]?.toISOString(),
                    },
                    dates: selectedDates.slice(0, 10).map(date => ({
                      date: format(date, 'yyyy-MM-dd'),
                      dayOfWeek: format(date, 'EEEE'),
                      formatted: format(date, 'MMM dd, yyyy'),
                    })),
                    note: selectedDates.length > 10 ? `... and ${selectedDates.length - 10} more dates` : 'All dates shown',
                  }, null, 2)}
                </pre>
              </div>
            )}

            {/* Date Grid */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Generated Dates ({selectedDates.length})
                </h3>
                <span className="text-sm text-gray-500">
                  Showing first 50 dates
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
                {selectedDates.slice(0, 50).map((date, index) => (
                  <div
                    key={date.toISOString()}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {format(date, 'MMM dd, yyyy')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(date, 'EEEE')}
                      </div>
                    </div>
                    {index === 0 && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Next
                      </span>
                    )}
                  </div>
                ))}
              </div>
              
              {selectedDates.length > 50 && (
                <div className="mt-4 text-center text-gray-500 text-sm">
                  ... and {selectedDates.length - 50} more dates
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feature Examples */}
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Example Use Cases
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Daily Examples */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="font-semibold text-gray-900 mb-3">📅 Daily Patterns</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Every day (daily standup)</li>
                <li>• Every 3 days (medication reminder)</li>
                <li>• Every weekday (work schedule)</li>
              </ul>
            </div>

            {/* Weekly Examples */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="font-semibold text-gray-900 mb-3">📊 Weekly Patterns</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Every Monday (team meeting)</li>
                <li>• Mon, Wed, Fri (gym schedule)</li>
                <li>• Every 2 weeks on Tuesday (sprint planning)</li>
              </ul>
            </div>

            {/* Monthly Examples */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="font-semibold text-gray-900 mb-3">🗓️ Monthly Patterns</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 1st of every month (rent payment)</li>
                <li>• Last Friday (team retrospective)</li>
                <li>• 2nd Tuesday (board meeting)</li>
              </ul>
            </div>

            {/* Yearly Examples */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="font-semibold text-gray-900 mb-3">🎉 Yearly Patterns</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• January 1st (New Year&apos;s Day)</li>
                <li>• December 25th (Christmas)</li>
                <li>• Every 2 years (performance review)</li>
              </ul>
            </div>

            {/* Integration Examples */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="font-semibold text-gray-900 mb-3">🔗 Integrations</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Google Calendar sync</li>
                <li>• Task management apps</li>
                <li>• Notification systems</li>
              </ul>
            </div>

            {/* Advanced Examples */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="font-semibold text-gray-900 mb-3">⚡ Advanced</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Complex business rules</li>
                <li>• Holiday exclusions</li>
                <li>• Time zone handling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with Next.js, TypeScript, Tailwind CSS, Zustand, and ❤️</p>
        </div>
      </div>
    </div>
  );
}

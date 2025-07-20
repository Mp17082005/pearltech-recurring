/**
 * Simple example showing how to use the RecurringDatePicker component
 * This is a minimal implementation for quick integration
 */

'use client';

import { useState } from 'react';
import { RecurringDatePicker } from '@/components/RecurringDatePicker';

export default function SimpleExample() {
  const [dates, setDates] = useState<Date[]>([]);

  const handleDateSelection = (generatedDates: Date[]) => {
    setDates(generatedDates);
    console.log('Recurring dates generated:', generatedDates);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Simple Recurring Date Picker Example</h1>
      
      {/* The main component */}
      <RecurringDatePicker onDateSelect={handleDateSelection} />
      
      {/* Display results */}
      {dates.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">
            Generated {dates.length} recurring dates:
          </h2>
          <ul className="space-y-1">
            {dates.slice(0, 10).map((date, index) => (
              <li key={index} className="text-gray-700">
                {date.toLocaleDateString()}
              </li>
            ))}
            {dates.length > 10 && (
              <li className="text-gray-500 italic">
                ... and {dates.length - 10} more
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

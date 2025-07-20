import React, { useState } from 'react';
import { format, isValid } from 'date-fns';
import { Calendar, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useDatePickerStore } from '@/store/date-picker-store';

export const DateRangeSelector: React.FC = () => {
  const { recurrenceRule, setStartDate, setEndDate } = useDatePickerStore();
  const [startInput, setStartInput] = useState(format(recurrenceRule.startDate, 'yyyy-MM-dd'));
  const [endInput, setEndInput] = useState(
    recurrenceRule.endDate ? format(recurrenceRule.endDate, 'yyyy-MM-dd') : ''
  );

  const handleStartDateChange = (value: string) => {
    setStartInput(value);
    const date = new Date(value);
    if (isValid(date)) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (value: string) => {
    setEndInput(value);
    if (value === '') {
      setEndDate(undefined);
    } else {
      const date = new Date(value);
      if (isValid(date)) {
        setEndDate(date);
      }
    }
  };

  const clearEndDate = () => {
    setEndInput('');
    setEndDate(undefined);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Date Range</h3>
      
      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Start Date *
        </label>
        <div className="relative">
          <input
            type="date"
            value={startInput}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className={clsx(
              'w-full px-3 py-2 pr-10 border rounded-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'text-sm'
            )}
            required
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        {!isValid(new Date(startInput)) && startInput && (
          <p className="text-red-500 text-xs mt-1">Please enter a valid date</p>
        )}
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          End Date (Optional)
        </label>
        <div className="relative">
          <input
            type="date"
            value={endInput}
            onChange={(e) => handleEndDateChange(e.target.value)}
            min={startInput}
            className={clsx(
              'w-full px-3 py-2 pr-10 border rounded-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'text-sm'
            )}
            placeholder="No end date"
          />
          {endInput ? (
            <button
              onClick={clearEndDate}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
              aria-label="Clear end date"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          ) : (
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          )}
        </div>
        {endInput && !isValid(new Date(endInput)) && (
          <p className="text-red-500 text-xs mt-1">Please enter a valid date</p>
        )}
        {endInput && isValid(new Date(endInput)) && new Date(endInput) < new Date(startInput) && (
          <p className="text-red-500 text-xs mt-1">End date must be after start date</p>
        )}
      </div>

      {/* Date Summary */}
      <div className="bg-gray-50 p-3 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Range</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium">Start:</span> {format(recurrenceRule.startDate, 'MMM dd, yyyy')}
          </p>
          {recurrenceRule.endDate ? (
            <p>
              <span className="font-medium">End:</span> {format(recurrenceRule.endDate, 'MMM dd, yyyy')}
            </p>
          ) : (
            <p>
              <span className="font-medium">End:</span> No end date (continues indefinitely)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

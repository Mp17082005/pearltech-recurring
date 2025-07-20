import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useDatePickerStore } from '@/store/date-picker-store';
import { formatRecurrenceRule } from '@/utils/date-utils';
import { clsx } from 'clsx';

export const PreviewPanel: React.FC = () => {
  const { recurrenceRule, previewDates } = useDatePickerStore();

  const hasEndDate = recurrenceRule.endDate !== undefined;
  const ruleDescription = formatRecurrenceRule(recurrenceRule);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-3">
        <Clock className="w-4 h-4 text-gray-500 mr-2" />
        <h3 className="text-sm font-medium text-gray-700">Recurrence Preview</h3>
      </div>

      {/* Rule Summary */}
      <div className="bg-white p-3 rounded-md mb-4 border">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Pattern</h4>
        <p className="text-sm text-gray-600">{ruleDescription}</p>
        
        <div className="mt-2 pt-2 border-t text-xs text-gray-500">
          <p>
            <span className="font-medium">Start:</span> {format(recurrenceRule.startDate, 'MMM dd, yyyy')}
          </p>
          {hasEndDate && (
            <p>
              <span className="font-medium">End:</span> {format(recurrenceRule.endDate!, 'MMM dd, yyyy')}
            </p>
          )}
        </div>
      </div>

      {/* Upcoming Dates */}
      <div className="bg-white p-3 rounded-md border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700">Upcoming Dates</h4>
          <span className="text-xs text-gray-500">
            Showing first {Math.min(previewDates.length, 10)} occurrences
          </span>
        </div>

        {previewDates.length > 0 ? (
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {previewDates.slice(0, 10).map((date, index) => (
              <div
                key={date.toISOString()}
                className={clsx(
                  'flex items-center justify-between py-1 px-2 rounded text-sm',
                  {
                    'bg-blue-50 text-blue-700': index === 0,
                    'hover:bg-gray-50': index !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                  <span>{format(date, 'EEE, MMM dd, yyyy')}</span>
                </div>
                {index === 0 && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                    Next
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 py-4 text-center">
            No matching dates found with current settings
          </div>
        )}

        {previewDates.length > 10 && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-xs text-gray-500 text-center">
              +{previewDates.length - 10} more dates...
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white p-2 rounded border text-center">
          <div className="text-lg font-semibold text-gray-900">
            {previewDates.length}
          </div>
          <div className="text-xs text-gray-500">Total Dates</div>
        </div>
        <div className="bg-white p-2 rounded border text-center">
          <div className="text-lg font-semibold text-gray-900">
            {recurrenceRule.interval}
          </div>
          <div className="text-xs text-gray-500">Interval</div>
        </div>
      </div>
    </div>
  );
};

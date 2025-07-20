import React, { useEffect } from 'react';
import { Settings, RotateCcw } from 'lucide-react';
import { useDatePickerStore } from '@/store/date-picker-store';
import { MiniCalendar } from './MiniCalendar';
import { RecurrenceOptions } from './RecurrenceOptions';
import { DateRangeSelector } from './DateRangeSelector';
import { PreviewPanel } from './PreviewPanel';
import { clsx } from 'clsx';

interface RecurringDatePickerProps {
  className?: string;
  onDateSelect?: (dates: Date[]) => void;
}

export const RecurringDatePicker: React.FC<RecurringDatePickerProps> = ({
  className,
  onDateSelect,
}) => {
  const {
    selectedDate,
    previewDates,
    recurrenceRule,
    setSelectedDate,
    generatePreviewDates,
    reset,
  } = useDatePickerStore();

  // Generate preview dates when component mounts or rule changes
  useEffect(() => {
    generatePreviewDates();
  }, [generatePreviewDates, recurrenceRule]);

  // Call onDateSelect when preview dates change
  useEffect(() => {
    if (onDateSelect) {
      onDateSelect(previewDates);
    }
  }, [previewDates, onDateSelect]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className={clsx('bg-white rounded-lg shadow-lg border', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center">
          <Settings className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Recurring Date Picker</h2>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-md transition-colors"
          title="Reset to defaults"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Left Panel - Configuration */}
        <div className="space-y-6">
          {/* Recurrence Options */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Recurrence Settings
            </h3>
            <RecurrenceOptions />
          </div>

          {/* Date Range */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <DateRangeSelector />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Calendar Preview</h3>
            <MiniCalendar
              selectedDate={selectedDate}
              highlightedDates={previewDates.slice(0, 31)} // Show up to 31 dates on calendar
              onDateSelect={handleDateSelect}
              onMonthChange={handleMonthChange}
              className="w-full"
            />
          </div>

          {/* Preview Panel */}
          <PreviewPanel />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            {previewDates.length > 0 ? (
              <>Next occurrence: {previewDates[0]?.toLocaleDateString()}</>
            ) : (
              'No upcoming dates with current settings'
            )}
          </div>
          <div>
            {previewDates.length} date{previewDates.length !== 1 ? 's' : ''} generated
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;

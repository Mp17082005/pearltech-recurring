import React from 'react';

interface SimpleRecurringDatePickerProps {
  className?: string;
  onDateSelect?: (dates: Date[]) => void;
}

export const SimpleRecurringDatePicker: React.FC<SimpleRecurringDatePickerProps> = ({
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg border p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🗓️ Recurring Date Picker
      </h2>
      <div className="text-center text-gray-600 py-8">
        <p className="mb-4">Component is loading...</p>
        <p className="text-sm">This is a simplified version for testing.</p>
      </div>
    </div>
  );
};

export default SimpleRecurringDatePicker;

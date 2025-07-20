import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface MiniCalendarProps {
  selectedDate: Date;
  highlightedDates: Date[];
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  className?: string;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  selectedDate,
  highlightedDates,
  onDateSelect,
  onMonthChange,
  className,
}) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'MMMM yyyy';
  const dateFormatHeader = 'EEE';

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  // Create calendar header
  const header = (
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <button
        onClick={() => onMonthChange(addDays(monthStart, -1))}
        className="p-1 hover:bg-gray-100 rounded"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <h3 className="text-sm font-medium">
        {format(monthStart, dateFormat)}
      </h3>
      <button
        onClick={() => onMonthChange(addDays(monthEnd, 1))}
        className="p-1 hover:bg-gray-100 rounded"
        aria-label="Next month"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  // Create day headers
  const dayHeaders = [];
  const startWeek = startOfWeek(new Date());
  for (let i = 0; i < 7; i++) {
    dayHeaders.push(
      <div key={i} className="text-center text-xs font-medium text-gray-500 py-2">
        {format(addDays(startWeek, i), dateFormatHeader)}
      </div>
    );
  }

  // Create calendar days
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      const isHighlighted = highlightedDates.some(date => isSameDay(date, day));
      const isSelected = isSameDay(day, selectedDate);
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isTodayDate = isToday(day);

      days.push(
        <button
          key={day.toString()}
          className={clsx(
            'w-8 h-8 text-sm rounded-full hover:bg-gray-100 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            {
              'text-gray-400': !isCurrentMonth,
              'text-gray-900': isCurrentMonth,
              'bg-blue-500 text-white hover:bg-blue-600': isSelected,
              'bg-green-100 text-green-800': isHighlighted && !isSelected,
              'ring-2 ring-blue-300': isTodayDate && !isSelected,
            }
          )}
          onClick={() => onDateSelect(cloneDay)}
          disabled={!isCurrentMonth}
        >
          <span className="w-full h-full flex items-center justify-center">
            {formattedDate}
          </span>
        </button>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1 px-2">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className={clsx('bg-white border rounded-lg shadow-sm', className)}>
      {header}
      <div className="p-2">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayHeaders}
        </div>
        <div className="space-y-1">
          {rows}
        </div>
      </div>
    </div>
  );
};

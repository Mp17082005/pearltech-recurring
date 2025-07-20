import React from 'react';
import { clsx } from 'clsx';
import { RecurrenceType, DayOfWeek, WeekOfMonth } from '@/types/date-picker';
import { useDatePickerStore } from '@/store/date-picker-store';

const RECURRENCE_OPTIONS: { value: RecurrenceType; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

const DAYS_OF_WEEK: { value: DayOfWeek; label: string; short: string }[] = [
  { value: 0, label: 'Sunday', short: 'Sun' },
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' },
];

const WEEK_OPTIONS: { value: WeekOfMonth; label: string }[] = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  { value: -1, label: 'Last' },
];

export const RecurrenceOptions: React.FC = () => {
  const {
    recurrenceRule,
    setRecurrenceType,
    setInterval,
    setDaysOfWeek,
    setMonthlyPattern,
  } = useDatePickerStore();

  const handleIntervalChange = (value: string) => {
    const interval = parseInt(value, 10);
    if (!isNaN(interval) && interval > 0) {
      setInterval(interval);
    }
  };

  const handleDayToggle = (day: DayOfWeek) => {
    const currentDays = recurrenceRule.daysOfWeek || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day].sort();
    setDaysOfWeek(newDays);
  };

  const handleMonthlyPatternChange = (type: 'date' | 'weekday') => {
    if (type === 'date') {
      setMonthlyPattern({ type: 'date', date: recurrenceRule.startDate.getDate() });
    } else {
      const weekday = recurrenceRule.startDate.getDay() as DayOfWeek;
      const weekOfMonth = Math.ceil(recurrenceRule.startDate.getDate() / 7) as WeekOfMonth;
      setMonthlyPattern({ type: 'weekday', weekday, weekOfMonth });
    }
  };

  const handleWeekdayPatternChange = (weekday?: DayOfWeek, weekOfMonth?: WeekOfMonth) => {
    if (recurrenceRule.monthlyPattern?.type === 'weekday') {
      setMonthlyPattern({
        type: 'weekday',
        weekday: weekday ?? recurrenceRule.monthlyPattern.weekday ?? 1,
        weekOfMonth: weekOfMonth ?? recurrenceRule.monthlyPattern.weekOfMonth ?? 1,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Recurrence Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recurrence Pattern
        </label>
        <div className="grid grid-cols-2 gap-2">
          {RECURRENCE_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => setRecurrenceType(option.value)}
              className={clsx(
                'px-3 py-2 text-sm rounded-md border transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                {
                  'bg-blue-500 text-white border-blue-500': recurrenceRule.type === option.value,
                  'bg-white text-gray-700 border-gray-300 hover:bg-gray-50': recurrenceRule.type !== option.value,
                }
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interval Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Repeat every
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max="999"
            value={recurrenceRule.interval}
            onChange={(e) => handleIntervalChange(e.target.value)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-sm text-gray-600">
            {recurrenceRule.type === 'daily' && (recurrenceRule.interval === 1 ? 'day' : 'days')}
            {recurrenceRule.type === 'weekly' && (recurrenceRule.interval === 1 ? 'week' : 'weeks')}
            {recurrenceRule.type === 'monthly' && (recurrenceRule.interval === 1 ? 'month' : 'months')}
            {recurrenceRule.type === 'yearly' && (recurrenceRule.interval === 1 ? 'year' : 'years')}
          </span>
        </div>
      </div>

      {/* Weekly Options */}
      {recurrenceRule.type === 'weekly' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repeat on
          </label>
          <div className="flex flex-wrap gap-2">
            {DAYS_OF_WEEK.map(day => (
              <button
                key={day.value}
                onClick={() => handleDayToggle(day.value)}
                className={clsx(
                  'px-3 py-2 text-sm rounded-md border transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  {
                    'bg-blue-500 text-white border-blue-500': recurrenceRule.daysOfWeek?.includes(day.value),
                    'bg-white text-gray-700 border-gray-300 hover:bg-gray-50': !recurrenceRule.daysOfWeek?.includes(day.value),
                  }
                )}
              >
                {day.short}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Options */}
      {recurrenceRule.type === 'monthly' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Pattern
          </label>
          <div className="space-y-3">
            {/* Date Pattern */}
            <label className="flex items-center">
              <input
                type="radio"
                name="monthlyPattern"
                checked={recurrenceRule.monthlyPattern?.type === 'date' || !recurrenceRule.monthlyPattern}
                onChange={() => handleMonthlyPatternChange('date')}
                className="mr-2"
              />
              <span className="text-sm">
                On day {recurrenceRule.startDate.getDate()} of the month
              </span>
            </label>

            {/* Weekday Pattern */}
            <label className="flex items-start">
              <input
                type="radio"
                name="monthlyPattern"
                checked={recurrenceRule.monthlyPattern?.type === 'weekday'}
                onChange={() => handleMonthlyPatternChange('weekday')}
                className="mr-2 mt-0.5"
              />
              <div className="flex-1">
                <span className="text-sm block mb-2">On the</span>
                {recurrenceRule.monthlyPattern?.type === 'weekday' && (
                  <div className="flex items-center space-x-2">
                    <select
                      value={recurrenceRule.monthlyPattern.weekOfMonth}
                      onChange={(e) => handleWeekdayPatternChange(undefined, parseInt(e.target.value) as WeekOfMonth)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {WEEK_OPTIONS.map(week => (
                        <option key={week.value} value={week.value}>
                          {week.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={recurrenceRule.monthlyPattern.weekday}
                      onChange={(e) => handleWeekdayPatternChange(parseInt(e.target.value) as DayOfWeek)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {DAYS_OF_WEEK.map(day => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

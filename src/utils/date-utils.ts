import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  startOfDay,
  isSameDay,
  getDay,
  format,
  isValid,
  isBefore,
  isAfter,
} from 'date-fns';

import {
  RecurrenceRule,
  GeneratedDates,
  DayOfWeek,
  MonthlyPatternType,
  WeekOfMonth,
} from '@/types/date-picker';

/**
 * Generates recurring dates based on the recurrence rule
 * @param rule - The recurrence rule configuration
 * @param maxDates - Maximum number of dates to generate (default: 100)
 * @returns Object containing generated dates and whether there are more dates
 */
export function generateRecurringDates(
  rule: RecurrenceRule,
  maxDates: number = 100
): GeneratedDates {
  const dates: Date[] = [];
  let currentDate = startOfDay(rule.startDate);
  const endDate = rule.endDate ? startOfDay(rule.endDate) : null;
  let iterations = 0;
  const maxIterations = maxDates * 10; // Prevent infinite loops

  while (dates.length < maxDates && iterations < maxIterations) {
    iterations++;

    // Check if we've exceeded the end date
    if (endDate && isAfter(currentDate, endDate)) {
      break;
    }

    // Check if current date matches the recurrence pattern
    if (matchesRecurrencePattern(currentDate, rule)) {
      dates.push(new Date(currentDate));
    }

    // Move to next date based on recurrence type
    currentDate = getNextDate(currentDate, rule);
  }

  return {
    dates,
    hasMore: iterations >= maxIterations || dates.length >= maxDates,
  };
}

/**
 * Checks if a given date matches the recurrence pattern
 */
function matchesRecurrencePattern(date: Date, rule: RecurrenceRule): boolean {
  const daysSinceStart = Math.floor(
    (date.getTime() - rule.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  switch (rule.type) {
    case 'daily':
      return daysSinceStart % rule.interval === 0;

    case 'weekly':
      const weeksSinceStart = Math.floor(daysSinceStart / 7);
      const isCorrectInterval = weeksSinceStart % rule.interval === 0;
      const dayOfWeek = getDay(date) as DayOfWeek;
      const isCorrectDay = rule.daysOfWeek?.includes(dayOfWeek) ?? true;
      return isCorrectInterval && isCorrectDay;

    case 'monthly':
      return matchesMonthlyPattern(date, rule);

    case 'yearly':
      const yearsSinceStart = date.getFullYear() - rule.startDate.getFullYear();
      return (
        yearsSinceStart % rule.interval === 0 &&
        date.getMonth() === rule.startDate.getMonth() &&
        date.getDate() === rule.startDate.getDate()
      );

    default:
      return false;
  }
}

/**
 * Checks if a date matches the monthly recurrence pattern
 */
function matchesMonthlyPattern(date: Date, rule: RecurrenceRule): boolean {
  const monthsSinceStart =
    (date.getFullYear() - rule.startDate.getFullYear()) * 12 +
    (date.getMonth() - rule.startDate.getMonth());

  if (monthsSinceStart % rule.interval !== 0) {
    return false;
  }

  if (!rule.monthlyPattern) {
    // Default: same date of month
    return date.getDate() === rule.startDate.getDate();
  }

  if (rule.monthlyPattern.type === 'date') {
    return date.getDate() === (rule.monthlyPattern.date ?? rule.startDate.getDate());
  }

  if (rule.monthlyPattern.type === 'weekday') {
    const targetWeekday = rule.monthlyPattern.weekday ?? (getDay(rule.startDate) as DayOfWeek);
    const targetWeekOfMonth = rule.monthlyPattern.weekOfMonth ?? getWeekOfMonth(rule.startDate);
    
    return (
      getDay(date) === targetWeekday &&
      getWeekOfMonth(date) === targetWeekOfMonth
    );
  }

  return false;
}

/**
 * Gets the week of the month for a given date (1-4, or -1 for last week)
 */
function getWeekOfMonth(date: Date): WeekOfMonth {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  const weekOfMonth = Math.ceil(date.getDate() / 7);
  
  // Check if this is the last occurrence of this weekday in the month
  const nextWeekSameDay = addDays(date, 7);
  if (nextWeekSameDay.getMonth() !== date.getMonth()) {
    return -1; // Last occurrence
  }
  
  return Math.min(weekOfMonth, 4) as WeekOfMonth;
}

/**
 * Gets the next date to check based on recurrence type
 */
function getNextDate(currentDate: Date, rule: RecurrenceRule): Date {
  switch (rule.type) {
    case 'daily':
      return addDays(currentDate, 1);
    case 'weekly':
      return addDays(currentDate, 1);
    case 'monthly':
      return addDays(currentDate, 1);
    case 'yearly':
      return addDays(currentDate, 1);
    default:
      return addDays(currentDate, 1);
  }
}

/**
 * Formats a recurrence rule into human-readable text
 */
export function formatRecurrenceRule(rule: RecurrenceRule): string {
  const { type, interval, daysOfWeek, monthlyPattern } = rule;
  
  const intervalText = interval === 1 ? '' : `${interval} `;
  
  switch (type) {
    case 'daily':
      return interval === 1 ? 'Daily' : `Every ${interval} days`;
      
    case 'weekly':
      const baseText = interval === 1 ? 'Weekly' : `Every ${interval} weeks`;
      if (daysOfWeek && daysOfWeek.length > 0) {
        const dayNames = daysOfWeek.map(day => getDayName(day)).join(', ');
        return `${baseText} on ${dayNames}`;
      }
      return baseText;
      
    case 'monthly':
      const monthlyBase = interval === 1 ? 'Monthly' : `Every ${interval} months`;
      if (monthlyPattern?.type === 'weekday') {
        const dayName = getDayName(monthlyPattern.weekday!);
        const weekText = getWeekText(monthlyPattern.weekOfMonth!);
        return `${monthlyBase} on the ${weekText} ${dayName}`;
      }
      return monthlyBase;
      
    case 'yearly':
      return interval === 1 ? 'Yearly' : `Every ${interval} years`;
      
    default:
      return 'Custom';
  }
}

/**
 * Gets the display name for a day of the week
 */
function getDayName(day: DayOfWeek): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day];
}

/**
 * Gets the display text for week of month
 */
function getWeekText(week: WeekOfMonth): string {
  switch (week) {
    case 1: return 'first';
    case 2: return 'second';
    case 3: return 'third';
    case 4: return 'fourth';
    case -1: return 'last';
    default: return 'first';
  }
}

/**
 * Validates if a date is within the valid range
 */
export function isDateInRange(date: Date, startDate: Date, endDate?: Date): boolean {
  if (!isValid(date)) return false;
  if (isBefore(date, startOfDay(startDate))) return false;
  if (endDate && isAfter(date, startOfDay(endDate))) return false;
  return true;
}

/**
 * Gets the next few occurrences for preview
 */
export function getPreviewDates(rule: RecurrenceRule, count: number = 5): Date[] {
  const { dates } = generateRecurringDates(rule, count);
  return dates.slice(0, count);
}

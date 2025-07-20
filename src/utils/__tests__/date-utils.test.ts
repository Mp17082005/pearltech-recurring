import {
  generateRecurringDates,
  formatRecurrenceRule,
  isDateInRange,
  getPreviewDates,
} from '@/utils/date-utils';
import { RecurrenceRule, DayOfWeek } from '@/types/date-picker';

describe('Date Utils', () => {
  const baseDate = new Date('2024-01-01T00:00:00.000Z');

  describe('generateRecurringDates', () => {
    it('generates daily recurrence correctly', () => {
      const rule: RecurrenceRule = {
        type: 'daily',
        interval: 1,
        startDate: baseDate,
      };

      const result = generateRecurringDates(rule, 5);

      expect(result.dates).toHaveLength(5);
      expect(result.dates[0]).toEqual(baseDate);
      expect(result.dates[1]).toEqual(new Date('2024-01-02T00:00:00.000Z'));
      expect(result.dates[4]).toEqual(new Date('2024-01-05T00:00:00.000Z'));
    });

    it('generates daily recurrence with custom interval', () => {
      const rule: RecurrenceRule = {
        type: 'daily',
        interval: 3,
        startDate: baseDate,
      };

      const result = generateRecurringDates(rule, 3);

      expect(result.dates).toHaveLength(3);
      expect(result.dates[0]).toEqual(baseDate);
      expect(result.dates[1]).toEqual(new Date('2024-01-04T00:00:00.000Z'));
      expect(result.dates[2]).toEqual(new Date('2024-01-07T00:00:00.000Z'));
    });

    it('generates weekly recurrence with specific days', () => {
      const rule: RecurrenceRule = {
        type: 'weekly',
        interval: 1,
        startDate: baseDate, // Monday
        daysOfWeek: [1, 3, 5] as DayOfWeek[], // Mon, Wed, Fri
      };

      const result = generateRecurringDates(rule, 6);

      expect(result.dates).toHaveLength(6);
      // Should be Mon, Wed, Fri of first week, then Mon, Wed, Fri of second week
      expect(result.dates[0]).toEqual(baseDate); // Monday
      expect(result.dates[1]).toEqual(new Date('2024-01-03T00:00:00.000Z')); // Wednesday
      expect(result.dates[2]).toEqual(new Date('2024-01-05T00:00:00.000Z')); // Friday
    });

    it('generates monthly recurrence by date', () => {
      const rule: RecurrenceRule = {
        type: 'monthly',
        interval: 1,
        startDate: new Date('2024-01-15T00:00:00.000Z'),
        monthlyPattern: { type: 'date', date: 15 },
      };

      const result = generateRecurringDates(rule, 3);

      expect(result.dates).toHaveLength(3);
      expect(result.dates[0]).toEqual(new Date('2024-01-15T00:00:00.000Z'));
      expect(result.dates[1]).toEqual(new Date('2024-02-15T00:00:00.000Z'));
      expect(result.dates[2]).toEqual(new Date('2024-03-15T00:00:00.000Z'));
    });

    it('generates yearly recurrence', () => {
      const rule: RecurrenceRule = {
        type: 'yearly',
        interval: 1,
        startDate: baseDate,
      };

      const result = generateRecurringDates(rule, 3);

      expect(result.dates).toHaveLength(3);
      expect(result.dates[0]).toEqual(baseDate);
      expect(result.dates[1]).toEqual(new Date('2025-01-01T00:00:00.000Z'));
      expect(result.dates[2]).toEqual(new Date('2026-01-01T00:00:00.000Z'));
    });

    it('respects end date', () => {
      const rule: RecurrenceRule = {
        type: 'daily',
        interval: 1,
        startDate: baseDate,
        endDate: new Date('2024-01-03T00:00:00.000Z'),
      };

      const result = generateRecurringDates(rule, 10);

      expect(result.dates).toHaveLength(3);
      expect(result.dates[result.dates.length - 1]).toEqual(
        new Date('2024-01-03T00:00:00.000Z')
      );
    });

    it('handles empty results when no matching pattern', () => {
      const rule: RecurrenceRule = {
        type: 'weekly',
        interval: 1,
        startDate: baseDate, // Monday
        daysOfWeek: [], // No days selected
      };

      const result = generateRecurringDates(rule, 5);

      expect(result.dates).toHaveLength(0);
    });
  });

  describe('formatRecurrenceRule', () => {
    it('formats daily rules correctly', () => {
      const rule: RecurrenceRule = {
        type: 'daily',
        interval: 1,
        startDate: baseDate,
      };

      expect(formatRecurrenceRule(rule)).toBe('Daily');

      rule.interval = 3;
      expect(formatRecurrenceRule(rule)).toBe('Every 3 days');
    });

    it('formats weekly rules correctly', () => {
      const rule: RecurrenceRule = {
        type: 'weekly',
        interval: 1,
        startDate: baseDate,
        daysOfWeek: [1, 3, 5] as DayOfWeek[],
      };

      expect(formatRecurrenceRule(rule)).toBe('Weekly on Monday, Wednesday, Friday');

      rule.interval = 2;
      expect(formatRecurrenceRule(rule)).toBe('Every 2 weeks on Monday, Wednesday, Friday');
    });

    it('formats monthly rules correctly', () => {
      const rule: RecurrenceRule = {
        type: 'monthly',
        interval: 1,
        startDate: baseDate,
      };

      expect(formatRecurrenceRule(rule)).toBe('Monthly');

      rule.monthlyPattern = {
        type: 'weekday',
        weekday: 1 as DayOfWeek,
        weekOfMonth: 1,
      };
      expect(formatRecurrenceRule(rule)).toBe('Monthly on the first Monday');
    });

    it('formats yearly rules correctly', () => {
      const rule: RecurrenceRule = {
        type: 'yearly',
        interval: 1,
        startDate: baseDate,
      };

      expect(formatRecurrenceRule(rule)).toBe('Yearly');

      rule.interval = 2;
      expect(formatRecurrenceRule(rule)).toBe('Every 2 years');
    });
  });

  describe('isDateInRange', () => {
    const startDate = new Date('2024-01-01T00:00:00.000Z');
    const endDate = new Date('2024-01-31T00:00:00.000Z');

    it('returns true for dates within range', () => {
      const testDate = new Date('2024-01-15T00:00:00.000Z');
      expect(isDateInRange(testDate, startDate, endDate)).toBe(true);
    });

    it('returns false for dates before start', () => {
      const testDate = new Date('2023-12-31T00:00:00.000Z');
      expect(isDateInRange(testDate, startDate, endDate)).toBe(false);
    });

    it('returns false for dates after end', () => {
      const testDate = new Date('2024-02-01T00:00:00.000Z');
      expect(isDateInRange(testDate, startDate, endDate)).toBe(false);
    });

    it('handles undefined end date', () => {
      const testDate = new Date('2024-12-31T00:00:00.000Z');
      expect(isDateInRange(testDate, startDate)).toBe(true);
    });

    it('returns false for invalid dates', () => {
      const invalidDate = new Date('invalid');
      expect(isDateInRange(invalidDate, startDate, endDate)).toBe(false);
    });
  });

  describe('getPreviewDates', () => {
    it('returns correct number of preview dates', () => {
      const rule: RecurrenceRule = {
        type: 'daily',
        interval: 1,
        startDate: baseDate,
      };

      const dates = getPreviewDates(rule, 3);
      expect(dates).toHaveLength(3);
      expect(dates[0]).toEqual(baseDate);
    });

    it('handles empty results', () => {
      const rule: RecurrenceRule = {
        type: 'weekly',
        interval: 1,
        startDate: baseDate,
        daysOfWeek: [],
      };

      const dates = getPreviewDates(rule, 5);
      expect(dates).toHaveLength(0);
    });
  });
});

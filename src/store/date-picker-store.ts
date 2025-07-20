import { create } from 'zustand';
import { startOfDay } from 'date-fns';

import {
  DatePickerStore,
  RecurrenceType,
  DayOfWeek,
  MonthlyPatternType,
} from '@/types/date-picker';
import { getPreviewDates } from '@/utils/date-utils';

const initialState = {
  recurrenceRule: {
    type: 'daily' as RecurrenceType,
    interval: 1,
    startDate: startOfDay(new Date()),
    endDate: undefined,
  },
  selectedDate: startOfDay(new Date()),
  isOpen: false,
  previewDates: [],
  maxPreviewDates: 10,
};

export const useDatePickerStore = create<DatePickerStore>((set) => ({
  ...initialState,

  setRecurrenceType: (type: RecurrenceType) => {
    set((state) => {
      const newRule = {
        ...state.recurrenceRule,
        type,
        // Reset type-specific properties when changing type
        daysOfWeek: type === 'weekly' ? [getDay(state.recurrenceRule.startDate)] : undefined,
        monthlyPattern: type === 'monthly' ? { type: 'date' as const } : undefined,
      };
      return {
        recurrenceRule: newRule,
        previewDates: getPreviewDates(newRule, state.maxPreviewDates),
      };
    });
  },

  setInterval: (interval: number) => {
    set((state) => {
      const newRule = {
        ...state.recurrenceRule,
        interval: Math.max(1, interval),
      };
      return {
        recurrenceRule: newRule,
        previewDates: getPreviewDates(newRule, state.maxPreviewDates),
      };
    });
  },

  setDaysOfWeek: (daysOfWeek: DayOfWeek[]) => {
    set((state) => {
      const newRule = {
        ...state.recurrenceRule,
        daysOfWeek: [...daysOfWeek].sort(),
      };
      return {
        recurrenceRule: newRule,
        previewDates: getPreviewDates(newRule, state.maxPreviewDates),
      };
    });
  },

  setMonthlyPattern: (monthlyPattern: MonthlyPatternType) => {
    set((state) => {
      const newRule = {
        ...state.recurrenceRule,
        monthlyPattern,
      };
      return {
        recurrenceRule: newRule,
        previewDates: getPreviewDates(newRule, state.maxPreviewDates),
      };
    });
  },

  setStartDate: (startDate: Date) => {
    set((state) => {
      const newRule = {
        ...state.recurrenceRule,
        startDate: startOfDay(startDate),
      };
      return {
        recurrenceRule: newRule,
        selectedDate: startOfDay(startDate),
        previewDates: getPreviewDates(newRule, state.maxPreviewDates),
      };
    });
  },

  setEndDate: (endDate: Date | undefined) => {
    set((state) => {
      const newRule = {
        ...state.recurrenceRule,
        endDate: endDate ? startOfDay(endDate) : undefined,
      };
      return {
        recurrenceRule: newRule,
        previewDates: getPreviewDates(newRule, state.maxPreviewDates),
      };
    });
  },

  setSelectedDate: (selectedDate: Date) => {
    set(() => ({
      selectedDate: startOfDay(selectedDate),
    }));
  },

  setIsOpen: (isOpen: boolean) => {
    set(() => ({
      isOpen,
    }));
  },

  generatePreviewDates: () => {
    set((state) => ({
      previewDates: getPreviewDates(state.recurrenceRule, state.maxPreviewDates),
    }));
  },

  reset: () => {
    set(() => ({
      ...initialState,
      previewDates: getPreviewDates(initialState.recurrenceRule, initialState.maxPreviewDates),
    }));
  },
}));

// Helper function to get day of week from date
function getDay(date: Date): DayOfWeek {
  return date.getDay() as DayOfWeek;
}

export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 6 = Saturday

export type WeekOfMonth = 1 | 2 | 3 | 4 | -1; // -1 = last week

export interface MonthlyPatternType {
  type: 'date' | 'weekday';
  date?: number; // 1-31
  weekday?: DayOfWeek;
  weekOfMonth?: WeekOfMonth;
}

export interface RecurrenceRule {
  type: RecurrenceType;
  interval: number; // every X days/weeks/months/years
  daysOfWeek?: DayOfWeek[]; // for weekly recurrence
  monthlyPattern?: MonthlyPatternType; // for monthly recurrence
  startDate: Date;
  endDate?: Date;
}

export interface GeneratedDates {
  dates: Date[];
  hasMore: boolean;
}

export interface DatePickerState {
  recurrenceRule: RecurrenceRule;
  selectedDate: Date;
  isOpen: boolean;
  previewDates: Date[];
  maxPreviewDates: number;
}

export interface DatePickerActions {
  setRecurrenceType: (type: RecurrenceType) => void;
  setInterval: (interval: number) => void;
  setDaysOfWeek: (days: DayOfWeek[]) => void;
  setMonthlyPattern: (pattern: MonthlyPatternType) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | undefined) => void;
  setSelectedDate: (date: Date) => void;
  setIsOpen: (open: boolean) => void;
  generatePreviewDates: () => void;
  reset: () => void;
}

export type DatePickerStore = DatePickerState & DatePickerActions;

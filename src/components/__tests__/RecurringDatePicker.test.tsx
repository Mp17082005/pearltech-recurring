import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecurringDatePicker } from '@/components/RecurringDatePicker';

// Mock date-fns to ensure consistent test results
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  startOfDay: (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  },
}));

describe('RecurringDatePicker', () => {
  const mockOnDateSelect = jest.fn();

  beforeEach(() => {
    mockOnDateSelect.mockClear();
  });

  it('renders without crashing', () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText('Recurring Date Picker')).toBeInTheDocument();
  });

  it('displays all recurrence pattern options', () => {
    render(<RecurringDatePicker />);
    
    expect(screen.getByText('Daily')).toBeInTheDocument();
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
  });

  it('changes recurrence pattern when clicked', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);
    
    const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
    await user.click(weeklyButton);
    
    // Should show day selection for weekly pattern
    expect(screen.getByText('Repeat on')).toBeInTheDocument();
  });

  it('allows changing interval value', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);
    
    const intervalInput = screen.getByDisplayValue('1');
    await user.clear(intervalInput);
    await user.type(intervalInput, '3');
    
    expect(intervalInput).toHaveValue(3);
  });

  it('shows weekly day selection when weekly pattern is selected', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);
    
    const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
    await user.click(weeklyButton);
    
    // Should show day buttons
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });

  it('shows monthly pattern options when monthly is selected', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);
    
    const monthlyButton = screen.getByRole('button', { name: 'Monthly' });
    await user.click(monthlyButton);
    
    // Should show monthly pattern options
    expect(screen.getByText('Monthly Pattern')).toBeInTheDocument();
    expect(screen.getByText(/On day \d+ of the month/)).toBeInTheDocument();
    expect(screen.getByText('On the')).toBeInTheDocument();
  });

  it('displays preview panel with upcoming dates', () => {
    render(<RecurringDatePicker />);
    
    expect(screen.getByText('Recurrence Preview')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Dates')).toBeInTheDocument();
    expect(screen.getByText('Pattern')).toBeInTheDocument();
  });

  it('calls onDateSelect when dates are generated', async () => {
    render(<RecurringDatePicker onDateSelect={mockOnDateSelect} />);
    
    // Wait for initial preview generation
    await waitFor(() => {
      expect(mockOnDateSelect).toHaveBeenCalled();
    });
    
    const lastCall = mockOnDateSelect.mock.calls[mockOnDateSelect.mock.calls.length - 1];
    expect(Array.isArray(lastCall[0])).toBe(true);
    expect(lastCall[0].length).toBeGreaterThan(0);
  });

  it('resets to default state when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);
    
    // Change to weekly pattern
    const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
    await user.click(weeklyButton);
    
    // Change interval
    const intervalInput = screen.getByDisplayValue('1');
    await user.clear(intervalInput);
    await user.type(intervalInput, '2');
    
    // Reset
    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);
    
    // Should be back to daily pattern
    const dailyButton = screen.getByRole('button', { name: 'Daily' });
    expect(dailyButton).toHaveClass('bg-blue-500'); // Selected state
    
    // Interval should be back to 1
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('updates start date when date input changes', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);
    
    const startDateInput = screen.getByLabelText(/start date/i);
    await user.clear(startDateInput);
    await user.type(startDateInput, '2024-12-25');
    
    expect(startDateInput).toHaveValue('2024-12-25');
  });

  it('handles end date input correctly', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);
    
    const endDateInput = screen.getByLabelText(/end date/i);
    await user.type(endDateInput, '2024-12-31');
    
    expect(endDateInput).toHaveValue('2024-12-31');
  });

  it('shows calendar with highlighted dates', () => {
    render(<RecurringDatePicker />);
    
    // Calendar should be present
    expect(screen.getByRole('button', { name: /previous month/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next month/i })).toBeInTheDocument();
  });

  it('displays stats correctly', () => {
    render(<RecurringDatePicker />);
    
    // Should show total dates and interval stats
    expect(screen.getByText('Total Dates')).toBeInTheDocument();
    expect(screen.getByText('Interval')).toBeInTheDocument();
  });

  it('shows different interval text based on recurrence type', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);
    
    // Should show "day/days" for daily
    expect(screen.getByText('day')).toBeInTheDocument();
    
    // Change interval to 2
    const intervalInput = screen.getByDisplayValue('1');
    await user.clear(intervalInput);
    await user.type(intervalInput, '2');
    expect(screen.getByText('days')).toBeInTheDocument();
    
    // Switch to weekly
    const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
    await user.click(weeklyButton);
    expect(screen.getByText('weeks')).toBeInTheDocument();
  });
});

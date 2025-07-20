import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecurringDatePicker } from '@/components/RecurringDatePicker';

/**
 * Integration test for the complete recurring date picker workflow
 * Tests the interaction between all components and state management
 */
describe('RecurringDatePicker Integration', () => {
  const mockOnDateSelect = jest.fn();

  beforeEach(() => {
    mockOnDateSelect.mockClear();
  });

  it('completes a full weekly recurrence setup workflow', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker onDateSelect={mockOnDateSelect} />);

    // Step 1: Change to weekly pattern
    const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
    await user.click(weeklyButton);

    // Step 2: Set interval to 2 weeks
    const intervalInput = screen.getByDisplayValue('1');
    await user.clear(intervalInput);
    await user.type(intervalInput, '2');

    // Step 3: Select specific days (Monday and Friday)
    const mondayButton = screen.getByRole('button', { name: 'Mon' });
    const fridayButton = screen.getByRole('button', { name: 'Fri' });
    
    await user.click(mondayButton);
    await user.click(fridayButton);

    // Step 4: Set an end date
    const endDateInput = screen.getByLabelText(/end date/i);
    await user.type(endDateInput, '2024-12-31');

    // Step 5: Verify the pattern description updates
    await waitFor(() => {
      expect(screen.getByText(/Every 2 weeks on Monday, Friday/)).toBeInTheDocument();
    });

    // Step 6: Verify dates are generated and callback is called
    await waitFor(() => {
      expect(mockOnDateSelect).toHaveBeenCalled();
    });

    const lastCall = mockOnDateSelect.mock.calls[mockOnDateSelect.mock.calls.length - 1];
    const generatedDates = lastCall[0];
    
    expect(Array.isArray(generatedDates)).toBe(true);
    expect(generatedDates.length).toBeGreaterThan(0);
    
    // Verify the dates are actually Mondays and Fridays
    generatedDates.forEach((date: Date) => {
      const dayOfWeek = date.getDay();
      expect([1, 5]).toContain(dayOfWeek); // 1 = Monday, 5 = Friday
    });
  });

  it('handles monthly pattern with weekday selection', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker onDateSelect={mockOnDateSelect} />);

    // Change to monthly pattern
    const monthlyButton = screen.getByRole('button', { name: 'Monthly' });
    await user.click(monthlyButton);

    // Select weekday pattern
    const weekdayRadio = screen.getByRole('radio', { name: /on the/i });
    await user.click(weekdayRadio);

    // Verify the pattern generates dates
    await waitFor(() => {
      expect(mockOnDateSelect).toHaveBeenCalled();
    });

    const lastCall = mockOnDateSelect.mock.calls[mockOnDateSelect.mock.calls.length - 1];
    const generatedDates = lastCall[0];
    
    expect(generatedDates.length).toBeGreaterThan(0);
  });

  it('handles date range validation correctly', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);

    // Set start date
    const startDateInput = screen.getByLabelText(/start date/i);
    await user.clear(startDateInput);
    await user.type(startDateInput, '2024-06-01');

    // Set end date before start date
    const endDateInput = screen.getByLabelText(/end date/i);
    await user.type(endDateInput, '2024-05-01');

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/end date must be after start date/i)).toBeInTheDocument();
    });
  });

  it('resets all state correctly when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker onDateSelect={mockOnDateSelect} />);

    // Make several changes
    const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
    await user.click(weeklyButton);

    const intervalInput = screen.getByDisplayValue('1');
    await user.clear(intervalInput);
    await user.type(intervalInput, '3');

    const endDateInput = screen.getByLabelText(/end date/i);
    await user.type(endDateInput, '2024-12-31');

    // Reset
    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);

    // Verify reset state
    expect(screen.getByRole('button', { name: 'Daily' })).toHaveClass('bg-blue-500');
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(endDateInput).toHaveValue('');
  });

  it('updates calendar highlights when pattern changes', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);

    // Initial state should show calendar
    expect(screen.getByRole('button', { name: /previous month/i })).toBeInTheDocument();

    // Change pattern and verify calendar updates
    const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
    await user.click(weeklyButton);

    // Calendar should still be present and functional
    const nextMonthButton = screen.getByRole('button', { name: /next month/i });
    await user.click(nextMonthButton);

    expect(nextMonthButton).toBeInTheDocument();
  });

  it('handles edge cases gracefully', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker onDateSelect={mockOnDateSelect} />);

    // Test with very high interval
    const intervalInput = screen.getByDisplayValue('1');
    await user.clear(intervalInput);
    await user.type(intervalInput, '999');

    // Should still work without crashing
    await waitFor(() => {
      expect(mockOnDateSelect).toHaveBeenCalled();
    });

    // Test with invalid date input
    const startDateInput = screen.getByLabelText(/start date/i);
    await user.clear(startDateInput);
    await user.type(startDateInput, 'invalid-date');

    // Should show validation message or handle gracefully
    // The component should not crash
    expect(screen.getByText('Recurring Date Picker')).toBeInTheDocument();
  });

  it('preserves state during navigation between patterns', async () => {
    const user = userEvent.setup();
    render(<RecurringDatePicker />);

    // Set interval to 5
    const intervalInput = screen.getByDisplayValue('1');
    await user.clear(intervalInput);
    await user.type(intervalInput, '5');

    // Switch to weekly and back to daily
    const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
    await user.click(weeklyButton);

    const dailyButton = screen.getByRole('button', { name: 'Daily' });
    await user.click(dailyButton);

    // Interval should be preserved
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });
});

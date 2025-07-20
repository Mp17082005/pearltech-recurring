# Recurring Date Picker Component

A powerful, reusable React component for selecting recurring dates, built with Next.js, TypeScript, Tailwind CSS, and Zustand. This component provides functionality similar to recurring date selection features found in apps like TickTick.

## 🌟 Features

### Core Recurring Patterns
- **Daily**: Every day or every X days
- **Weekly**: Every week or every X weeks with specific day selection
- **Monthly**: Every month with date-based or weekday-based patterns
- **Yearly**: Every year or every X years

### Advanced Customization
- **Custom Intervals**: Configure "every X days/weeks/months/years"
- **Specific Days**: Select specific days of the week for weekly patterns
- **Complex Monthly Patterns**: "The second Tuesday of every month", "Last Friday of every month"
- **Date Range Selection**: Set start date and optional end date
- **Visual Calendar Preview**: Mini calendar showing highlighted recurring dates
- **Real-time Preview**: Live preview of upcoming dates as you configure

### Technical Features
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ♿ **Accessibility**: Keyboard navigation and ARIA labels
- 🎨 **Customizable Styling**: Tailwind CSS with easy customization
- 🧪 **Well Tested**: Comprehensive unit and integration tests
- 🔧 **TypeScript**: Full type safety and excellent developer experience
- 🚀 **Performance**: Optimized date calculations and state management

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Date Utilities**: date-fns
- **Icons**: Lucide React
- **Testing**: Jest + Testing Library
- **Build Tool**: Next.js built-in bundling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/recurring-date-picker.git
   cd recurring-date-picker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Usage

```tsx
import { RecurringDatePicker } from '@/components';

function MyComponent() {
  const handleDateSelect = (dates: Date[]) => {
    console.log('Selected dates:', dates);
  };

  return (
    <RecurringDatePicker onDateSelect={handleDateSelect} />
  );
}
```

### Advanced Usage with Custom Props

```tsx
import { RecurringDatePicker } from '@/components';

function AdvancedExample() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <div>
      <RecurringDatePicker
        onDateSelect={setSelectedDates}
        className="max-w-4xl mx-auto"
      />
      
      {selectedDates.length > 0 && (
        <div>
          <h3>Generated {selectedDates.length} dates:</h3>
          {selectedDates.map((date, index) => (
            <div key={index}>{date.toLocaleDateString()}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 🧩 Component Architecture

The component is built with a modular architecture:

### Core Components
- **`RecurringDatePicker`**: Main container component
- **`MiniCalendar`**: Calendar view with date highlighting
- **`RecurrenceOptions`**: Pattern selection and configuration
- **`DateRangeSelector`**: Start and end date selection
- **`PreviewPanel`**: Live preview of upcoming dates

### State Management
- **Zustand Store**: Centralized state management
- **Reactive Updates**: Real-time preview updates
- **Type Safety**: Full TypeScript integration

### Utility Functions
- **Date Calculations**: Robust recurring date generation
- **Pattern Matching**: Complex recurrence pattern logic
- **Validation**: Date range and input validation

## 🎯 Recurring Pattern Examples

### Daily Patterns
- Every day
- Every 3 days
- Every weekday (Mon-Fri)

### Weekly Patterns
- Every Monday
- Every Monday, Wednesday, Friday
- Every 2 weeks on Tuesday and Thursday

### Monthly Patterns
- 15th of every month
- Last day of every month
- Second Tuesday of every month
- First and third Friday of every month

### Yearly Patterns
- January 1st every year
- December 25th every 2 years

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage
- **Unit Tests**: Core utility functions and date calculations
- **Component Tests**: React component behavior and interactions
- **Integration Tests**: Complete user workflows
- **Edge Cases**: Invalid dates, boundary conditions, complex patterns

## 🎨 Styling & Customization

### Tailwind CSS Classes
The component uses Tailwind CSS for styling. Key customization points:

```tsx
<RecurringDatePicker 
  className="max-w-6xl mx-auto shadow-xl border-2 border-blue-200" 
/>
```

### Custom Themes
Modify the component styles by overriding Tailwind classes:

```css
/* Custom button styling */
.recurring-picker button {
  @apply hover:shadow-lg transition-all duration-200;
}

/* Custom calendar styling */
.mini-calendar {
  @apply rounded-xl border-2;
}
```

## 📊 Performance Considerations

- **Efficient Date Generation**: Optimized algorithms for generating recurring dates
- **Lazy Loading**: Preview dates generated on-demand
- **Memory Management**: Proper cleanup and state management
- **Bundle Size**: Tree-shakeable components and utilities

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm test`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📝 API Reference

### RecurringDatePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onDateSelect` | `(dates: Date[]) => void` | `undefined` | Callback when dates are generated |
| `className` | `string` | `undefined` | Additional CSS classes |

### Types

```typescript
type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';
type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type WeekOfMonth = 1 | 2 | 3 | 4 | -1;

interface RecurrenceRule {
  type: RecurrenceType;
  interval: number;
  daysOfWeek?: DayOfWeek[];
  monthlyPattern?: MonthlyPatternType;
  startDate: Date;
  endDate?: Date;
}
```

## 🔧 Troubleshooting

### Common Issues

**Issue**: Dates not generating correctly
**Solution**: Check that start date is valid and recurrence pattern is properly configured

**Issue**: Calendar not displaying highlighted dates
**Solution**: Ensure the preview dates are being generated and passed to the calendar component

**Issue**: TypeScript errors with date functions
**Solution**: Make sure date-fns is properly installed and types are imported

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by TickTick's recurring date selection interface
- Built with modern React best practices
- Designed for developer experience and end-user usability

## 📞 Support

- 📧 Email: support@recurringdatepicker.com
- 💬 Discord: [Join our community](https://discord.gg/recurring-picker)
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 📖 Documentation: [Full Documentation](https://docs.recurringdatepicker.com)

---

Made with ❤️ for the React community

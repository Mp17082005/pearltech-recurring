# 🗓️ PearlTech Recurring Date Picker

A feature-rich recurring date picker component built from the ground up for modern React applications. This project started as a need for a robust date selection tool similar to what you'd find in productivity apps like TickTick, but with the flexibility to customize and extend for any use case.

## ✨ What Makes This Special

This isn't just another date picker. After working with various scheduling applications and finding limitations in existing libraries, I built this component to handle complex recurring patterns while maintaining a clean, intuitive interface. Whether you're building a calendar app, task scheduler, or event management system, this component adapts to your needs.

### 🎯 Core Features

**Recurring Patterns That Actually Work**
- **Daily**: Simple daily recurrence or custom intervals (every 3 days, weekdays only, etc.)
- **Weekly**: Select specific days with flexible intervals (every 2 weeks on Mon/Wed/Fri)
- **Monthly**: Smart date handling including "last day of month" and "second Tuesday" patterns
- **Yearly**: Annual events with proper leap year handling

**Real-Time Visual Feedback**
- Mini calendar with highlighted recurring dates
- Live preview showing next 20+ occurrences
- Instant pattern validation and feedback
- Smart conflict detection and suggestions

**Developer-Friendly Architecture**
- Full TypeScript support with comprehensive types
- Modular component structure for easy customization
- Zero external dependencies (except peer dependencies)
- Comprehensive test coverage with edge cases

## 🚀 Live Demo

Check out the component in action:

- **🌟 Main Demo**: https://pearltech-recurring-331d9l5u0-mp17082005s-projects.vercel.app
- **🎮 Interactive Demo**: https://pearltech-recurring-331d9l5u0-mp17082005s-projects.vercel.app/demo
- **📝 Simple Example**: https://pearltech-recurring-331d9l5u0-mp17082005s-projects.vercel.app/simple

## 🛠️ Technology Stack

Built with modern tools for performance and developer experience:

- **Next.js 15**: Latest app router with RSC support
- **TypeScript**: Strict type checking and excellent IntelliSense
- **Tailwind CSS**: Utility-first styling with custom design system
- **Zustand**: Lightweight state management without boilerplate
- **date-fns**: Reliable date manipulation with tree-shaking
- **Lucide React**: Consistent, beautiful icons
- **Jest + Testing Library**: Comprehensive testing setup

## 📦 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/Mp17082005/pearltech-recurring.git
cd pearltech-recurring

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000` with hot reloading enabled.

### Basic Integration

```tsx
'use client';

import { useState } from 'react';
import { RecurringDatePicker } from '@/components/RecurringDatePicker';

export default function MyScheduler() {
  const [recurringDates, setRecurringDates] = useState<Date[]>([]);

  const handleDateSelection = (generatedDates: Date[]) => {
    setRecurringDates(generatedDates);
    // Your logic here - save to database, update calendar, etc.
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1>Event Scheduler</h1>
      
      <RecurringDatePicker 
        onDateSelect={handleDateSelection}
        className="shadow-lg border border-gray-200"
      />
      
      {recurringDates.length > 0 && (
        <div className="mt-8">
          <h2>Scheduled for {recurringDates.length} dates:</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {recurringDates.slice(0, 12).map((date, index) => (
              <li key={index} className="p-2 bg-blue-50 rounded">
                {date.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </li>
            ))}
            {recurringDates.length > 12 && (
              <li className="p-2 text-gray-500 italic">
                ...and {recurringDates.length - 12} more
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## 🎨 Component Architecture

### Main Components

**RecurringDatePicker** - The orchestrator component
- Manages overall state and layout
- Coordinates between sub-components
- Handles date generation and validation

**MiniCalendar** - Interactive calendar view
- Displays current month with navigation
- Highlights recurring dates visually
- Allows direct date selection

**RecurrenceOptions** - Pattern configuration
- Intuitive pattern selection (Daily/Weekly/Monthly/Yearly)
- Interval customization with smart defaults
- Advanced options for complex patterns

**DateRangeSelector** - Time boundaries
- Start date selection with calendar popup
- Optional end date for finite recurrence
- Smart validation and error messaging

**PreviewPanel** - Real-time feedback
- Shows next 20+ occurrences
- Updates instantly as patterns change
- Export functionality for generated dates

### State Management

The component uses Zustand for state management, providing:
- Centralized store with type safety
- Reactive updates across components
- Clean separation of concerns
- Easy testing and debugging

```typescript
// Example of the store structure
interface DatePickerState {
  selectedDate: Date;
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  daysOfWeek: number[];
  monthlyPattern: MonthlyPattern;
  startDate: Date;
  endDate?: Date;
  previewDates: Date[];
}
```

## 🎯 Pattern Examples & Use Cases

### Daily Patterns
```typescript
// Every day
{ type: 'daily', interval: 1 }

// Every 3 days
{ type: 'daily', interval: 3 }

// Weekdays only
{ type: 'daily', interval: 1, weekdaysOnly: true }
```

### Weekly Patterns
```typescript
// Every Monday
{ type: 'weekly', interval: 1, daysOfWeek: [1] }

// Mon/Wed/Fri every week
{ type: 'weekly', interval: 1, daysOfWeek: [1, 3, 5] }

// Every other Tuesday and Thursday
{ type: 'weekly', interval: 2, daysOfWeek: [2, 4] }
```

### Monthly Patterns
```typescript
// 15th of every month
{ type: 'monthly', interval: 1, monthlyPattern: { type: 'date', value: 15 } }

// Last Friday of every month
{ type: 'monthly', interval: 1, monthlyPattern: { type: 'weekday', week: -1, day: 5 } }

// Second Tuesday of every 3rd month
{ type: 'monthly', interval: 3, monthlyPattern: { type: 'weekday', week: 2, day: 2 } }
```

## 🧪 Testing & Quality

### Running Tests

```bash
# Run full test suite
npm test

# Run tests in watch mode (great for development)
npm run test:watch

# Generate coverage report
npm test -- --coverage
```

### Test Coverage Areas

- **Date calculation algorithms**: Edge cases, leap years, month boundaries
- **Component interactions**: User workflows, state changes, validation
- **Accessibility**: Keyboard navigation, screen reader compatibility
- **Performance**: Large date ranges, complex patterns

The test suite includes over 150+ test cases covering real-world scenarios and edge cases you might not think of initially.

## �️ Customization & Theming

### Tailwind CSS Integration

The component is built with Tailwind CSS and follows a consistent design system:

```tsx
// Custom styling example
<RecurringDatePicker 
  className="max-w-6xl mx-auto border-2 border-purple-300 shadow-2xl rounded-xl"
/>
```

### CSS Custom Properties

For deeper customization, override CSS variables:

```css
.recurring-date-picker {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --border-radius: 0.75rem;
  --spacing-unit: 1rem;
}
```

### Dark Mode Support

Built-in support for dark mode with automatic detection:

```tsx
// Automatically adapts to system preference
<RecurringDatePicker className="dark:bg-gray-800 dark:text-white" />
```

## 🚀 Performance & Optimization

### Efficient Date Generation
- Optimized algorithms for large date ranges
- Smart caching for repeated calculations
- Lazy loading of preview dates

### Bundle Size Optimization
- Tree-shakeable components
- Dynamic imports for heavy dependencies
- Optimized date-fns imports

### Memory Management
- Proper cleanup of event listeners
- Efficient state updates
- Garbage collection friendly patterns

## 🤝 Contributing

I welcome contributions! Whether it's bug fixes, feature requests, or documentation improvements.

### Development Workflow

```bash
# Fork the repo and clone your fork
git clone https://github.com/yourusername/pearltech-recurring.git

# Create a feature branch
git checkout -b feature/your-awesome-feature

# Make changes and test
npm test
npm run build

# Commit with a descriptive message
git commit -m "Add support for custom date formats in preview panel"

# Push and create a PR
git push origin feature/your-awesome-feature
```

### Contribution Guidelines

- Write tests for new features
- Follow the existing code style (Prettier + ESLint configured)
- Update documentation for API changes
- Keep commits atomic and well-described

## 📚 API Documentation

### Core Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `onDateSelect` | `(dates: Date[]) => void` | - | Callback fired when recurring dates are generated |
| `className` | `string` | - | Additional CSS classes for the container |
| `initialDate` | `Date` | `new Date()` | Initial date selection |
| `maxDates` | `number` | `100` | Maximum number of dates to generate |

### TypeScript Interfaces

```typescript
interface RecurrenceRule {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  startDate: Date;
  endDate?: Date;
  daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  monthlyPattern?: MonthlyPattern;
}

interface MonthlyPattern {
  type: 'date' | 'weekday';
  value?: number; // For date-based patterns
  week?: number; // 1-4 or -1 for last
  day?: number; // Day of week (0-6)
}
```

## 🐛 Troubleshooting

### Common Issues

**Dates not generating as expected**
- Verify that the start date is valid
- Check that the recurrence pattern configuration is complete
- Look for console warnings about invalid date ranges

**TypeScript compilation errors**
- Ensure all peer dependencies are installed
- Check that your TypeScript version is 4.5+
- Verify that date-fns types are properly imported

**Styling issues**
- Make sure Tailwind CSS is properly configured in your project
- Check for CSS conflicts with existing styles
- Use browser dev tools to inspect applied classes

**Performance with large date ranges**
- Consider using the `maxDates` prop to limit results
- Implement pagination for very large result sets
- Use React.memo for parent components that re-render frequently

## 📄 License

MIT License - feel free to use this in personal and commercial projects.

## 🙏 Acknowledgments

- Inspired by the UX patterns in TickTick and Google Calendar
- Built with insights from the React community's best practices
- Special thanks to contributors and early testers

## 📞 Support & Community

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/Mp17082005/pearltech-recurring/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/Mp17082005/pearltech-recurring/discussions)
- **📖 Documentation**: This README and inline code comments
- **⭐ Show Support**: Star the repo if you find it useful!

---

Built with passion for developer experience and user-friendly interfaces. Happy coding! 🚀
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

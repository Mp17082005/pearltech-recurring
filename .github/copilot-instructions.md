# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context
This is a Next.js TypeScript project for building a reusable recurring date picker component similar to TickTick app functionality.

## Key Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Date Utilities**: date-fns
- **Icons**: Lucide React
- **Testing**: Jest, Testing Library

## Component Architecture
- Break down components into smaller, reusable parts
- Use composition pattern for flexibility
- Implement proper TypeScript interfaces for props and state
- Follow React best practices and hooks patterns

## Recurring Date Logic
- Support Daily, Weekly, Monthly, Yearly patterns
- Handle custom intervals (every X days/weeks/months/years)
- Support specific day selections and complex patterns
- Include proper date validation and edge case handling

## Code Style Guidelines
- Use functional components with hooks
- Implement proper error boundaries
- Write comprehensive unit and integration tests
- Use descriptive naming conventions
- Add JSDoc comments for complex logic
- Follow accessibility best practices

## Testing Requirements
- Test recurring date calculation logic
- Test component interactions and state changes
- Include edge cases and error conditions
- Write integration tests for complete workflows

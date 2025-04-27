# OrangeHRM Playwright Automation Framework

This project contains automated tests for OrangeHRM using Playwright, a modern end-to-end testing framework.

## Project Structure

```
├── components/     # Reusable UI components
├── data/          # Test data and configuration
├── pages/         # Page Object Models
├── tests/         # Test files
├── utils/         # Utility functions and helpers
└── playwright-report/  # Test execution reports
```

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/orangehrm-playwright.git
cd orangehrm-playwright
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

To run all tests:

```bash
npx playwright test
```

To run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

To run tests in UI mode:

```bash
npx playwright test --ui
```

## Test Reports

After test execution, you can find the HTML report in the `playwright-report` directory. To view the report:

```bash
npx playwright show-report
```

## Project Dependencies

- @playwright/test: ^1.50.1
- @types/node: ^22.13.5

## Contributing

1. Create a new branch for your feature
2. Write your tests
3. Submit a pull request

## License

ISC

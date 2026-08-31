# Agent E2E QA Workflow - Playwright

Automated end-to-end testing suite for the SauceDemo checkout workflow (`SCRUM-101`), built with [Playwright](https://playwright.dev/).

---

## 📁 Repository Structure

```text
├── specs/               # QA test specifications and test plans
├── test-results/        # Execution reports, logs, and run artifacts
├── tests/               # Playwright test scripts (e.g., saucedemo-checkout)
├── user-stories/        # Acceptance criteria and ticket definitions (SCRUM-101)
├── playwright.config.ts # Playwright test runner configuration
└── package.json         # Dependencies and execution scripts
🚀 Getting Started
Prerequisites
Node.js (v18 or higher recommended)

pnpm (or npm / yarn)

Installation
Clone the repository:

Bash
git clone [https://github.com/misacandrademoon/AgentE2EQAWorkflow-Playwright.git](https://github.com/misacandrademoon/AgentE2EQAWorkflow-Playwright.git)
cd AgentE2EQAWorkflow-Playwright
Install dependencies:

Bash
pnpm install
Install Playwright browser binaries:

Bash
pnpm exec playwright install --with-deps
🧪 Running Tests
Run all E2E tests:

Bash
pnpm exec playwright test
Run tests in UI mode:

Bash
pnpm exec playwright test --ui
Run tests with visible browser (headed):

Bash
pnpm exec playwright test --headed
View the HTML execution report:

Bash
pnpm exec playwright show-report
📋 Scope: SCRUM-101
This test suite covers the end-to-end checkout flow on SauceDemo:

Form validation & input boundaries

Cart-to-checkout navigation

Order calculation & confirmation

Edge cases (empty carts, incomplete user details)




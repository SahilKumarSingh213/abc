# AI QA Automation Framework

## 1. Complete QA Agent Flow

```text
                         ┌─────────────────────────┐
                         │    QA ORCHESTRATOR       │
                         │   Controls Full Flow     │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │  Requirement Analysis   │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Test Plan         │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      Test Cases         │
                         │  Select Automation      │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Test Data         │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │      Locator Intelligence &      │
                    │      Transient UI Resilience     │
                    └────────────────┬─────────────────┘
                                     │
                                     ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Automation        │
                         │  BDD + Cucumber +       │
                         │       Playwright        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      Code Review        │
                         └────────────┬────────────┘
                                      │
                               ┌──────┴──────┐
                               │             │
                            Issues         Approved
                               │             │
                               ▼             ▼
                         ┌───────────┐  ┌───────────────┐
                         │ Fix Code  │  │Test Execution │
                         └─────┬─────┘  │   Cucumber    │
                               │        └───────┬───────┘
                               └──────► Code    │
                                        Review  ▼
                                      ┌─────────────────┐
                                      │ Failure Analysis│
                                      └───────┬─────────┘
                                              │
                              ┌───────────────┼───────────────┐
                              │               │               │
                              ▼               ▼               ▼
                       Automation Issue  App Defect     Other Issue
                              │               │               │
                              ▼               ▼               ▼
                    ┌────────────────┐  ┌────────────┐  ┌──────────────┐
                    │ Existing       │  │Bug Report  │  │Data / Env /  │
                    │ Playwright     │  └─────┬──────┘  │Flaky Handling│
                    │ Test Healer    │        │         └──────────────┘
                    └───────┬────────┘        ▼
                            │             ┌────────────┐
                            ▼             │    Jira    │
                       Re-run Test        └─────┬──────┘
                            │                   │
                            └───────┬───────────┘
                                    ▼
                         ┌─────────────────────────┐
                         │          RTM            │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     Test Summary        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                                   ┌──────┐
                                   │ DONE │
                                   └──────┘
```

## 2. Project Structure

```text
Sprint/
│
├── 🤖 agents/
│   │
│   ├── qa-orchestrator.agent.md
│   ├── requirement-analysis.agent.md
│   ├── correction.agent.md
│   ├── test-plan.agent.md
│   ├── test-case.agent.md
│   ├── locator-intelligence.agent.md
│   ├── automation.agent.md
│   ├── code-review.agent.md
│   ├── test-execution.agent.md
│   ├── failure-analysis.agent.md
│   ├── playwright-test-healer.agent.md  ← Existing
│   ├── bug-report.agent.md
│   ├── jira.agent.md
│   ├── rtm.agent.md
│   └── test-summary.agent.md
│
├── 📋 specs/
│   │
│   ├── requirements/
│   ├── requirement-analysis/
│   │   └── requirement-analysis.md
│   ├── test-plans/
│   │   └── test-plan.md
│   ├── test-cases/
│   │   └── test-cases.xlsx
│   ├── test-data/
│   │   └── test-data.xlsx
│   ├── locators/
│   │   └── locator-specification.xlsx
│   ├── execution/
│   │   └── execution-report.md
│   ├── failures/
│   │   ├── failure-analysis.md
│   │   └── self-healing-report.md
│   ├── bugs/
│   │   ├── bug-report.md
│   │   └── jira-results.md
│   ├── rtm/
│   │   └── rtm.xlsx
│   └── reports/
│       ├── code-review.md
│       └── test-summary.md
│
├── 🥒 features/
│   ├── *.feature
│   └── stepDefinitions/
│       └── *.steps.ts
│
├── 📄 pages/
│   └── *.page.ts
│
├── 🔧 hooks/
│   └── hooks.ts
│
├── 🌍 support/
│   └── world.ts
│
├── 🛠️ utils/
│   └── *.ts
│
├── ⚙️ cucumber.js
├── ⚙️ playwright.config.ts
├── ⚙️ tsconfig.json
└── 📦 package.json
```

## Notes

- The QA Orchestrator controls the workflow.
- Correction is used for QA artifacts before moving forward.
- Automation code uses Code Review rather than the generic Correction Agent.
- Test execution uses Cucumber with Playwright.
- Failures are analyzed before deciding whether to heal, report a defect, or handle another issue.
- The existing Playwright Test Healer is reused; no custom healer is required.
- RTM and Test Summary are the final reporting stages.

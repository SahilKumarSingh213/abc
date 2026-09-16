module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'support/**/*.ts',
      'hooks/**/*.ts',
      'features/stepDefinitions/**/*.ts'
    ],
    paths: ['features/**/*.feature'],
    tags: '@TC-009 or @TC-010',
    format: [
      'progress-bar',
      'allure-cucumberjs/reporter',
      'json:test-results/cucumber-report.json',
      'html:test-results/cucumber-report.html'
    ],
    defaultTimeout: 30000,
    publishQuiet: true
  }
};
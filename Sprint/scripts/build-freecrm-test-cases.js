const XLSX = require('xlsx');
const fs = require('node:fs');
const path = require('node:path');

const templatePath = 'C:/Users/sahikuma/Downloads/Test template 39.xlsx';
const outputPath = path.resolve(process.env.TEST_CASE_OUTPUT_PATH || 'specs/test-cases/test-cases.xlsx');

if (!fs.existsSync(templatePath)) {
  throw new Error(`Template not found: ${templatePath}`);
}

const workbook = XLSX.readFile(templatePath);
const casesSheetName = 'Test cases';
if (!workbook.SheetNames.includes(casesSheetName)) {
  throw new Error(`Template sheet not found: ${casesSheetName}`);
}

const headers = [
  'Test Case ID',
  'Test Scenario',
  'Precondition',
  'Test Condition',
  'Test Case Steps',
  'Test Data',
  'Expected Result',
  'Actual Result Iteration 1',
  'Status Iteration 1',
  'Actual Result Iteration 2',
  'Status Iteration 2',
  'Comments',
  'Req Reference',
  'Priority',
  'Automation Suitable',
  'Automation Recommended',
  'Automate'
];

const rows = [
  ['TC-001', 'Protected Deals access', 'Browser is open and the user is signed out.', 'Open /deals without a session.', '1. Open https://ui.freecrm.com/deals.', 'None.', 'The user is redirected to the FreeCRM login page.', '', '', '', '', '', 'REQ-001', 'High', 'Yes', 'Yes', 'Yes'],
  ['TC-002', 'Protected Invoices access', 'Browser is open and the user is signed out.', 'Open /invoices without a session.', '1. Open https://ui.freecrm.com/invoices.', 'None.', 'The user is redirected to the FreeCRM login page.', '', '', '', '', '', 'REQ-001', 'High', 'Yes', 'Yes', 'No'],
  ['TC-003', 'Valid login', 'The login page is displayed.', 'Submit valid credentials.', '1. Enter the approved email.\n2. Enter the approved password.\n3. Select Login.', 'FREECRM_EMAIL and FREECRM_PASSWORD from a secure environment.', 'The authenticated FreeCRM area opens and the user remains signed in.', '', '', '', '', '', 'REQ-002', 'High', 'Yes', 'Yes', 'Yes'],
  ['TC-004', 'Authenticated navigation', 'The user is signed in and transient onboarding dialogs are closed.', 'Move from Deals to Invoices and back.', '1. Open Deals.\n2. Select Invoices.\n3. Select Deals.', 'Authenticated account.', 'Each requested page opens and the authenticated shell remains visible.', '', '', '', '', '', 'REQ-003', 'High', 'Yes', 'Yes', 'Yes'],
  ['TC-005', 'Active-session refresh', 'The user is signed in on Deals or Invoices.', 'Refresh the protected page.', '1. Open a protected page.\n2. Refresh the browser page.', 'Authenticated account.', 'The user remains signed in while the session is active.', '', '', '', '', '', 'REQ-004', 'High', 'Yes', 'Yes', 'No'],
  ['TC-006', 'Deals list smoke', 'The user is signed in.', 'Open Deals and inspect the main page.', '1. Open Deals.\n2. Check the heading and main controls.\n3. Check the zero-record state when the account has no deals.', 'Account with zero or controlled Deal data.', 'The Deals heading and available controls render without layout errors; an empty state is clear when applicable.', '', '', '', '', '', 'REQ-005, REQ-006', 'High', 'Yes', 'Yes', 'No'],
  ['TC-007', 'Deals search and clear', 'The user is signed in and Deal data exists.', 'Search for a matching Deal and clear the search.', '1. Open Deals.\n2. Enter a known Deal search value.\n3. Verify matching data.\n4. Clear the search.', 'Known Deal title or searchable value.', 'Matching results are shown and clearing restores the default list.', '', '', '', '', '', 'REQ-007', 'High', 'Yes', 'Yes', 'No'],
  ['TC-008', 'Deals actions', 'The user is signed in on Deals.', 'Use the documented Deals actions.', '1. Select Refresh.\n2. Check the result.\n3. Check Export, pipeline/board, target, and create actions when available.', 'Account with permission for Deals actions.', 'Each available action gives an observable result or message without breaking the page.', '', '', '', '', '', 'REQ-008', 'Medium', 'No', 'No', 'No'],
  ['TC-009', 'Deal required-field validation', 'The New Deal form is open.', 'Submit without a Title.', '1. Leave Title empty.\n2. Select Save.', 'Empty Title; other required values only if the form requests them.', 'Validation feedback is shown and the Deal is not saved.', '', '', '', '', '', 'REQ-009, REQ-010', 'High', 'Yes', 'Yes', 'Yes'],
  ['TC-010', 'Valid Deal creation', 'The user is signed in and the New Deal form can be opened through the verified Create control.', 'Save one valid Deal.', '1. Open New Deal.\n2. Enter valid required data.\n3. Select Save.\n4. Search for the new Deal.', 'Unique title and valid observed Deal fields.', 'One Deal is saved and can be found in the Deals list.', '', '', '', '', '', 'REQ-009, REQ-011', 'High', 'Yes', 'Yes', 'No'],
  ['TC-011', 'Invoices list smoke', 'The user is signed in.', 'Open Invoices and inspect the table.', '1. Open Invoices.\n2. Check the heading, Settings, Create, table, and pagination controls.\n3. Check the documented columns.', 'Authenticated account.', 'The Invoices page renders the documented controls and columns without layout errors.', '', '', '', '', '', 'REQ-012, REQ-013', 'High', 'Yes', 'Yes', 'No'],
  ['TC-012', 'Invoices empty state and pagination', 'The user is signed in and no invoice records exist.', 'Check the empty table and pagination boundary.', '1. Open Invoices.\n2. Confirm No records found.\n3. Check Previous and Next.', 'Account with zero invoices.', 'No records found is shown and Previous/Next are disabled when no other page exists.', '', '', '', '', '', 'REQ-014, REQ-015', 'Medium', 'Yes', 'Yes', 'No'],
  ['TC-013', 'Invoice Create entry point', 'The user is signed in with invoice-create permission.', 'Open the invoice Create form.', '1. Open Invoices.\n2. Select Create.\n3. Record the visible fields and rules.', 'Authorized account; no invoice data is saved.', 'The Create workflow opens. Its fields and rules are recorded before detailed invoice-entry cases are designed.', '', '', '', '', '', 'REQ-016, REQ-017', 'High', 'No', 'No', 'No'],
  ['TC-014', 'Secure credentials and invalid invoice handling', 'A secure environment is configured and invoice form rules are approved.', 'Confirm secret handling and validate invoice data.', '1. Confirm credentials are loaded from environment variables.\n2. Submit invalid invoice data.\n3. If valid controlled data exists, save one invoice and verify it once.', 'Environment credentials; approved invalid and valid invoice data.', 'Credentials are absent from artifacts; invalid data is rejected; valid data is saved once when supported.', '', '', '', '', '', 'REQ-018, REQ-019', 'High', 'No', 'No', 'No']
];

if (rows.length < 12 || rows.length > 15) {
  throw new Error(`Expected 12-15 test cases, received ${rows.length}`);
}

const sheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
workbook.Sheets[casesSheetName] = sheet;
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
XLSX.writeFile(workbook, outputPath);
console.log(`Created ${rows.length} structured test cases at ${outputPath}`);

const XLSX = require('xlsx');
const fs = require('fs');

const outputPath = 'specs/locators/locator-specification.xlsx';

const rows = [
  ['Locator ID', 'Test Case ID', 'Page', 'Element', 'Element Type', 'Recommended Locator', 'Locator Value', 'Verified', 'Notes'],
  ['LOC-001', 'TC-001', 'Login', 'Login heading after redirect', 'Heading', 'Role', 'heading[name="Login"]', 'Yes', 'Verified from pages/login.page.ts expectVisible() and expectRedirectedFromProtectedPage(); route opening is URL-based and does not require a UI locator.'],
  ['LOC-002', 'TC-002', 'Login', 'Email field', 'Textbox', 'Role', 'textbox[name="Email"]', 'Yes', 'Verified from pages/login.page.ts login().'],
  ['LOC-003', 'TC-002', 'Login', 'Password field', 'Textbox', 'Role', 'textbox[name="Password"]', 'Yes', 'Verified from pages/login.page.ts login().'],
  ['LOC-004', 'TC-002', 'Login', 'Login button', 'Button', 'Role', 'button[name="Login"]', 'Yes', 'Verified from pages/login.page.ts login().'],
  ['LOC-005', 'TC-002', 'Authenticated shell', 'Welcome aboard setup dialog', 'Dialog', 'Role + hasText', 'dialog hasText "Welcome aboard!"', 'Yes', 'Verified from pages/navigation.page.ts setupDialog.'],
  ['LOC-006', 'TC-002', 'Authenticated shell', 'Setup dialog close action', 'Button', 'Role within dialog', 'dialog(hasText="Welcome aboard!") >> button[name="Close"]', 'Yes', 'Verified from pages/navigation.page.ts setupCloseButton.'],
  ['LOC-007', 'TC-002', 'Authenticated shell', 'Notification defer action', 'Button', 'Role', 'button[name="Later"]', 'Yes', 'Verified from pages/navigation.page.ts notificationLaterButton.'],
  ['LOC-008', 'TC-002', 'Authenticated shell', 'Global search availability', 'Searchbox', 'Role', 'searchbox[name="Search"]', 'Yes', 'Verified from pages/navigation.page.ts globalSearch; used as authenticated-shell evidence.'],
  ['LOC-009', 'TC-003', 'Global navigation', 'Deals navigation link', 'Link', 'Role', 'link[name="Deals"]', 'Yes', 'Verified from pages/navigation.page.ts dealsLink.'],
  ['LOC-010', 'TC-003', 'Global navigation', 'Invoices navigation link', 'Link', 'Role', 'link[name="Invoices"]', 'Yes', 'Verified from pages/navigation.page.ts invoicesLink; href is asserted as /invoices before click.'],
  ['LOC-011', 'TC-003', 'Authenticated shell', 'Global search remains visible after navigation and refresh', 'Searchbox', 'Role', 'searchbox[name="Search"]', 'Yes', 'Verified from pages/navigation.page.ts expectAuthenticatedShell(); refresh itself is a browser action, not a UI locator.'],
  ['LOC-012', 'TC-003', 'Deals', 'Deals heading after return navigation', 'Heading', 'Role', 'heading[name="Deals"]', 'Yes', 'Verified from pages/deals.page.ts expectVisibleInAuthenticatedSession().'],
  ['LOC-013', 'TC-004', 'Deals', 'Deals heading', 'Heading', 'Role', 'heading[name="Deals"]', 'Yes', 'Verified from pages/deals.page.ts expectVisible().'],
  ['LOC-014', 'TC-004', 'Deals', 'Create Deal action', 'Button', 'XPath', '//button[normalize-space()="Create"]', 'Yes', 'Verified from pages/deals.page.ts createButton; current repo uses XPath because a stronger stable locator was not captured.'],
  ['LOC-015', 'TC-004', 'Deals', 'Refresh control', 'Control (unverified)', 'Unverified', '', 'Unverified', 'Required by TC-004 and REQ-006/REQ-009, but no verified selector exists in the current repo or accessible saved page evidence.'],
  ['LOC-016', 'TC-004', 'Deals', 'Export control', 'Control (unverified)', 'Unverified', '', 'Unverified', 'Required by TC-004 and REQ-006/REQ-009, but no verified selector exists in the current repo or accessible saved page evidence.'],
  ['LOC-017', 'TC-004', 'Deals', 'List view control', 'Control (unverified)', 'Unverified', '', 'Unverified', 'Required by TC-004 and REQ-006/REQ-009, but no verified selector exists in the current repo or accessible saved page evidence.'],
  ['LOC-018', 'TC-004', 'Deals', 'Board view control', 'Control (unverified)', 'Unverified', '', 'Unverified', 'Required by TC-004 and REQ-006/REQ-009, but no verified selector exists in the current repo or accessible saved page evidence.'],
  ['LOC-019', 'TC-004', 'Deals', 'Empty-state message "No records found"', 'Text (unverified)', 'Unverified', '', 'Unverified', 'Required by TC-004 and REQ-007, but no verified selector exists in the current repo or accessible saved page evidence.']
];

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet(rows);

worksheet['!cols'] = [
  { wch: 12 },
  { wch: 12 },
  { wch: 20 },
  { wch: 40 },
  { wch: 20 },
  { wch: 24 },
  { wch: 44 },
  { wch: 12 },
  { wch: 120 }
];

XLSX.utils.book_append_sheet(workbook, worksheet, 'Locator Specification');
XLSX.writeFile(workbook, outputPath);

console.log(
  JSON.stringify(
    {
      created: fs.existsSync(outputPath),
      outputPath,
      sheetNames: workbook.SheetNames,
      dataRows: rows.length - 1
    },
    null,
    2
  )
);
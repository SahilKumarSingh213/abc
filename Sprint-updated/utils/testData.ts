import path from 'node:path';
import * as XLSX from 'xlsx';

export interface DealFormData {
  title?: string;
  identifier: string;
  closeDate?: string;
  stage?: string;
  status?: string;
  type?: string;
  source?: string;
}

export interface ValidDealData extends DealFormData {
  title: string;
}

export interface ValidDealExcelRow {
  'Test Case ID'?: string;
  'Title Prefix'?: string;
  'Identifier Prefix'?: string;
  Stage?: string;
  Status?: string;
  Type?: string;
  Source?: string;
  'Close Date'?: string;
}

export interface InvalidDealExcelRow {
  'Test Case ID'?: string;
  'Identifier Prefix'?: string;
  Stage?: string;
  Status?: string;
  Type?: string;
  Source?: string;
  'Close Date'?: string;
  'Expected Validation'?: string;
}

function nowToken(): string {
  return new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
}

function getTestDataWorkbookPath(): string {
  return path.resolve(process.cwd(), 'specs/test-cases/test-data.xlsx');
}

export function readExcelSheet<T>(sheetName: string): T[] {
  const filePath = getTestDataWorkbookPath();
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" not found in test data file: ${filePath}`);
  }
  return XLSX.utils.sheet_to_json<T>(worksheet);
}

export function buildValidDealData(): ValidDealData {
  const token = nowToken();
  const rows = readExcelSheet<ValidDealExcelRow>('ValidDeals');
  const template = rows[0] || {
    'Title Prefix': 'AUTO-DEAL',
    'Identifier Prefix': 'AUTO-ID',
    Stage: 'Prospect',
    Status: 'Active',
    Type: 'Opportunity',
    Source: 'Online'
  };

  const titlePrefix = template['Title Prefix'] || 'AUTO-DEAL';
  const idPrefix = template['Identifier Prefix'] || 'AUTO-ID';

  return {
    title: `${titlePrefix}-${token}`,
    identifier: `${idPrefix}-${token}`,
    stage: template.Stage || 'Prospect',
    status: template.Status || 'Active',
    type: template.Type || 'Opportunity',
    source: template.Source || 'Online',
    closeDate: template['Close Date']
  };
}

export function buildInvalidDealData(): Omit<DealFormData, 'title'> {
  const token = nowToken();
  const rows = readExcelSheet<InvalidDealExcelRow>('InvalidDeals');
  const template = rows[0] || {
    'Identifier Prefix': 'AUTO-INVALID',
    Stage: 'Prospect',
    Status: 'Active',
    Type: 'Opportunity',
    Source: 'Online'
  };

  const idPrefix = template['Identifier Prefix'] || 'AUTO-INVALID';

  return {
    identifier: `${idPrefix}-${token}`,
    stage: template.Stage || 'Prospect',
    status: template.Status || 'Active',
    type: template.Type || 'Opportunity',
    source: template.Source || 'Online',
    closeDate: template['Close Date']
  };
}
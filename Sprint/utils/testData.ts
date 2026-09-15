export interface DealFormData {
  title: string;
  identifier: string;
  closeDate?: string;
  stage?: string;
  status?: string;
  type?: string;
  source?: string;
}

function nowToken(): string {
  return new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
}

export function buildValidDealData(): DealFormData {
  const token = nowToken();

  return {
    title: `AUTO-DEAL-${token}`,
    identifier: `AUTO-ID-${token}`,
    stage: 'Prospect',
    status: 'Active',
    type: 'Opportunity',
    source: 'Online'
  };
}

export function buildInvalidDealData(): Omit<DealFormData, 'title'> {
  const token = nowToken();

  return {
    identifier: `AUTO-INVALID-${token}`,
    stage: 'Prospect',
    status: 'Active',
    type: 'Opportunity',
    source: 'Online'
  };
}
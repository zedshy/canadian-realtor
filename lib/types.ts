export type LeadSource =
  | 'property-viewing'
  | 'property-question'
  | 'valuation'
  | 'contact';

export interface LeadPayload {
  source: LeadSource;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  propertyId?: string;
  preferredTime?: string;
  city?: string;
  province?: string;
  propertyType?: string;
  timeframeToSell?: string;
  propertyAddress?: string;
}


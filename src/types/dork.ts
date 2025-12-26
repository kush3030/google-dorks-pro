export type DorkCategory =
  | 'exposed-files'
  | 'vulnerabilities'
  | 'cloud-storage'
  | 'authentication'
  | 'cms-platforms'
  | 'sensitive-data'
  | 'network-devices'
  | 'databases'
  | 'custom';

export type VulnerabilityType =
  | 'xss'
  | 'sqli'
  | 'ssrf'
  | 'lfi'
  | 'rce'
  | 'open-redirect'
  | 'idor'
  | 'xxe'
  | 'general';

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface Dork {
  id: string;
  title: string;
  description: string;
  query: string;
  category: DorkCategory;
  vulnerabilityType?: VulnerabilityType;
  severity: Severity;
  platform?: string;
  tags: string[];
  examples?: string[];
  references?: string[];
}

export interface DorkCollection {
  name: string;
  description: string;
  dorks: Dork[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomDork extends Dork {
  isCustom: true;
  createdAt: string;
}

export interface FavoriteDork {
  dorkId: string;
  addedAt: string;
  notes?: string;
}

export interface SearchHistory {
  id: string;
  domain: string;
  dorkId: string;
  timestamp: string;
  resultsFound?: boolean;
}

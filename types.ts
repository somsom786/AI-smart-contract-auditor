export interface AuditContext {
  projectType: string;
  chain: string;
  description: string;
}

export interface AuditRequest {
  context: AuditContext;
  code: string;
}

export interface AuditResponse {
  markdown: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

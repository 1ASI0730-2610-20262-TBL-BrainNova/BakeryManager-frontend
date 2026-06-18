import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Infrastructure resource contract for alert payloads.
 */
export interface AlertResource extends BaseResource {
  id: number;
  message: string;
  severity: number;
  isRead: boolean;
  generatedAt: string;
}

/**
 * Infrastructure response envelope used by alert collection queries.
 */
export interface AlertsResponse extends BaseResponse {
  alerts: AlertResource[];
}

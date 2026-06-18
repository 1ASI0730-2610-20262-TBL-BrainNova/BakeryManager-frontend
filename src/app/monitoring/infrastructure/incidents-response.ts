import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Infrastructure resource contract for incident payloads.
 */
export interface IncidentResource extends BaseResource {
  id: number;
  title: string;
  description: string;
  status: number;
  detectedAt: string;
  confirmedAt: string | null;
  resolvedAt: string | null;
  canceledAt: string | null;
}

/**
 * Infrastructure response envelope used by incident collection queries.
 */
export interface IncidentsResponse extends BaseResponse {
  incidents: IncidentResource[];
}

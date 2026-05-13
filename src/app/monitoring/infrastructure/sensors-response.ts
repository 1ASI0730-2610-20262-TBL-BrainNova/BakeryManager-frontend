import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Infrastructure resource contract for sensor payloads.
 */
export interface SensorResource extends BaseResource {
  id: number;
  name: string;
  type: number;
  status: number;
  location: string;
  minThreshold: number;
  maxThreshold: number;
  installedAt: string;
  lastReadingAt: string | null;
}

/**
 * Infrastructure response envelope used by sensor collection queries.
 */
export interface SensorsResponse extends BaseResponse {
  sensors: SensorResource[];
}

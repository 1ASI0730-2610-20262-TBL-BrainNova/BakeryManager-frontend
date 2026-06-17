import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Infrastructure resource contract for production batch payloads.
 */
export interface ProductionBatchResource extends BaseResource {
  id: number;
  batchCode: string;
  productName: string;
  plannedQuantity: number;
  producedQuantity: number;
  status: number;
  branchId: number;
  equipmentId: number;
  startedAt: string | null;
  completedAt: string | null;
}

/**
 * Infrastructure response envelope used by production batch collection queries.
 */
export interface ProductionBatchesResponse extends BaseResponse {
  productionBatches: ProductionBatchResource[];
}

import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ProductionBatchResource, ProductionBatchesResponse } from './production-batches-response';
import { ProductionBatch } from '../domain/model/production-batch.entity';

/**
 * Maps production batch infrastructure contracts to domain entities and back.
 */
export class ProductionBatchAssembler
  implements BaseAssembler<ProductionBatch, ProductionBatchResource, ProductionBatchesResponse>
{
  /**
   * Maps a batch collection response envelope into domain entities.
   */
  toEntitiesFromResponse(response: ProductionBatchesResponse): ProductionBatch[] {
    return response.productionBatches.map((resource) => this.toEntityFromResource(resource));
  }

  /**
   * Maps one batch resource contract into a domain entity.
   */
  toEntityFromResource(resource: ProductionBatchResource): ProductionBatch {
    return new ProductionBatch({
      id: resource.id,
      batchCode: resource.batchCode,
      productName: resource.productName,
      plannedQuantity: resource.plannedQuantity,
      producedQuantity: resource.producedQuantity,
      status: resource.status,
      branchId: resource.branchId,
      equipmentId: resource.equipmentId,
      startedAt: resource.startedAt ? new Date(resource.startedAt) : null,
      completedAt: resource.completedAt ? new Date(resource.completedAt) : null,
    });
  }

  /**
   * Maps one batch domain entity into an infrastructure resource contract.
   */
  toResourceFromEntity(entity: ProductionBatch): ProductionBatchResource {
    return {
      id: entity.id,
      batchCode: entity.batchCode,
      productName: entity.productName,
      plannedQuantity: entity.plannedQuantity,
      producedQuantity: entity.producedQuantity,
      status: entity.status as number,
      branchId: entity.branchId,
      equipmentId: entity.equipmentId,
      startedAt: entity.startedAt ? entity.startedAt.toISOString() : null,
      completedAt: entity.completedAt ? entity.completedAt.toISOString() : null,
    } as ProductionBatchResource;
  }
}

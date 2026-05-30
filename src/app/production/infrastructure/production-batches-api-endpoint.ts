import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ProductionBatch } from '../domain/model/production-batch.entity';
import { ProductionBatchResource, ProductionBatchesResponse } from './production-batches-response';
import { ProductionBatchAssembler } from './production-batch-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const productionBatchesEndpointUrl = `${environment.bakeryManagerProviderApiBaseUrl}${environment.productionProviderBatchesEndpointPath}`;

/**
 * Infrastructure endpoint client for production batch CRUD integration.
 */
export class ProductionBatchesApiEndpoint extends BaseApiEndpoint<
  ProductionBatch,
  ProductionBatchResource,
  ProductionBatchesResponse,
  ProductionBatchAssembler
> {
  /**
   * Creates a production batch endpoint adapter.
   * @param http - Angular HTTP client used to call the remote API.
   */
  constructor(http: HttpClient) {
    super(http, productionBatchesEndpointUrl, new ProductionBatchAssembler());
  }
}

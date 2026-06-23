import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ProductionBatch } from '../domain/model/production-batch.entity';
import { ProductionBatchResource, ProductionBatchesResponse } from './production-batches-response';
import { ProductionBatchAssembler } from './production-batch-assembler';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
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
  constructor(http: HttpClient) {
    super(http, productionBatchesEndpointUrl, new ProductionBatchAssembler());
  }

  /** PATCH /api/v1/batches/{id} — status: IN_PROGRESS */
  start(id: number): Observable<ProductionBatch> {
    return this.http.patch<ProductionBatchResource>(`${this.endpointUrl}/${id}`, { status: 'IN_PROGRESS' }).pipe(
      map((r) => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to start batch')),
    );
  }

  /** PATCH /api/v1/batches/{id} — status: COMPLETED */
  complete(id: number, producedQuantity: number): Observable<ProductionBatch> {
    return this.http.patch<ProductionBatchResource>(`${this.endpointUrl}/${id}`, { status: 'COMPLETED', producedQuantity }).pipe(
      map((r) => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to complete batch')),
    );
  }

  /** PATCH /api/v1/batches/{id} — status: CANCELLED */
  cancel(id: number): Observable<ProductionBatch> {
    return this.http.patch<ProductionBatchResource>(`${this.endpointUrl}/${id}`, { status: 'CANCELLED' }).pipe(
      map((r) => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to cancel batch')),
    );
  }
}

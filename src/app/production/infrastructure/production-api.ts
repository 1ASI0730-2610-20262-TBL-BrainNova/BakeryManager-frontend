import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { ProductionBatchesApiEndpoint } from './production-batches-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductionBatch } from '../domain/model/production-batch.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Infrastructure facade exposing Production bounded-context endpoint operations.
 */
export class ProductionApi extends BaseApi {
  private readonly batchesEndpoint: ProductionBatchesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.batchesEndpoint = new ProductionBatchesApiEndpoint(http);
  }

  /**
   * Retrieves all production batches.
   * @returns Stream with the batch collection.
   */
  getBatches(): Observable<ProductionBatch[]> {
    return this.batchesEndpoint.getAll();
  }

  /**
   * Retrieves a single production batch by ID.
   * @param id The ID of the batch.
   */
  getBatch(id: number): Observable<ProductionBatch> {
    return this.batchesEndpoint.getById(id);
  }

  /**
   * Persists a new production batch.
   * @param batch The batch to create.
   */
  createBatch(batch: ProductionBatch): Observable<ProductionBatch> {
    return this.batchesEndpoint.create(batch);
  }

  /** PATCH /api/v1/batches/{id}/start */
  startBatch(id: number): Observable<ProductionBatch> {
    return this.batchesEndpoint.start(id);
  }

  /** PATCH /api/v1/batches/{id}/complete */
  completeBatch(id: number): Observable<ProductionBatch> {
    return this.batchesEndpoint.complete(id);
  }

  /** PATCH /api/v1/batches/{id}/cancel */
  cancelBatch(id: number): Observable<ProductionBatch> {
    return this.batchesEndpoint.cancel(id);
  }
}

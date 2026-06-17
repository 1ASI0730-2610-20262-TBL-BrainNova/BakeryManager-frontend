import { computed, Injectable, Signal, signal } from '@angular/core';
import { ProductionBatch } from '../domain/model/production-batch.entity';
import { BatchStatus } from '../domain/model/batch-status.value-object';
import { ProductionReport } from '../domain/model/production-report.entity';
import { ProductionApi } from '../infrastructure/production-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
/**
 * Application-layer store that orchestrates Production use cases.
 *
 * @remarks
 * Coordinates infrastructure calls and projects results into reactive UI state.
 * Domain entities stay in the domain layer; API contracts stay in infrastructure.
 */
export class ProductionStore {
  private readonly batchesSignal = signal<ProductionBatch[]>([]);
  /** Readonly signal for the list of production batches. */
  readonly batches = this.batchesSignal.asReadonly();

  /** Readonly signal indicating if data is loading. */
  readonly loadingSignal = signal<boolean>(false);

  private readonly errorSignal = signal<string | null>(null);
  /** Readonly signal for the current error message. */
  readonly error = this.errorSignal.asReadonly();

  /** Count of active batches (PLANNED + IN_PROGRESS). */
  readonly activeBatchesCount = computed(
    () =>
      this.batches().filter(
        (b) => b.status === BatchStatus.PLANNED || b.status === BatchStatus.IN_PROGRESS,
      ).length,
  );
  /** Count of batches currently in progress. */
  readonly inProgressCount = computed(
    () => this.batches().filter((b) => b.status === BatchStatus.IN_PROGRESS).length,
  );
  /** Count of completed batches. */
  readonly completedCount = computed(
    () => this.batches().filter((b) => b.status === BatchStatus.COMPLETED).length,
  );
  /** Average production efficiency as a percentage (completed / closed). */
  readonly efficiency = computed(() => {
    const completed = this.completedCount();
    const cancelled = this.batches().filter((b) => b.status === BatchStatus.CANCELLED).length;
    const closed = completed + cancelled;
    return closed === 0 ? 0 : Math.round((completed / closed) * 100);
  });

  constructor(private productionApi: ProductionApi) {
    this.loadBatches();
  }

  /**
   * Selects a batch by identifier.
   * @param id Batch identifier.
   */
  getBatchById(id: number): Signal<ProductionBatch | undefined> {
    return computed(() => (id ? this.batches().find((b) => b.id === id) : undefined));
  }

  /**
   * Creates and plans a new production batch (US-81 / US-82).
   * @param data Batch planning data.
   */
  createBatch(data: {
    batchCode: string;
    productName: string;
    plannedQuantity: number;
    branchId: number;
    equipmentId: number;
  }): void {
    const batch = new ProductionBatch({
      id: 0,
      batchCode: data.batchCode,
      productName: data.productName,
      plannedQuantity: data.plannedQuantity,
      producedQuantity: 0,
      status: BatchStatus.PLANNED,
      branchId: data.branchId,
      equipmentId: data.equipmentId,
      startedAt: null,
      completedAt: null,
    });
    this.productionApi
      .createBatch(batch)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (created) => this.batchesSignal.update((list) => [created, ...list]),
        error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to create batch.')),
      });
  }

  /** Starts a batch (US-83). */
  startBatch(id: number): void {
    this.mutate(id, (b) => b.start());
  }

  /** Registers produced quantity (US-84). */
  registerProgress(id: number, quantity: number): void {
    this.mutate(id, (b) => b.registerProgress(quantity));
  }

  /** Completes a batch (US-85). */
  completeBatch(id: number): void {
    this.mutate(id, (b) => b.complete());
  }

  /** Cancels a batch (US-86). */
  cancelBatch(id: number): void {
    this.mutate(id, (b) => b.cancel());
  }

  /**
   * Generates an in-memory production report (US-91 / US-92).
   * @param branchId Branch the report is scoped to.
   */
  generateReport(branchId: number): ProductionReport {
    const total = this.batches().length;
    const completed = this.completedCount();
    const cancelled = this.batches().filter((b) => b.status === BatchStatus.CANCELLED).length;
    const closed = completed + cancelled;
    return new ProductionReport({
      id: Date.now(),
      branchId,
      generatedAt: new Date(),
      totalBatches: total,
      completedBatches: completed,
      cancelledBatches: cancelled,
      efficiency: closed === 0 ? 0 : completed / closed,
    });
  }

  /**
   * Applies a domain mutation to a batch and persists it.
   * @private
   */
  private mutate(id: number, action: (b: ProductionBatch) => void): void {
    const batch = this.batches().find((b) => b.id === id);
    if (!batch) return;
    action(batch);
    this.batchesSignal.update((list) => [...list]);
    this.productionApi
      .updateBatch(batch, id)
      .pipe(takeUntilDestroyed())
      .subscribe({
        error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to update batch.')),
      });
  }

  /**
   * Loads all production batches from the API.
   * @private
   */
  private loadBatches(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.productionApi
      .getBatches()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (batches) => {
          this.batchesSignal.set(batches);
          this.loadingSignal.set(false);
          this.errorSignal.set(null);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load batches.'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @private
   */
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}

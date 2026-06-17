import { BatchStatus } from './batch-status.value-object';

/**
 * Aggregate root of the Production bounded context.
 *
 * @remarks
 * A production batch (lote) owns its own lifecycle. `branchId` and `equipmentId`
 * are references by identifier to other bounded contexts (Administration and
 * IoT Monitoring respectively); this context never depends on those contexts'
 * internals, keeping Production independent. Integration with Inventory happens
 * through domain events, never through direct calls.
 */
export class ProductionBatch {
  /** The identification of the production batch. */
  private _id: number;
  /** Human-readable unique code of the batch. */
  private _batchCode: string;
  /** Name of the product being baked. */
  private _productName: string;
  /** Quantity planned to produce. */
  private _plannedQuantity: number;
  /** Quantity actually produced so far. */
  private _producedQuantity: number;
  /** Current lifecycle status. */
  private _status: BatchStatus;
  /** Reference (by id) to the branch that runs the batch. */
  private _branchId: number;
  /** Reference (by id) to the assigned oven/equipment. */
  private _equipmentId: number;
  /** Timestamp when the batch was started. @defaultValue null */
  private _startedAt: Date | null;
  /** Timestamp when the batch was completed. @defaultValue null */
  private _completedAt: Date | null;

  constructor(batch: {
    id: number;
    batchCode: string;
    productName: string;
    plannedQuantity: number;
    producedQuantity: number;
    status: BatchStatus;
    branchId: number;
    equipmentId: number;
    startedAt: Date | null;
    completedAt: Date | null;
  }) {
    this._id = batch.id;
    this._batchCode = batch.batchCode;
    this._productName = batch.productName;
    this._plannedQuantity = batch.plannedQuantity;
    this._producedQuantity = batch.producedQuantity;
    this._status = batch.status;
    this._branchId = batch.branchId;
    this._equipmentId = batch.equipmentId;
    this._startedAt = batch.startedAt;
    this._completedAt = batch.completedAt;
  }

  /**
   * Starts the batch, moving it from PLANNED to IN_PROGRESS.
   * Publishes (conceptually) the BatchStarted domain event.
   */
  start(): void {
    if (this._status !== BatchStatus.PLANNED) return;
    this._status = BatchStatus.IN_PROGRESS;
    this._startedAt = new Date();
  }

  /**
   * Registers the produced quantity, clamped between 0 and the planned amount.
   * @param quantity Units produced so far.
   */
  registerProgress(quantity: number): void {
    if (this._status !== BatchStatus.IN_PROGRESS) return;
    this._producedQuantity = Math.max(0, Math.min(quantity, this._plannedQuantity));
  }

  /**
   * Completes the batch, moving it to COMPLETED and stamping the finish time.
   * Publishes (conceptually) the BatchCompleted domain event.
   */
  complete(): void {
    if (this._status !== BatchStatus.IN_PROGRESS) return;
    this._status = BatchStatus.COMPLETED;
    this._completedAt = new Date();
    if (this._producedQuantity === 0) this._producedQuantity = this._plannedQuantity;
  }

  /**
   * Cancels the batch. A completed batch cannot be cancelled.
   */
  cancel(): void {
    if (this._status === BatchStatus.COMPLETED) return;
    this._status = BatchStatus.CANCELLED;
  }

  /**
   * Returns the production progress as a percentage (0-100).
   */
  getProgress(): number {
    if (this._plannedQuantity === 0) return 0;
    return Math.round((this._producedQuantity / this._plannedQuantity) * 100);
  }

  /**
   * Indicates whether the batch has been completed.
   */
  isCompleted(): boolean {
    return this._status === BatchStatus.COMPLETED && this._completedAt !== null;
  }

  /**
   * Batch-level efficiency as a ratio (0-1) of produced over planned.
   */
  calculateEfficiency(): number {
    if (this._plannedQuantity === 0) return 0;
    return this._producedQuantity / this._plannedQuantity;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get batchCode(): string { return this._batchCode; }
  set batchCode(value: string) { this._batchCode = value; }

  get productName(): string { return this._productName; }
  set productName(value: string) { this._productName = value; }

  get plannedQuantity(): number { return this._plannedQuantity; }
  set plannedQuantity(value: number) { this._plannedQuantity = value; }

  get producedQuantity(): number { return this._producedQuantity; }
  set producedQuantity(value: number) { this._producedQuantity = value; }

  get status(): BatchStatus { return this._status; }
  set status(value: BatchStatus) { this._status = value; }

  get branchId(): number { return this._branchId; }
  set branchId(value: number) { this._branchId = value; }

  get equipmentId(): number { return this._equipmentId; }
  set equipmentId(value: number) { this._equipmentId = value; }

  get startedAt(): Date | null { return this._startedAt; }
  set startedAt(value: Date | null) { this._startedAt = value; }

  get completedAt(): Date | null { return this._completedAt; }
  set completedAt(value: Date | null) { this._completedAt = value; }
}

/**
 * Read model / projection of the Production bounded context.
 *
 * @remarks
 * Summarizes the outcome of production batches for a branch over a period.
 * It is derived state (not a transactional aggregate) used for reporting.
 */
export class ProductionReport {
  private _id: number;
  private _branchId: number;
  private _generatedAt: Date;
  private _totalBatches: number;
  private _completedBatches: number;
  private _cancelledBatches: number;
  private _efficiency: number;

  constructor(report: {
    id: number;
    branchId: number;
    generatedAt: Date;
    totalBatches: number;
    completedBatches: number;
    cancelledBatches: number;
    efficiency: number;
  }) {
    this._id = report.id;
    this._branchId = report.branchId;
    this._generatedAt = report.generatedAt;
    this._totalBatches = report.totalBatches;
    this._completedBatches = report.completedBatches;
    this._cancelledBatches = report.cancelledBatches;
    this._efficiency = report.efficiency;
  }

  /**
   * Builds a human-readable efficiency summary.
   */
  getEfficiencySummary(): string {
    const closed = this._completedBatches + this._cancelledBatches;
    const pct = Math.round(this._efficiency * 100);
    return `${this._completedBatches} of ${closed} closed batches completed successfully (${pct}% efficiency).`;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }
  get branchId(): number { return this._branchId; }
  set branchId(value: number) { this._branchId = value; }
  get generatedAt(): Date { return this._generatedAt; }
  set generatedAt(value: Date) { this._generatedAt = value; }
  get totalBatches(): number { return this._totalBatches; }
  set totalBatches(value: number) { this._totalBatches = value; }
  get completedBatches(): number { return this._completedBatches; }
  set completedBatches(value: number) { this._completedBatches = value; }
  get cancelledBatches(): number { return this._cancelledBatches; }
  set cancelledBatches(value: number) { this._cancelledBatches = value; }
  get efficiency(): number { return this._efficiency; }
  set efficiency(value: number) { this._efficiency = value; }
}

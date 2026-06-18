/**
 * Represents the lifecycle status of a production batch (ProductionBatch).
 *
 * @remarks
 * Value object of the Production bounded context. Encodes the only valid states
 * a batch can transition through: PLANNED -> IN_PROGRESS -> COMPLETED | CANCELLED.
 */
export enum BatchStatus {
  PLANNED = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  CANCELLED = 3,
}

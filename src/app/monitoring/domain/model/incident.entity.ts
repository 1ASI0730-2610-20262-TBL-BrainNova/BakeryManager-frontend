import { IncidentStatus } from './incident-status.value-object';

/**
 * Represents an incident registered by a sensor when a record shows an anomaly or worrying value.
 */
export class Incident {
  /**
   * The identification of the incident.
   */
  private _id: number;
  /**
   * The title of the incident report.
   * @defaultValue ''
   */
  private _title: string;
  /**
   * The description of the incident report.
   * @defaultValue ''
   */
  private _description: string;
  /**
   * The status of the incident report.
   */
  private _status: IncidentStatus;
  /**
   * Date of the incident creation.
   */
  private _detectedAt: Date;
  /**
   * Confirmation date of the incident.
   * @defaultValue null
   */
  private _confirmedAt: Date | null;
  /**
   * Resolve date of the incident.
   * @defaultValue null
   */
  private _resolvedAt: Date | null;
  /**
   * Cancellation date of the incident.
   * @defaultValue null
   */
  private _canceledAt: Date | null;

  constructor(incident: { id: number; title: string; description: string; status: IncidentStatus; detectedAt: Date; confirmedAt: Date | null; resolvedAt: Date | null; canceledAt: Date | null }) {
    this._id = incident.id;
    this._title = incident.title;
    this._description = incident.description;
    this._status = incident.status;
    this._detectedAt = incident.detectedAt;
    this._confirmedAt = incident.confirmedAt;
    this._resolvedAt = incident.resolvedAt;
    this._canceledAt = incident.canceledAt;
  }

  /**
   * Marks the incident as CONFIRMED.
   */
  confirm(): void {
    this._status = IncidentStatus.CONFIRMED;
    this._confirmedAt = new Date();
  }

  /**
   * Marks the incident as RESOLVED.
   */
  resolve(): void {
    this._status = IncidentStatus.RESOLVED;
    this._resolvedAt = new Date();
  }

  /**
   * Marks the incident as CANCELLED.
   */
  cancel(): void {
    this._status = IncidentStatus.CANCELED;
    this._canceledAt = new Date();
  }

  /**
   * Checks if the incident has been confirmed.
   */
  isConfirmed(): boolean {
    return this._confirmedAt !== null && this._status === IncidentStatus.CONFIRMED;
  }

  /**
   * Checks if the incident has been resolved.
   */
  isResolved(): boolean {
    return this._resolvedAt !== null && this._status === IncidentStatus.RESOLVED;
  }

  /**
   * Checks if the incident has been canceled.
   */
  isCanceled(): boolean {
    return this._canceledAt !== null && this._status === IncidentStatus.CANCELED;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get status(): IncidentStatus {
    return this._status;
  }

  set status(value: IncidentStatus) {
    this._status = value;
  }

  get detectedAt(): Date {
    return this._detectedAt;
  }

  set detectedAt(value: Date) {
    this._detectedAt = value;
  }

  get confirmedAt(): Date | null {
    return this._confirmedAt;
  }

  set confirmedAt(value: Date | null) {
    this._confirmedAt = value;
  }

  get resolvedAt(): Date | null {
    return this._resolvedAt;
  }

  set resolvedAt(value: Date | null) {
    this._resolvedAt = value;
  }

  get canceledAt(): Date | null {
    return this._canceledAt;
  }

  set canceledAt(value: Date | null) {
    this._canceledAt = value;
  }
}

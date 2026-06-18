import { SensorType } from './sensor-type.value-object';
import { SensorStatus } from './sensor-status.value-object';

export class Sensor {
  /**
   * The identification of the sensor.
   */
  private _id: number;
  /**
   * Name of the sensor.
   * @defaultvalue ''
   */
  private _name: string;
  /**
   * Type of sensor. What it records.
   */
  private _type: SensorType;
  /**
   * Status of the sensor.
   * @defaultvalue SensorStatus.INACTIVE
   */
  private _status: SensorStatus;
  /**
   * Location of the sensor.
   * @defaultvalue ''
   */
  private _location: string;
  /**
   * Minimum value that the sensor can register.
   * @defaultValue 0
   */
  private _minThreshold: number;
  /**
   * Maximum value that the sensor can register.
   * @defaultvalue 0
   */
  private _maxThreshold: number;
  /**
   * Date of the sensor's installation.
   */
  private _installedAt: Date;
  /**
   * Date of the latest reading.
   */
  private _lastReadingAt: Date | null;

  constructor(sensor: { id: number; name: string; type: SensorType; status: SensorStatus; location: string; minThreshold: number; maxThreshold: number; installedAt: Date; lastReadingAt: Date | null }) {
    this._id = sensor.id;
    this._name = sensor.name;
    this._type = sensor.type;
    this._status = sensor.status;
    this._location = sensor.location;
    this._minThreshold = sensor.minThreshold;
    this._maxThreshold = sensor.maxThreshold;
    this._installedAt = sensor.installedAt;
    this._lastReadingAt = sensor.lastReadingAt;
  }

  /**
   * Activates the sensor, and updates its status to ACTIVE.
   */
  activate(): boolean {
    this._status = SensorStatus.ACTIVE;
    return true;
  }

  /**
   * Deactivates the sensor, and updates its status to INACTIVE.
   */
  deactivate(): boolean {
    this._status = SensorStatus.INACTIVE;
    return true;
  }

  /**
   * Updates the thresholds of the sensor.
   * @param min Minimum value.
   * @param max Maximum value.
   */
  updateThresholds(min: number, max: number): void {
    this._minThreshold = min;
    this._maxThreshold = max;
  }

  /**
   * Checks if a recorded value is within the limits.
   * @param value The value of the recording.
   */
  isWithinThreshold(value: number): boolean {
    return value > this._minThreshold && value < this._maxThreshold;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): SensorType {
    return this._type;
  }

  set type(value: SensorType) {
    this._type = value;
  }

  get status(): SensorStatus {
    return this._status;
  }

  set status(value: SensorStatus) {
    this._status = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get minThreshold(): number {
    return this._minThreshold;
  }

  set minThreshold(value: number) {
    this._minThreshold = value;
  }

  get maxThreshold(): number {
    return this._maxThreshold;
  }

  set maxThreshold(value: number) {
    this._maxThreshold = value;
  }

  get installedAt(): Date {
    return this._installedAt;
  }

  set installedAt(value: Date) {
    this._installedAt = value;
  }

  get lastReadingAt(): Date | null {
    return this._lastReadingAt;
  }

  set lastReadingAt(value: Date | null) {
    this._lastReadingAt = value;
  }
}

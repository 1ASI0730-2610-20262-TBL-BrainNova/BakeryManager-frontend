import { Sensor } from './sensor.entity';

/**
 * Represents a reading made by a sensor.
 */
export class SensorReading {
  /**
   * The identification of the reading.
   */
  _id: number;
  /**
   * The sensor that provided this reading
   * @defaultValue null
   */
  _from: Sensor;
  /**
   * Value obtained from the reading.
   * @defaultvalue 0
   */
  _value: number;
  /**
   * Unit of the reading.
   * @defaultValue ''
   */
  _unit: string;
  /**
   * Date of the recording.
   */
  _recordedAt: Date;

  constructor(reading: { id: number; from: Sensor; value: number; unit: string; recordedAt: Date }) {
    this._id = reading.id;
    this._from = reading.from;
    this._value = reading.value;
    this._unit = reading.unit;
    this._recordedAt = reading.recordedAt;
  }
}

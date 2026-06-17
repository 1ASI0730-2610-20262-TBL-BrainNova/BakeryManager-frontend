import { Component, Input } from '@angular/core';
import { SensorType } from '../../../domain/model/sensor-type.value-object';
import { Sensor } from '../../../domain/model/sensor.entity';
import { SensorStatus } from '../../../domain/model/sensor-status.value-object';

@Component({
  selector: 'app-sensor-tile',
  standalone: true,
  imports: [],
  templateUrl: './sensor-tile.html',
  styleUrl: './sensor-tile.css',
})
export class SensorTile {
  @Input() sensor!: Sensor;
  protected readonly SensorType = SensorType;
  protected readonly SensorStatus = SensorStatus;
}

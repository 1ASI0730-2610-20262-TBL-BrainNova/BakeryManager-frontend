import { Component, inject, Input } from '@angular/core';
import { MonitoringStore } from '../../../application/monitoring.store';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { SensorType } from '../../../domain/model/sensor-type.value-object';
import { BaseChartDirective } from 'ng2-charts';
import { Sensor } from '../../../domain/model/sensor.entity';
import { SensorStatus } from '../../../domain/model/sensor-status.value-object';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sensor-tile',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    NgClass,
    MatCardContent,
    BaseChartDirective,
    TranslatePipe
  ],
  templateUrl: './sensor-tile.html',
  styleUrl: './sensor-tile.css',
})
export class SensorTile {
  @Input() sensor!: Sensor;
  protected readonly SensorType = SensorType;
  protected readonly SensorStatus = SensorStatus;
}

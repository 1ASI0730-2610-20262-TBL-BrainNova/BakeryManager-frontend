import { Component, inject } from '@angular/core';
import { MonitoringStore } from '../../../application/monitoring.store';
import { SensorTile } from '../sensor-tile/sensor-tile';
import { MatCard } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sensor-grid',
  imports: [SensorTile, MatCard, TranslatePipe],
  templateUrl: './sensor-grid.html',
  styleUrl: './sensor-grid.css',
})
export class SensorGrid {
  readonly store = inject(MonitoringStore);
  readonly sensors = this.store.sensors;
}

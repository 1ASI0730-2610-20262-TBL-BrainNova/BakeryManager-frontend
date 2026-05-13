import { Component, computed, inject } from '@angular/core';
import { MonitoringStore } from '../../../application/monitoring.store';
import { SensorType } from '../../../domain/model/sensor-type.value-object';
import { MatCard, MatCardContent } from '@angular/material/card';
import { SensorStatus } from '../../../domain/model/sensor-status.value-object';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-top-summary',
  imports: [MatCard, MatCardContent, TranslatePipe],
  templateUrl: './top-summary.html',
  styleUrl: './top-summary.css',
})
export class TopSummary {
  private readonly store = inject(MonitoringStore);

  protected sensors = this.store.sensors;
  protected alerts = this.store.alerts;
  protected sensorCount = this.store.sensorCount;
  protected alertCount = this.store.alertCount;

  protected numberOfActiveSensors = computed(
    () => this.sensors().filter((sensor) => sensor.status === SensorStatus.ACTIVE).length,
  );
  protected averageTemperature = () => {
    let temperatureSensors = this.sensors().filter(
      (sensor) => sensor.type === SensorType.TEMPERATURE,
    );
    if (temperatureSensors.length === 0) return 0;
    let sum = temperatureSensors.reduce((acc, sensor) => acc + 121, 0);
    return sum / temperatureSensors.length;
  };
  protected lastReadingDate = new Date().toDateString();
}

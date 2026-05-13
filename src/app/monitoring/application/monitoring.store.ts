import { computed, Injectable, Signal, signal } from '@angular/core';
import { Sensor } from '../domain/model/sensor.entity';
import { Incident } from '../domain/model/incident.entity';
import { Alert } from '../domain/model/alert.entity';
import { MonitoringApi } from '../infrastructure/monitoring-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Application-layer store that orchestrates IoT Monitoring use cases.
 *
 * @remarks
 * This type coordinates infrastructure calls and projects results into reactive
 * UI state. Domain entities stay in the domain layer while API contracts stay
 * in infrastructure.
 */
export class MonitoringStore {
  /** Computed signal for the count of sensors **/
  readonly sensorCount = computed(() => this.sensors().length);
  /** Computed signal for the count of incidents **/
  readonly incidentCount = computed(() => this.incidents().length);
  /** Computed signal for the count of alerts **/
  readonly alertCount = computed(() => this.alerts().length);

  private readonly sensorsSignal = signal<Sensor[]>([]);
  /** Readonly signal for the list of sensors **/
  readonly sensors = this.sensorsSignal.asReadonly();

  private readonly incidentsSignal = signal<Incident[]>([]);
  /** Readonly signal for the list of incidents **/
  readonly incidents = this.incidentsSignal.asReadonly();

  private readonly alertsSignal = signal<Alert[]>([]);
  /** Readonly signal for the list of alerts **/
  readonly alerts = this.alertsSignal.asReadonly();

  /** Readonly signal indicating if data is loading **/
  readonly loadingSignal = signal<boolean>(false);

  private readonly errorSignal = signal<string | null>(null);
  /** Readonly signal for the current error message **/
  readonly error = this.errorSignal.asReadonly();

  /**
   * Creates an instance of MonitoringStore and loads initial data.
   * @param monitoringApi The API service for monitoring data.
   */
  constructor(private monitoringApi: MonitoringApi) {
    this.loadSensors();
    this.loadIncidents();
    this.loadAlerts();
  }

  /**
   * Selects a sensor by identifier.
   * @param id Sensor identifier
   */
  getSensorById(id: number): Signal<Sensor | undefined> {
    return computed(() => (id ? this.sensors().find((s) => s.id === id) : undefined));
  }

  /**
   * Selects an incident by identifier.
   * @param id Incident identifier
   */
  getIncidentById(id: number): Signal<Incident | undefined> {
    return computed(() => (id ? this.incidents().find((i) => i.id === id) : undefined));
  }

  /**
   * Selects an alert by identifier.
   * @param id Alert identifier
   */
  getAlertById(id: number): Signal<Alert | undefined> {
    return computed(() => (id ? this.alerts().find((a) => a.id === id) : undefined));
  }

  /**
   * Loads all sensors from the API.
   * @private
   */
  private loadSensors(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .getSensors()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (sensors) => {
          console.log(sensors);
          this.sensorsSignal.set(sensors);
          this.loadingSignal.set(false);
          this.errorSignal.set(null);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load sensors.'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Loads all incidents from the API.
   * @private
   */
  private loadIncidents(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .getIncidents()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (incidents) => {
          console.log(incidents);
          this.incidentsSignal.set(incidents);
          this.loadingSignal.set(false);
          this.errorSignal.set(null);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load incidents.'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Loads all alerts from the API.
   * @private
   */
  private loadAlerts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .getAlerts()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (alerts) => {
          console.log(alerts);
          this.alertsSignal.set(alerts);
          this.loadingSignal.set(false);
          this.errorSignal.set(null);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load alerts.'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error Source error.
   * @param fallback Default message when details are unavailable.
   * @returns Normalized message.
   * @private
   */
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}

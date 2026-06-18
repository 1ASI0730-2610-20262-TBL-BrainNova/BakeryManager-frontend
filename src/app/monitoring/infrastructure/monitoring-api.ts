import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { SensorsApiEndpoint } from './sensors-api-endpoint';
import { IncidentsApiEndpoint } from './incidents-api-endpoint';
import { AlertsApiEndpoint } from './alerts-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from '../domain/model/sensor.entity';
import { Incident } from '../domain/model/incident.entity';
import { Alert } from '../domain/model/alert.entity';

@Injectable({
  providedIn: 'root',
})
/**
 * Infrastructure facade exposing IoT Monitoring bounded-context endpoint operations.
 */
export class MonitoringApi extends BaseApi {
  private readonly sensorsEndpoint: SensorsApiEndpoint;
  private readonly incidentsEndpoint: IncidentsApiEndpoint;
  private readonly alertsEndpoint: AlertsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.sensorsEndpoint = new SensorsApiEndpoint(http);
    this.incidentsEndpoint = new IncidentsApiEndpoint(http);
    this.alertsEndpoint = new AlertsApiEndpoint(http);
  }

  /**
   * Retrieves all sensors.
   * @returns Stream with the sensor collection.
   */
  getSensors(): Observable<Sensor[]> {
    return this.sensorsEndpoint.getAll();
  }

  /**
   * Retrieves a single sensor by ID.
   * @param id The ID of the sensor.
   * @returns An Observable of a Sensor object.
   */
  getSensor(id: number): Observable<Sensor> {
    return this.sensorsEndpoint.getById(id);
  }

  /**
   * Retrieves all incidents.
   * @returns Stream with the incident collection.
   */
  getIncidents(): Observable<Incident[]> {
    return this.incidentsEndpoint.getAll();
  }

  /**
   * Retrieves a single incident by ID.
   * @param id The ID of the incident.
   * @returns An Observable of an Incident object.
   */
  getIncident(id: number): Observable<Incident> {
    return this.incidentsEndpoint.getById(id);
  }

  /**
   * Retrieves all alerts.
   * @returns Stream with the alert collection.
   */
  getAlerts(): Observable<Alert[]> {
    return this.alertsEndpoint.getAll();
  }

  /**
   * Retrieves a single alert by ID.
   * @param id The ID of the alert.
   * @returns An Observable of an Alert object.
   */
  getAlert(id: number): Observable<Alert> {
    return this.alertsEndpoint.getById(id);
  }
}

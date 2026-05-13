import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Sensor } from '../domain/model/sensor.entity';
import { SensorResource, SensorsResponse } from './sensors-response';
import { SensorAssembler } from './sensor-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const sensorsEndpointUrl = `${environment.bakeryManagerProviderApiBaseUrl}${environment.monitoringProviderSensorsEndpointPath}`

/**
 * Infrastructure endpoint client for sensor CRUD integration.
 */
export class SensorsApiEndpoint extends BaseApiEndpoint<
  Sensor,
  SensorResource,
  SensorsResponse,
  SensorAssembler
> {
  /**
   * Creates a sensor endpoint adapter.
   * @param http - Angular HTTP client used to call the remote API.
   */
  constructor(http: HttpClient) {
    super(http, sensorsEndpointUrl, new SensorAssembler());
  }
}

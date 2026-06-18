import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Alert } from '../domain/model/alert.entity';
import { AlertResource, AlertsResponse } from './alerts-response';
import { AlertAssembler } from './alert-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const alertsEndpointUrl = `${environment.bakeryManagerProviderApiBaseUrl}/alerts`;

/**
 * Infrastructure endpoint client for alert CRUD integration.
 */
export class AlertsApiEndpoint extends BaseApiEndpoint<
  Alert,
  AlertResource,
  AlertsResponse,
  AlertAssembler
> {
  /**
   * Creates an alert endpoint adapter.
   * @param http - Angular HTTP client used to call the remote API.
   */
  constructor(http: HttpClient) {
    super(http, alertsEndpointUrl, new AlertAssembler());
  }
}

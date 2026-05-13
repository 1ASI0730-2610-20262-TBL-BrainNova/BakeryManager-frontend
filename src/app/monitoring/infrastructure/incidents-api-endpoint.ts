import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Incident } from '../domain/model/incident.entity';
import { IncidentResource, IncidentsResponse } from './incidents-response';
import { IncidentAssembler } from './incident-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const incidentsEndpointUrl = `${environment.bakeryManagerProviderApiBaseUrl}${environment.monitoringProviderIncidentsEndpointPath}`;

/**
 * Infrastructure endpoint client for incident CRUD integration.
 */
export class IncidentsApiEndpoint extends BaseApiEndpoint<
  Incident,
  IncidentResource,
  IncidentsResponse,
  IncidentAssembler
> {
  /**
   * Creates an incident endpoint adapter.
   * @param http - Angular HTTP client used to call the remote API.
   */
  constructor(http: HttpClient) {
    super(http, incidentsEndpointUrl, new IncidentAssembler());
  }
}

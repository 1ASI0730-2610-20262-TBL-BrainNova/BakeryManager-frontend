import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Alert } from '../domain/model/alert.entity';
import { AlertResource, AlertsResponse } from './alerts-response';

/**
 * Maps alert infrastructure contracts to domain entities and back.
 */
export class AlertAssembler implements BaseAssembler<Alert, AlertResource, AlertsResponse> {
  /**
   * Maps an alert collection response envelope into domain entities.
   */
  toEntitiesFromResponse(response: AlertsResponse): Alert[] {
    return response.alerts.map((resource) => this.toEntityFromResource(resource));
  }

  /**
   * Maps one alert resource contract into a domain entity.
   */
  toEntityFromResource(resource: AlertResource): Alert {
    return new Alert({
      id: resource.id,
      message: resource.message,
      severity: resource.severity,
      isRead: resource.isRead,
      generatedAt: new Date(resource.generatedAt),
    });
  }

  /**
   * Maps one alert domain entity into an infrastructure resource contract.
   */
  toResourceFromEntity(entity: Alert): AlertResource {
    return {
      id: entity.id,
      message: entity.message,
      severity: entity.severity as number,
      isRead: entity.isRead,
      generatedAt: entity.generatedAt.toISOString(),
    } as AlertResource;
  }
}

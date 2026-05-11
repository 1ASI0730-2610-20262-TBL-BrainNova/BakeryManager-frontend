import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Incident } from '../domain/model/incident.entity';
import { IncidentResource, IncidentsResponse } from './incidents-response';

/**
 * Maps incident infrastructure contracts to domain entities and back.
 */
export class IncidentAssembler implements BaseAssembler<Incident, IncidentResource, IncidentsResponse> {
  /**
   * Maps an incident collection response envelope into domain entities.
   */
  toEntitiesFromResponse(response: IncidentsResponse): Incident[] {
    return response.incidents.map((resource) => this.toEntityFromResource(resource));
  }

  /**
   * Maps one incident resource contract into a domain entity.
   */
  toEntityFromResource(resource: IncidentResource): Incident {
    return new Incident({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      status: resource.status,
      detectedAt: new Date(resource.detectedAt),
      confirmedAt: (resource.confirmedAt as null) && new Date(resource.confirmedAt as string),
      resolvedAt: (resource.resolvedAt as null) && new Date(resource.resolvedAt as string),
      canceledAt: (resource.canceledAt as null) && new Date(resource.canceledAt as string),
    });
  }

  /**
   * Maps one incident domain entity into an infrastructure resource contract.
   */
  toResourceFromEntity(entity: Incident): IncidentResource {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      status: entity.status as number,
      detectedAt: entity.detectedAt.toISOString(),
      confirmedAt: entity.confirmedAt?.toISOString(),
      resolvedAt: entity.resolvedAt?.toISOString(),
      canceledAt: entity.canceledAt?.toISOString(),
    } as IncidentResource;
  }
}

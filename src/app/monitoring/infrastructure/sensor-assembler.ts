import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { SensorResource, SensorsResponse } from './sensors-response';
import { Sensor } from '../domain/model/sensor.entity';

/**
 * Maps sensor infrastructure contracts to domain entities and back.
 */
export class SensorAssembler implements BaseAssembler<Sensor, SensorResource, SensorsResponse> {
  /**
   * Maps a sensor collection response envelope into domain entities.
   */
  toEntitiesFromResponse(response: SensorsResponse): Sensor[] {
    return response.sensors.map((resource) => this.toEntityFromResource(resource));
  }

  /**
   * Maps one sensor resource contract into a domain entity.
   */
  toEntityFromResource(resource: SensorResource): Sensor {
    return new Sensor({
      id: resource.id,
      name: resource.name,
      type: resource.sensorType,
      status: resource.sensorStatus,
      location: resource.location,
      minThreshold: resource.minThreshold,
      maxThreshold: resource.maxThreshold,
      installedAt: new Date(resource.installedAt),
      lastReadingAt: (resource.lastReadingAt as null) && new Date(resource.lastReadingAt as string),
    });
  }

  /**
   * Maps one sensor domain entity into an infrastructure resource contract.
   */
  toResourceFromEntity(entity: Sensor): SensorResource {
    return {
      id: entity.id,
      name: entity.name,
      sensorType: entity.type as number,
      sensorStatus: entity.status as number,
      location: entity.location,
      minThreshold: entity.minThreshold,
      maxThreshold: entity.maxThreshold,
      installedAt: entity.installedAt.toISOString(),
      lastReadingAt: entity.lastReadingAt?.toISOString(),
    } as SensorResource;
  }
}

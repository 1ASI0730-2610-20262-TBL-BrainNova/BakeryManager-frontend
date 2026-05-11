import { InventoryItem } from '../domain/model/inventory-item';

/**
 *  Assembler for converting between API resources and InventoryItem entities.
 */
export class InventoryItemAssembler {
  /**
   * Converts an API resource to an InventoryItem entity.
   * @param resource - API resource to convert.
   * @returns InventoryItem entity.
   */
  static toEntity(resource: any): InventoryItem {
    return {
      id: resource.id,
      name: resource.name,
      description: resource.description,
      quantity: resource.quantity,
      unit: resource.unit,
      minStock: resource.minStock,
      lastUpdated: new Date(resource.lastUpdated),
    };
  }
}

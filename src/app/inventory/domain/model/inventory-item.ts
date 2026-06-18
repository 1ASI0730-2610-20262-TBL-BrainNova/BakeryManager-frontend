import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Represents an item in the bakery's inventory.
 * Extends from BaseEntity to maintain identity consistency.
 */
export interface InventoryItem extends BaseEntity {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  minStock: number;
  price: number;
  lastUpdated: Date;
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { InventoryItem } from '../../../domain/model/inventory-item';

/**
 * Displays a list of inventory-management items.
 */
@Component({
  selector: 'app-inventory-item-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule],
  templateUrl: './inventory-item-list.html',
  styleUrl: './inventory-item-list.css',
})
export class InventoryItemList {
  @Input() dataSource: InventoryItem[] = [];

  displayedColumns: string[] = ['name', 'quantity', 'unit', 'status'];

  /**
   * Determine if an item needs urgent replenishment.
   * Based on the system status visibility heuristic.
   */
  isLowStock(item: InventoryItem): boolean {
    return item.quantity <= item.minStock;
  }
}

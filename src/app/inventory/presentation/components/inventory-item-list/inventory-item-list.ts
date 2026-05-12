import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
import { InventoryItem } from '../../../domain/model/inventory-item';

@Component({
  selector: 'app-inventory-item-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule, TranslateModule],
  templateUrl: './inventory-item-list.html',
  styleUrl: './inventory-item-list.css',
})
export class InventoryItemList {
  @Input() dataSource: InventoryItem[] = [];

  displayedColumns: string[] = ['name', 'quantity', 'unit', 'status'];

  isLowStock(item: InventoryItem): boolean {
    return item.quantity <= item.minStock;
  }
}

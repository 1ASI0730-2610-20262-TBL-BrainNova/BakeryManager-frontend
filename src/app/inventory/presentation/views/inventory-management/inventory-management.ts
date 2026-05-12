import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryItemForm } from '../../components/inventory-item-form/inventory-item-form';
import { InventoryItemList } from '../../components/inventory-item-list/inventory-item-list';
import { InventoryItem } from '../../../domain/model/inventory-item';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InventoryService } from '../../../infrastructure/inventory.services';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [
    CommonModule,
    InventoryItemForm,
    InventoryItemList,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './inventory-management.html',
  styleUrl: './inventory-management.css',
})
export class InventoryManagement implements OnInit {
  inventoryItems: InventoryItem[] = [];
  isFormVisible = false;

  private inventoryService = inject(InventoryService);
  private translate = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
   this.translate.onLangChange.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getAllItems().subscribe({
      next: (items) => {
        this.inventoryItems = items;
        console.log('Inventario cargado:', items);
      },
      error: (err) => console.error('Error cargando el inventario:', err),
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  addItem(item: any): void {
    if (!item) return;

    const itemToSend = {
      name: item.name,
      description: item.description,
      quantity: Number(item.quantity),
      unit: item.unit,
      minStock: Number(item.minStock),
    };

    this.inventoryService.createItem(itemToSend as any).subscribe({
      next: (response) => {
        console.log('¡Éxito en la nube!:', response);
        this.loadInventory();
        this.isFormVisible = false;
      },
      error: (err) => {
        console.error('Error detallado:', err);
        alert('Error: no sé puede subir a la nube');
      },
    });
  }
}
